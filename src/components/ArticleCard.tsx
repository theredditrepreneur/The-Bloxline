import Image from "next/image"
import Link from "next/link"
import type {Article} from "@/lib/articles"

export function ArticleCover({article, large = false}: {article: Article; large?: boolean}) {
  return <div className={`cover ${large ? "cover-large" : ""}`}><Image className="cover-image" src={article.coverImage} alt={article.coverAlt} fill sizes={large ? "(max-width: 900px) 100vw, 58vw" : "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"} priority={large}/></div>
}

export function ArticleCard({article}: {article: Article}) {
  return <article className="article-card"><Link href={`/articles/${article.slug}`} tabIndex={-1}><ArticleCover article={article}/></Link><div className="eyebrow">{article.primaryDesk}</div><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><div className="meta"><time dateTime={article.publishedAt}>{new Date(`${article.publishedAt}T12:00:00`).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"})}</time><span>{article.readingTime}</span></div></article>
}
