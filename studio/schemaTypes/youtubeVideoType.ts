import {PlayIcon} from "@sanity/icons/Play"
import {defineField, defineType} from "sanity"

export const youtubeVideoType = defineType({
  name: "youtubeVideo",
  title: "YouTube video",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      title: "YouTube video link",
      type: "url",
      description: "Paste a YouTube watch, short, share or embed link.",
      validation: (rule) => rule.required().uri({scheme: ["http", "https"]}).custom((value) => {
        if (!value) return true
        try {
          const host = new URL(value).hostname.replace(/^www\./, "")
          return ["youtube.com", "m.youtube.com", "youtu.be", "youtube-nocookie.com"].includes(host) || "Use a YouTube link."
        } catch {
          return "Use a valid YouTube link."
        }
      }),
    }),
    defineField({name: "title", title: "Video title", type: "string", description: "Optional. Used by screen readers."}),
  ],
  preview: {
    select: {title: "title", subtitle: "url"},
    prepare: ({title, subtitle}) => ({title: title || "YouTube video", subtitle, media: PlayIcon}),
  },
})
