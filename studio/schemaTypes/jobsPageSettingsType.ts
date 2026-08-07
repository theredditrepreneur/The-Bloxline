import {CaseIcon} from "@sanity/icons/Case"
import {defineArrayMember, defineField, defineType} from "sanity"

export const jobsPageSettingsType = defineType({
  name: "jobsPageSettings",
  title: "Jobs page settings",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({name: "careerGuidesHeading", title: "Career guides heading", type: "string", initialValue: "Explore Roblox Careers", validation: (rule) => rule.required()}),
    defineField({
      name: "careerGuides", title: "Career guide cards", type: "array",
      description: "Drag cards to change their order. Choose Published when an article is ready, or Coming soon when it is still being prepared.",
      of: [defineArrayMember({
        type: "object", name: "careerGuide", title: "Career guide",
        fields: [
          defineField({name: "status", title: "Card status", type: "string", initialValue: "comingSoon", options: {list: [{title: "Published article", value: "published"}, {title: "Coming soon", value: "comingSoon"}], layout: "radio"}, validation: (rule) => rule.required()}),
          defineField({name: "article", title: "Published article", type: "reference", to: [{type: "article"}], hidden: ({parent}) => parent?.status !== "published", validation: (rule) => rule.custom((value, context) => context.parent && (context.parent as {status?: string}).status === "published" && !value ? "Select the published article" : true)}),
          defineField({name: "title", title: "Card title", type: "string", description: "For published cards, leave empty to use the article headline.", validation: (rule) => rule.custom((value, context) => context.parent && (context.parent as {status?: string}).status === "comingSoon" && !value ? "Add a title for the coming soon card" : true)}),
          defineField({name: "description", title: "Card description", type: "text", rows: 2, description: "For published cards, leave empty to use the article summary."}),
          defineField({name: "label", title: "Small label", type: "string", initialValue: "Career guide", hidden: ({parent}) => parent?.status !== "published"}),
        ],
        preview: {select: {title: "title", articleTitle: "article.title", status: "status"}, prepare: ({title, articleTitle, status}) => ({title: title || articleTitle || "Untitled card", subtitle: status === "published" ? "Published article" : "Coming soon"})},
      })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {prepare: () => ({title: "Jobs page settings"})},
})
