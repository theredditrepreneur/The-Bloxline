import type {MetadataRoute} from "next"
import {getAllArticles} from "@/lib/articles"
import {absoluteUrl} from "@/lib/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/latest", "/parents", "/industry", "/games", "/studios", "/education", "/start-here", "/about", "/contact", "/search", "/jobs", "/privacy", "/terms"].map((route) => ({
    url: absoluteUrl(route || "/"), lastModified: new Date(), changeFrequency: route === "" ? "daily" as const : "weekly" as const, priority: route === "" ? 1 : 0.7,
  }))
  const articles = (await getAllArticles(false)).map((article) => ({url: absoluteUrl(`/articles/${article.slug}`), lastModified: new Date(article.updatedAt || article.publishedAt), changeFrequency: "monthly" as const, priority: 0.8}))
  return [...routes, ...articles]
}
