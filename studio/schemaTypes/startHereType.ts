import {PlayIcon} from "@sanity/icons/Play"
import {defineArrayMember, defineField, defineType} from "sanity"

export const startHereType = defineType({
  name: "startHerePage",
  title: "Start Here page",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({name: "label", title: "Small heading", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "title", title: "Page title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "introduction", title: "Introduction", type: "array", of: [defineArrayMember({type: "block", styles: [{title: "Normal", value: "normal"}], lists: []})], validation: (rule) => rule.required()}),
    defineField({
      name: "steps",
      title: "Reading journey",
      description: "Drag items to change their order. Leave both destinations empty to show Coming soon.",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [defineArrayMember({
        name: "journeyStep",
        title: "Journey step",
        type: "object",
        fields: [
          defineField({name: "title", title: "Step title", type: "string", validation: (rule) => rule.required()}),
          defineField({name: "description", title: "Description", type: "text", rows: 3, validation: (rule) => rule.required()}),
          defineField({name: "article", title: "Linked article", type: "reference", to: [{type: "article"}], description: "Choose an article when this step has a supporting guide."}),
          defineField({name: "pagePath", title: "Or link to a website page", type: "string", description: "For example /latest. Leave empty when linking an article."}),
          defineField({name: "linkLabel", title: "Link text", type: "string", initialValue: "Read next"}),
        ],
        preview: {select: {title: "title", subtitle: "description"}},
      })],
    }),
    defineField({name: "seoDescription", title: "Search description", type: "text", rows: 3, validation: (rule) => rule.required().min(30).max(170)}),
  ],
  preview: {prepare: () => ({title: "Start Here page", subtitle: "Introduction and guided reading journey"})},
})
