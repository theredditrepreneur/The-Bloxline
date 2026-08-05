import type {Metadata} from "next"
import Link from "next/link"
import {notFound} from "next/navigation"
import {MDXRemote} from "next-mdx-remote/rsc"
import {ArticleCard, ArticleCover} from "@/components/ArticleCard"
import {Newsletter} from "@/components/Newsletter"
import {SanityBody} from "@/components/SanityBody"
import {ShareArticle} from "@/components/ShareArticle"
import * as Callouts from "@/components/Callouts"
import {getAllArticles, getArticle, getRelated} from "@/lib/articles"
import {absoluteUrl, siteConfig} from "@/lib/site"

export const dynamicParams = true

export async function generateStaticParams() {
  return (await getAllArticles(false)).map((article) => ({slug: article.slug}))
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params
  const article = await getArticle(slug)
  if (!article) return {}
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription,
    alternates: {canonical: article.canonicalUrl || `/articles/${article.slug}`},
    openGraph: {type: "article", title: article.title, description: article.seoDescription, publishedTime: article.publishedAt, modifiedTime: article.updatedAt, authors: [article.author], section: article.primaryDesk, ...(article.coverImage ? {images: [{url: article.coverImage, alt: article.coverAlt || ""}]} : {images: []})},
    twitter: {card: article.coverImage ? "summary_large_image" : "summary", title: article.title, description: article.seoDescription, ...(article.coverImage ? {images: [article.coverImage]} : {images: []})},
  }
}

const formatDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"})

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const article = await getArticle(slug)
  if (!article) notFound()
  const related = await getRelated(article)
  const articleJson = {"@context": "https://schema.org", "@type": "NewsArticle", headline: article.title, description: article.seoDescription, datePublished: article.publishedAt, dateModified: article.updatedAt || article.publishedAt, mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`), author: {"@type": "Person", name: article.author}, publisher: {"@type": "NewsMediaOrganization", name: siteConfig.name, logo: {"@type": "ImageObject", url: absoluteUrl(siteConfig.logos.compact)}}, ...(article.coverImage ? {image: article.coverImage.startsWith("http") ? article.coverImage : absoluteUrl(article.coverImage)} : {})}
  const crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{"@type": "ListItem", position: 1, name: "Home", item: siteConfig.url}, {"@type": "ListItem", position: 2, name: article.primaryDesk, item: absoluteUrl(`/${article.primaryDesk.toLowerCase()}`)}, {"@type": "ListItem", position: 3, name: article.title, item: absoluteUrl(`/articles/${article.slug}`)}]}

  return <>
    <article>
      <header className="article-header">
        <span className="eyebrow"><Link href={`/${article.primaryDesk.toLowerCase()}`}>{article.primaryDesk}</Link></span>
        <h1>{article.title}</h1>
        {article.subtitle && <p className="subtitle">{article.subtitle}</p>}
        <div className="meta article-meta">
          <span className="byline">By {article.author}</span>
          <span className="meta-divider" aria-hidden="true">•</span>
          <time dateTime={article.publishedAt}>Published {formatDate(article.publishedAt)}</time>
          {article.updatedAt && <><span className="meta-divider" aria-hidden="true">•</span><time dateTime={article.updatedAt}>Updated {formatDate(article.updatedAt)}</time></>}
          <span className="meta-divider" aria-hidden="true">•</span>
          <span className="reading-time">{article.readingTime}</span>
        </div>
        <ShareArticle title={article.title} url={absoluteUrl(`/articles/${article.slug}`)}/>
      </header>
      <div className="article-hero"><ArticleCover article={article} large/></div>
      <div className="article-layout">
        <div className="prose">
          {article.contentFormat === "sanity" ? <SanityBody value={article.body as unknown[]}/> : <MDXRemote source={article.body as string} components={Callouts}/>}
          {article.sourceLinks.length > 0 && <section className="source-list"><h2>Sources and Further Reading</h2><ul>{article.sourceLinks.map((source) => <li key={source.url}><a href={source.url} rel="noopener noreferrer">{source.title}</a></li>)}</ul></section>}
          {article.disclosure && <section className="callout"><h2>Disclosure</h2><p>{article.disclosure}</p></section>}
        </div>
        <aside className="article-aside"><div><strong>Published</strong><time dateTime={article.publishedAt}>{article.publishedAt}</time><strong style={{marginTop: 14}}>Desk</strong><Link className="text-link" href={`/${article.primaryDesk.toLowerCase()}`}>{article.primaryDesk}</Link></div></aside>
      </div>
    </article>
    {related.length > 0 && <section className="section container"><div className="section-heading"><h2>Related stories</h2><Link className="text-link" href={`/${article.primaryDesk.toLowerCase()}`}>Explore {article.primaryDesk}</Link></div><div className="article-grid">{related.map((story) => <ArticleCard key={story.slug} article={story}/>)}</div></section>}
    <section className="container" style={{paddingBottom: 64}}><Newsletter compact/></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(articleJson).replace(/</g, "\\u003c")}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(crumbs).replace(/</g, "\\u003c")}}/>
  </>
}
