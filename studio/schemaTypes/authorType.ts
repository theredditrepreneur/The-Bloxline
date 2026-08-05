import {UserIcon} from "@sanity/icons/User"
import {defineField, defineType} from "sanity"

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({name: "name", title: "Name", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "slug", title: "Slug", type: "slug", options: {source: "name", maxLength: 96}, validation: (rule) => rule.required()}),
    defineField({name: "role", title: "Role", type: "string"}),
    defineField({name: "bio", title: "Short biography", type: "text", rows: 4}),
    defineField({name: "photo", title: "Photo", type: "image", options: {hotspot: true}, fields: [defineField({name: "alt", title: "Alternative text", type: "string"})]}),
  ],
  preview: {select: {title: "name", subtitle: "role", media: "photo"}},
})
