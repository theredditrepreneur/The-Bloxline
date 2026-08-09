import {defineQuery} from "next-sanity"

const articleFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  subtitle,
  excerpt,
  "publishedAt": coalesce(publishedAtTime, publishedAt + "T12:00:00Z"),
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
  | order(coalesce(publishedAtTime, publishedAt) desc, _createdAt desc){${articleFields}}
`)

export const allArticlesIncludingEditorialDraftsQuery = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current)]
  | order(coalesce(publishedAtTime, publishedAt) desc, _createdAt desc){${articleFields}}
`)

export const featuredArticleQuery = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0].featuredArticle->{${articleFields}}
`)

export const articleBySlugQuery = defineQuery(/* groq */ `
  *[_type == "article" && slug.current == $slug && draft != true][0]{${articleFields}}
`)

export const siteSettingsQuery = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0]{
    name,
    tagline,
    description,
    footerDescription,
    founder,
    contactEmail,
    disclaimer,
    "headerLogo": headerLogo.asset->url,
    "footerLogo": footerLogo.asset->url,
    "favicon": favicon.asset->url,
    "socialImage": socialImage.asset->url,
    instagram,
    youtube,
    tiktok,
    facebook,
    linkedin
  }
`)

export const startHerePageQuery = defineQuery(/* groq */ `
  *[_id == "startHerePage"][0]{
    label,
    title,
    introduction,
    seoDescription,
    steps[]{
      _key,
      title,
      description,
      linkLabel,
      pagePath,
      "articleSlug": article->slug.current
    }
  }
`)

export const allJobsQuery = defineQuery(/* groq */ `
  *[_type == "job" && defined(slug.current)]
  | order(coalesce(datePosted, dateDiscovered) desc, _createdAt desc){
    _id,
    "id": coalesce(sourceId, _id),
    "slug": slug.current,
    title,
    company,
    "companySlug": companySlug.current,
    companyDescription,
    companyUrl,
    location,
    remoteType,
    employmentType,
    category,
    aboutRole,
    description,
    whoItSuits,
    ecosystemContext,
    sourceUrl,
    applicationUrl,
    dateDiscovered,
    datePosted,
    closingDate,
    verifiedAt,
    status,
    featured,
    salary,
    salaryCurrency,
    salaryPeriod,
    tags,
    studioProfileSlug,
    remoteEligibility
  }
`)

export const jobsPageSettingsQuery = defineQuery(/* groq */ `
  *[_id == "jobsPageSettings"][0]{
    careerGuidesHeading,
    careerGuides[]{
      _key,
      status,
      title,
      description,
      label,
      "articleTitle": article->title,
      "articleExcerpt": article->excerpt,
      "articleSlug": article->slug.current
    }
  }
`)
