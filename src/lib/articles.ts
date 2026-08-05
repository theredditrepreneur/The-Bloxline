import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

export const desks = ["Parents", "Industry", "Games", "Studios", "Education"] as const;
export type Desk = (typeof desks)[number];

const articleSchema = z.object({
  title: z.string().min(10), slug: z.string().regex(/^[a-z0-9-]+$/), subtitle: z.string().optional(), excerpt: z.string().min(30),
  publishedAt: z.string().date(), updatedAt: z.string().date().optional(), author: z.string().min(2), primaryDesk: z.enum(desks),
  secondaryTopics: z.array(z.string()).default([]), coverImage: z.string(), coverAlt: z.string().min(5), featured: z.boolean().default(false),
  draft: z.boolean().default(true), readingTime: z.string().optional(), seoTitle: z.string().optional(), seoDescription: z.string().min(30),
  canonicalUrl: z.string().url().optional(), sourceLinks: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
  disclosure: z.string().optional(), parentRelevance: z.string().optional(), teacherRelevance: z.string().optional(), industryRelevance: z.string().optional(),
});
export type ArticleMeta = z.infer<typeof articleSchema>;
export type Article = ArticleMeta & { body: string };
const articleDir = path.join(process.cwd(), "content", "articles");

export function getAllArticles(includeDrafts = process.env.NODE_ENV !== "production"): Article[] {
  if (!fs.existsSync(articleDir)) return [];
  return fs.readdirSync(articleDir).filter((f) => f.endsWith(".mdx") && !f.startsWith("_")).map((file) => {
    const raw = fs.readFileSync(path.join(articleDir, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = articleSchema.safeParse(data);
    if (!parsed.success) throw new Error(`Invalid article frontmatter in ${file}: ${parsed.error.issues.map(i => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
    if (parsed.data.slug !== file.replace(/\.mdx$/, "")) throw new Error(`Slug mismatch in ${file}`);
    return { ...parsed.data, readingTime: parsed.data.readingTime || readingTime(content).text.replace("min read", "minute read"), body: content };
  }).filter((a) => includeDrafts || !a.draft).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export const getArticle = (slug: string) => getAllArticles().find((a) => a.slug === slug);
export const getByDesk = (desk: Desk) => getAllArticles().filter((a) => a.primaryDesk === desk);
export const getFeatured = () => getAllArticles().find((a) => a.featured) || getAllArticles()[0];
export const getRelated = (article: Article) => getAllArticles().filter((a) => a.slug !== article.slug && (a.primaryDesk === article.primaryDesk || a.secondaryTopics.some(t => article.secondaryTopics.includes(t)))).slice(0, 3);

export function getSearchIndex() {
  return getAllArticles(false).map(({ title, slug, excerpt, primaryDesk, secondaryTopics, body, readingTime, publishedAt }) => ({
    title, slug, excerpt, primaryDesk, secondaryTopics, readingTime, publishedAt,
    searchable: `${title} ${excerpt} ${primaryDesk} ${secondaryTopics.join(" ")} ${body.replace(/[#*_[\]()]/g, " ")}`.toLowerCase(),
  }));
}
