import {defineQuery} from "next-sanity"

const articleFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  subtitle,
  excerpt,
  publishedAt,
  updatedAt,
  "author": coalesce(author->name, "Tonte Bo Douglas"),
  primaryDesk,
  secondaryTopics,
  coverImage{
    alt,
    crop,
    hotspot,
    asset->{_id, url, metadata{lqip, dimensions{width, height}}}
  },
  featured,
  draft,
  readingTime,
  seoTitle,
  seoDescription,
  canonicalUrl,
  sourceLinks[]{_key, title, url},
  disclosure,
  parentRelevance,
  teacherRelevance,
  industryRelevance,
  body[]{
    ...,
    _type == "image" => {alt, caption, crop, hotspot, asset->{_id, url, metadata{lqip, dimensions{width, height}}}}
  }
`

export const allArticlesQuery = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current) && draft != true]
  | order(publishedAt desc, _id asc){${articleFields}}
`)

export const allArticlesIncludingEditorialDraftsQuery = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current)]
  | order(publishedAt desc, _id asc){${articleFields}}
`)

export const articleBySlugQuery = defineQuery(/* groq */ `
  *[_type == "article" && slug.current == $slug && draft != true][0]{${articleFields}}
`)
