import {getAllArticles} from "@/lib/articles"
import {absoluteUrl, siteConfig} from "@/lib/site"

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({"<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;"})[character]!)

export async function GET() {
  const items = (await getAllArticles(false)).map((article) => `<item><title>${escapeXml(article.title)}</title><link>${absoluteUrl(`/articles/${article.slug}`)}</link><guid>${absoluteUrl(`/articles/${article.slug}`)}</guid><pubDate>${new Date(`${article.publishedAt}T12:00:00Z`).toUTCString()}</pubDate><description>${escapeXml(article.excerpt)}</description><category>${article.primaryDesk}</category></item>`).join("")
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${siteConfig.name}</title><link>${siteConfig.url}</link><description>${escapeXml(siteConfig.description)}</description><language>en-gb</language>${items}</channel></rss>`
  return new Response(xml, {headers: {"Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600"}})
}
