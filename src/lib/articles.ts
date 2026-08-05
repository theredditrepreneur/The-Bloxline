import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import readingTime from "reading-time"
import {toPlainText, type PortableTextBlock} from "@portabletext/react"
import {z} from "zod"
import {sanityFetch} from "@/sanity/live"
import {allArticlesIncludingEditorialDraftsQuery, allArticlesQuery} from "@/sanity/queries"

export const desks = ["Parents", "Industry", "Games", "Studios", "Education"] as const
export type Desk = (typeof desks)[number]

const articleSchema = z.object({
  title: z.string().min(10), slug: z.string().regex(/^[a-z0-9-]+$/), subtitle: z.string().optional(), excerpt: z.string().min(30),
  publishedAt: z.string().date(), updatedAt: z.string().date().optional(), author: z.string().min(2), primaryDesk: z.enum(desks),
  secondaryTopics: z.array(z.string()).default([]), coverImage: z.string(), coverAlt: z.string().min(5), featured: z.boolean().default(false),
  draft: z.boolean().default(true), readingTime: z.string().optional(), seoTitle: z.string().optional(), seoDescription: z.string().min(30),
  canonicalUrl: z.string().url().optional(), sourceLinks: z.array(z.object({title: z.string(), url: z.string().url()})).default([]),
  disclosure: z.string().optional(), parentRelevance: z.string().optional(), teacherRelevance: z.string().optional(), industryRelevance: z.string().optional(),
})

export type ArticleMeta = z.infer<typeof articleSchema>
export type Article = ArticleMeta & {body: string | unknown[]; contentFormat: "mdx" | "sanity"}
const articleDir = path.join(process.cwd(), "content", "articles")

function getLocalArticles(includeDrafts: boolean): Article[] {
  if (!fs.existsSync(articleDir)) return []
  return fs.readdirSync(articleDir).filter((file) => file.endsWith(".mdx") && !file.startsWith("_")).map((file) => {
    const raw = fs.readFileSync(path.join(articleDir, file), "utf8")
    const {data, content} = matter(raw)
    const parsed = articleSchema.safeParse(data)
    if (!parsed.success) throw new Error(`Invalid article frontmatter in ${file}: ${parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")}`)
    if (parsed.data.slug !== file.replace(/\.mdx$/, "")) throw new Error(`Slug mismatch in ${file}`)
    return {...parsed.data, readingTime: parsed.data.readingTime || readingTime(content).text.replace("min read", "minute read"), body: content, contentFormat: "mdx" as const}
  }).filter((article) => includeDrafts || !article.draft).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

function mapSanityArticle(document: Record<string, unknown>): Article | null {
  const body = Array.isArray(document.body) ? document.body : []
  const cover = document.coverImage as {alt?: string; asset?: {url?: string}} | undefined
  const candidate = {
    ...document,
    updatedAt: typeof document.updatedAt === "string" ? document.updatedAt : undefined,
    subtitle: typeof document.subtitle === "string" ? document.subtitle : undefined,
    seoTitle: typeof document.seoTitle === "string" ? document.seoTitle : undefined,
    canonicalUrl: typeof document.canonicalUrl === "string" ? document.canonicalUrl : undefined,
    disclosure: typeof document.disclosure === "string" ? document.disclosure : undefined,
    parentRelevance: typeof document.parentRelevance === "string" ? document.parentRelevance : undefined,
    teacherRelevance: typeof document.teacherRelevance === "string" ? document.teacherRelevance : undefined,
    industryRelevance: typeof document.industryRelevance === "string" ? document.industryRelevance : undefined,
    coverImage: cover?.asset?.url || "/brand/bloxline-banner.jpg",
    coverAlt: cover?.alt || "The Bloxline article cover",
    secondaryTopics: Array.isArray(document.secondaryTopics) ? document.secondaryTopics : [],
    sourceLinks: Array.isArray(document.sourceLinks) ? document.sourceLinks : [],
    featured: document.featured === true,
    draft: document.draft !== false,
    readingTime: typeof document.readingTime === "string" && document.readingTime ? document.readingTime : readingTime(toPlainText(body as PortableTextBlock[])).text.replace("min read", "minute read"),
  }
  const parsed = articleSchema.safeParse(candidate)
  if (!parsed.success) {
    console.error(`Skipping invalid Sanity article ${String(document.slug || document._id)}: ${parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")}`)
    return null
  }
  return {...parsed.data, body, contentFormat: "sanity"}
}

export async function getAllArticles(includeDrafts = process.env.NODE_ENV !== "production"): Promise<Article[]> {
  try {
    const result = await sanityFetch({query: includeDrafts ? allArticlesIncludingEditorialDraftsQuery : allArticlesQuery, perspective: "published", stega: false})
    const documents = result.data as Record<string, unknown>[]
    const articles = documents.map(mapSanityArticle).filter((article): article is Article => article !== null)
    return articles.length ? articles : getLocalArticles(includeDrafts)
  } catch (error) {
    console.error("Sanity is unavailable. Using local article files.", error)
    return getLocalArticles(includeDrafts)
  }
}

export async function getArticle(slug: string) { return (await getAllArticles()).find((article) => article.slug === slug) }
export async function getByDesk(desk: Desk) { return (await getAllArticles()).filter((article) => article.primaryDesk === desk) }
export async function getFeatured() { const articles = await getAllArticles(false); return articles.find((article) => article.featured) || articles[0] }
export async function getRelated(article: Article) { return (await getAllArticles(false)).filter((candidate) => candidate.slug !== article.slug && (candidate.primaryDesk === article.primaryDesk || candidate.secondaryTopics.some((topic) => article.secondaryTopics.includes(topic)))).slice(0, 3) }

export async function getSearchIndex() {
  return (await getAllArticles(false)).map(({title, slug, excerpt, primaryDesk, secondaryTopics, body, contentFormat, readingTime: duration, publishedAt}) => ({
    title, slug, excerpt, primaryDesk, secondaryTopics, readingTime: duration, publishedAt,
    searchable: `${title} ${excerpt} ${primaryDesk} ${secondaryTopics.join(" ")} ${contentFormat === "sanity" ? toPlainText(body as PortableTextBlock[]) : String(body).replace(/[#*_[\]()]/g, " ")}`.toLowerCase(),
  }))
}
