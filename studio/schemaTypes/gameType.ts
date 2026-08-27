import {PlayIcon} from "@sanity/icons/Play"
import {defineArrayMember, defineField, defineType} from "sanity"

export const gameType = defineType({
  name: "game",
  title: "Game",
  type: "document",
  icon: PlayIcon,
  groups: [
    {name: "details", title: "Game details", default: true},
    {name: "gameplay", title: "Gameplay and cover"},
    {name: "studio", title: "Studio"},
    {name: "connections", title: "Related content"},
    {name: "publishing", title: "Publishing"},
  ],
  fields: [
    defineField({name: "title", title: "Game title", type: "string", group: "details", validation: (rule) => rule.required()}),
    defineField({name: "slug", title: "Game page address", type: "slug", group: "details", options: {source: "title", maxLength: 96}, description: "Optional. The website creates an address from the game title when this is left empty."}),
    defineField({name: "description", title: "Short description", type: "text", rows: 3, group: "details", description: "A short plain English introduction for the game page and search results."}),
    defineField({name: "thoughts", title: "The Bloxline thoughts", type: "text", rows: 6, group: "details", description: "Optional notes from playing the game."}),
    defineField({name: "genre", title: "Genre", type: "string", group: "details"}),
    defineField({name: "coverImage", title: "Cover image", type: "image", group: "gameplay", options: {hotspot: true}, fields: [defineField({name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required().warning("Alternative text is important for readers and search engines")})]}),
    defineField({name: "youtubeUrl", title: "YouTube gameplay link", type: "url", group: "gameplay", description: "Required. Paste the full YouTube gameplay link.", validation: (rule) => rule.required().uri({scheme: ["https"]})}),
    defineField({name: "robloxGameUrl", title: "Official Roblox game link", type: "url", group: "gameplay", description: "Optional. Paste the full Roblox experience link, for example https://www.roblox.com/games/...", validation: (rule) => rule.uri({scheme: ["https"]})}),
    defineField({name: "gameplayDuration", title: "Gameplay duration", type: "string", group: "gameplay", description: "For example, 12 minutes."}),
    defineField({name: "gameplayUploadedAt", title: "Gameplay uploaded date", type: "date", group: "gameplay"}),
    defineField({name: "developer", title: "Developer or studio", type: "string", group: "studio"}),
    defineField({name: "publisher", title: "Publisher", type: "string", group: "studio"}),
    defineField({name: "studioWebsite", title: "Studio website", type: "url", group: "studio", validation: (rule) => rule.uri({scheme: ["https"]})}),
    defineField({name: "studioDiscord", title: "Studio Discord", type: "url", group: "studio", validation: (rule) => rule.uri({scheme: ["https"]})}),
    defineField({name: "releaseStatus", title: "Release status", type: "string", group: "details", options: {list: ["Live", "In development", "Early access", "Unavailable"], layout: "radio"}}),
    defineField({name: "releaseDate", title: "Release date", type: "date", group: "details"}),
    defineField({name: "relatedArticles", title: "Related articles", type: "array", group: "connections", of: [defineArrayMember({type: "reference", to: [{type: "article"}]})]}),
    defineField({name: "relatedGames", title: "Related games", type: "array", group: "connections", of: [defineArrayMember({type: "reference", to: [{type: "game"}]})]}),
    defineField({name: "status", title: "Public status", type: "string", group: "publishing", initialValue: "published", options: {list: [{title: "Published", value: "published"}, {title: "Keep off the public website", value: "draft"}], layout: "radio"}}),
  ],
  orderings: [{title: "Newest first", name: "newest", by: [{field: "_createdAt", direction: "desc"}]}],
  preview: {select: {title: "title", subtitle: "genre", media: "coverImage", status: "status"}, prepare: ({title, subtitle, media, status}) => ({title: title || "Untitled game", subtitle: `${subtitle || "Roblox game"}${status === "draft" ? " · Not public" : ""}`, media})},
})
