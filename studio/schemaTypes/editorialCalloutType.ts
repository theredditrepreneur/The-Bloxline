import {InfoOutlineIcon} from "@sanity/icons/InfoOutline"
import {defineArrayMember, defineField, defineType} from "sanity"

export const editorialCalloutType = defineType({
  name: "editorialCallout",
  title: "Editorial callout",
  type: "object",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "kind",
      title: "Callout type",
      type: "string",
      options: {layout: "dropdown", list: ["What Adults Need to Know", "Why It Matters", "For Parents", "For Teachers", "Business Angle", "In Plain English", "Key Takeaways", "The Bloxline View", "Editor’s Note"]},
      validation: (rule) => rule.required(),
    }),
    defineField({name: "body", title: "Text", type: "array", of: [defineArrayMember({type: "block"})], validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: "kind"}, prepare: ({title}) => ({title: title || "Editorial callout"})},
})
