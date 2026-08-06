import {DocumentTextIcon} from "@sanity/icons/DocumentText"
import {defineArrayMember, defineField, defineType} from "sanity"

const deskOptions = ["Parents", "Industry", "Games", "Studios", "Education"].map((value) => ({title: value, value}))

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    {name: "content", title: "Article", default: true},
    {name: "publishing", title: "Publishing"},
    {name: "seo", title: "Search and sharing"},
    {name: "relevance", title: "Reader relevance"},
  ],
  fields: [
    defineField({name: "title", title: "Headline", type: "string", group: "content", validation: (rule) => rule.required().min(10)}),
    defineField({name: "slug", title: "Article address", type: "slug", group: "publishing", options: {source: "title", maxLength: 96}, validation: (rule) => rule.required().custom((slug) => !slug?.current || /^[a-z0-9-]+$/.test(slug.current) || "Use lowercase letters, numbers and hyphens only")}),
    defineField({name: "subtitle", title: "Subtitle", type: "text", rows: 2, group: "content"}),
    defineField({name: "excerpt", title: "Short summary", type: "text", rows: 3, group: "content", description: "Used on story cards and in search results.", validation: (rule) => rule.required().min(30).max(240)}),
    defineField({
      name: "body", title: "Article body", type: "array", group: "content",
      of: [
        defineArrayMember({type: "block", styles: [{title: "Normal", value: "normal"}, {title: "Heading 2", value: "h2"}, {title: "Heading 3", value: "h3"}, {title: "Quote", value: "blockquote"}], marks: {annotations: [{name: "link", title: "Link", type: "object", fields: [defineField({name: "href", title: "Address", type: "url", validation: (rule) => rule.uri({allowRelative: true, scheme: ["http", "https", "mailto"]})}), defineField({name: "openInNewTab", title: "Open in a new tab", type: "boolean", initialValue: false})]}]}}),
        defineArrayMember({type: "image", options: {hotspot: true}, fields: [defineField({name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required()}), defineField({name: "caption", title: "Caption", type: "string"})]}),
        defineArrayMember({type: "editorialCallout"}),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: "author", title: "Author", type: "reference", to: [{type: "author"}], group: "publishing", validation: (rule) => rule.required()}),
    defineField({
      name: "publishedAtTime",
      title: "Publication date and time",
      type: "datetime",
      group: "publishing",
      description: "Controls the exact order of articles. Newer times appear first, including when several articles are published on the same day.",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "publishedAt",
      title: "Original publication date",
      type: "date",
      group: "publishing",
      description: "Kept for existing articles. Set Publication date and time above when editing or publishing an article.",
      deprecated: {reason: "Use Publication date and time so articles published on the same day have a reliable order."},
      readOnly: true,
      hidden: ({value}) => value === undefined,
    }),
    defineField({name: "updatedAt", title: "Updated date", type: "date", group: "publishing"}),
    defineField({name: "primaryDesk", title: "Primary desk", type: "string", group: "publishing", options: {list: deskOptions, layout: "radio"}, validation: (rule) => rule.required()}),
    defineField({name: "secondaryTopics", title: "Topics", type: "array", group: "publishing", of: [defineArrayMember({type: "string"})], options: {layout: "tags"}, validation: (rule) => rule.unique()}),
    defineField({name: "coverImage", title: "Cover image", type: "image", group: "content", options: {hotspot: true}, fields: [defineField({name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required().warning("Alternative text is important for readers and search engines")})]}),
    defineField({name: "featured", title: "Feature on the homepage", type: "boolean", group: "publishing", initialValue: false}),
    defineField({name: "draft", title: "Keep off the public website", type: "boolean", group: "publishing", initialValue: true, description: "Turn this off when the article is ready to appear on the website."}),
    defineField({name: "readingTime", title: "Reading time", type: "string", group: "publishing", description: "Optional. The website estimates this when left empty."}),
    defineField({name: "seoTitle", title: "Search title", type: "string", group: "seo", validation: (rule) => rule.max(65).warning("Shorter titles are less likely to be cut off")}),
    defineField({name: "seoDescription", title: "Search description", type: "text", rows: 3, group: "seo", validation: (rule) => rule.required().min(30).max(170)}),
    defineField({name: "canonicalUrl", title: "Canonical address override", type: "url", group: "seo", description: "Leave empty for articles first published by The Bloxline."}),
    defineField({name: "sourceLinks", title: "Sources and further reading", type: "array", group: "content", of: [defineArrayMember({type: "object", fields: [defineField({name: "title", title: "Source title", type: "string", validation: (rule) => rule.required()}), defineField({name: "url", title: "Source address", type: "url", validation: (rule) => rule.required().uri({scheme: ["http", "https"]})})], preview: {select: {title: "title", subtitle: "url"}}})]}),
    defineField({name: "disclosure", title: "Disclosure", type: "text", rows: 3, group: "content"}),
    defineField({name: "parentRelevance", title: "Why this matters to parents", type: "text", rows: 2, group: "relevance"}),
    defineField({name: "teacherRelevance", title: "Why this matters to teachers", type: "text", rows: 2, group: "relevance"}),
    defineField({name: "industryRelevance", title: "Why this matters to industry readers", type: "text", rows: 2, group: "relevance"}),
  ],
  orderings: [{title: "Publication time, newest first", name: "publishedAtTimeDesc", by: [{field: "publishedAtTime", direction: "desc"}, {field: "_createdAt", direction: "desc"}]}],
  preview: {select: {title: "title", subtitle: "primaryDesk", media: "coverImage", draft: "draft"}, prepare: ({title, subtitle, media, draft}) => ({title: title || "Untitled article", subtitle: `${subtitle || "No desk"}${draft ? " · Not public" : ""}`, media})},
})
