import {sanityClient} from "@/sanity/client"
import {jobsPageSettingsQuery} from "@/sanity/queries"

export type CareerGuideCard = {_key: string; status: "published" | "comingSoon"; title: string; description: string; label?: string; href?: string}
export type JobsPageSettings = {careerGuidesHeading: string; careerGuides: CareerGuideCard[]}

const defaults: JobsPageSettings = {
  careerGuidesHeading: "Explore Roblox Careers",
  careerGuides: [
    {_key: "who-builds", status: "published", title: "Who Builds Roblox Games?", description: "Meet the teams and specialist roles behind Roblox experiences.", label: "Career guide", href: "/articles/who-builds-roblox-games"},
    {_key: "career", status: "comingSoon", title: "Can Roblox Become a Career?", description: "Clear career guidance is being prepared by The Bloxline."},
    {_key: "developer", status: "comingSoon", title: "How to Become a Roblox Developer", description: "Clear career guidance is being prepared by The Bloxline."},
    {_key: "skills", status: "comingSoon", title: "What Skills Do Roblox Studios Look For?", description: "Clear career guidance is being prepared by The Bloxline."},
  ],
}

type SanitySettings = {careerGuidesHeading?: string; careerGuides?: Array<{_key?: string; status?: string; title?: string; description?: string; label?: string; articleTitle?: string; articleExcerpt?: string; articleSlug?: string}>}

export async function getJobsPageSettings(): Promise<JobsPageSettings> {
  try {
    const document = await sanityClient.withConfig({useCdn: false}).fetch<SanitySettings | null>(jobsPageSettingsQuery, {}, {next: {revalidate: 60, tags: ["jobsPageSettings"]}})
    if (!document?.careerGuides?.length) return defaults
    return {
      careerGuidesHeading: document.careerGuidesHeading || defaults.careerGuidesHeading,
      careerGuides: document.careerGuides.map((card, index) => ({
        _key: card._key || `career-${index}`,
        status: card.status === "published" && card.articleSlug ? "published" : "comingSoon",
        title: card.title || card.articleTitle || "Career guide",
        description: card.description || card.articleExcerpt || "Clear career guidance from The Bloxline.",
        label: card.label || "Career guide",
        href: card.articleSlug ? `/articles/${card.articleSlug}` : undefined,
      })),
    }
  } catch (error) {
    console.error("Unable to load Jobs page settings. Using defaults.", error)
    return defaults
  }
}
