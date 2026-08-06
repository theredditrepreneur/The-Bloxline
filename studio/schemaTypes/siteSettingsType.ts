import {CogIcon} from "@sanity/icons/Cog"
import {defineField, defineType} from "sanity"

const brandedImage = (name: string, title: string, description: string) => defineField({
  name,
  title,
  description,
  type: "image",
  options: {hotspot: true},
  fields: [defineField({name: "alt", title: "Alternative text", type: "string"})],
})

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site details",
  type: "document",
  icon: CogIcon,
  groups: [
    {name: "identity", title: "Identity", default: true},
    {name: "homepage", title: "Homepage"},
    {name: "images", title: "Logos and images"},
    {name: "contact", title: "Contact and legal"},
    {name: "social", title: "Social profiles"},
  ],
  fields: [
    defineField({name: "name", title: "Publication title", type: "string", group: "identity", validation: (rule) => rule.required()}),
    defineField({name: "tagline", title: "Tagline", type: "string", group: "identity", validation: (rule) => rule.required()}),
    defineField({name: "description", title: "Search and publication description", type: "text", rows: 3, group: "identity", validation: (rule) => rule.required().min(30)}),
    defineField({name: "footerDescription", title: "Footer description", type: "text", rows: 3, group: "identity", validation: (rule) => rule.required()}),
    defineField({name: "founder", title: "Founder", type: "string", group: "identity"}),
    defineField({name: "featuredArticle", title: "Featured homepage article", type: "reference", to: [{type: "article"}], group: "homepage", description: "Choose the main story shown at the top of the homepage. You can change it at any time.", options: {filter: "draft != true"}}),
    brandedImage("headerLogo", "Header logo", "The compact logo shown at the top of the website."),
    brandedImage("footerLogo", "Footer banner", "The wide banner shown in the footer."),
    brandedImage("favicon", "Favicon", "The small B icon shown in browser tabs. A square image works best."),
    brandedImage("socialImage", "Default sharing image", "Used when a page does not have its own sharing image."),
    defineField({name: "instagram", title: "Instagram", type: "url", group: "social", validation: (rule) => rule.uri({scheme: ["https"]})}),
    defineField({name: "youtube", title: "YouTube", type: "url", group: "social", validation: (rule) => rule.uri({scheme: ["https"]})}),
    defineField({name: "tiktok", title: "TikTok", type: "url", group: "social", validation: (rule) => rule.uri({scheme: ["https"]})}),
    defineField({name: "facebook", title: "Facebook", type: "url", group: "social", validation: (rule) => rule.uri({scheme: ["https"]})}),
    defineField({name: "linkedin", title: "LinkedIn", type: "url", group: "social", validation: (rule) => rule.uri({scheme: ["https"]})}),
    defineField({name: "contactEmail", title: "Contact email", type: "string", group: "contact", validation: (rule) => rule.email()}),
    defineField({name: "disclaimer", title: "Independence statement", type: "text", rows: 3, group: "contact", validation: (rule) => rule.required()}),
  ],
  preview: {prepare: () => ({title: "Site details", subtitle: "Title, logos, favicon and contact details"})},
})
