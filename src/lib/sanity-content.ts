import {siteConfig, type SiteSettings} from "@/lib/site"
import {sanityClient} from "@/sanity/client"
import {siteSettingsQuery, startHerePageQuery} from "@/sanity/queries"

type SiteSettingsDocument = {
  name?: string | null
  tagline?: string | null
  description?: string | null
  footerDescription?: string | null
  founder?: string | null
  contactEmail?: string | null
  disclaimer?: string | null
  headerLogo?: string | null
  footerLogo?: string | null
  favicon?: string | null
  socialImage?: string | null
}

export type StartHereStep = {_key: string; title: string; description: string; linkLabel: string; href?: string}
export type StartHereContent = {label: string; title: string; introduction: unknown[]; seoDescription: string; steps: StartHereStep[]}
type StartHereDocument = {
  label?: string | null
  title?: string | null
  introduction?: unknown[] | null
  seoDescription?: string | null
  steps?: Array<{_key: string; title: string; description: string; linkLabel?: string | null; pagePath?: string | null; articleSlug?: string | null}> | null
}

const defaultStartHere: StartHereContent = {
  label: "Essential guide",
  title: "Start Here: An Adult’s Introduction to Roblox",
  introduction: [
    {_key: "intro1", _type: "block", style: "normal", markDefs: [], children: [{_key: "span1", _type: "span", marks: [], text: "You do not need to play Roblox every day to understand why it matters."}]},
    {_key: "intro2", _type: "block", style: "normal", markDefs: [], children: [{_key: "span2", _type: "span", marks: [], text: "This guide explains the platform, its games, economy, culture and risks in plain English."}]},
  ],
  seoDescription: "A guided introduction to Roblox, its games, economy, culture and risks in plain English.",
  steps: [
    ["What is Roblox?", "Begin with Roblox itself and the difference between the platform and the experiences inside it.", "/articles/what-is-roblox-a-clear-guide-for-adults"],
    ["Why do children enjoy it?", "Understand the mix of play, creativity, friendship and constant novelty.", "/articles/why-children-enjoy-roblox-so-much"],
    ["What are Roblox experiences?", "Learn why Roblox calls its games experiences and how they range from simple social spaces to complex games."],
    ["What is Robux?", "A plain English guide to Roblox money, spending and the questions adults should ask."],
    ["How does Roblox make money?", "Follow the money between players, game makers and Roblox.", "/articles/how-roblox-games-actually-make-money"],
    ["Is Roblox safe?", "A balanced introduction to chat, content, parental controls and age appropriate choices."],
    ["Who builds Roblox games?", "Meet the developers, teams and studios behind Roblox experiences.", "/articles/who-builds-roblox-games"],
    ["Why are brands and businesses paying attention?", "Explore audiences, advertising, virtual shopping and the limits of the opportunity."],
    ["Can Roblox become a career?", "Understand the jobs, skills and uncertain paths in the world of Roblox."],
    ["What should adults explore next?", "Continue with the latest Bloxline guides and analysis.", "/latest"],
  ].map(([title, description, href], index) => ({_key: `default${index}`, title, description, href, linkLabel: "Read next"})),
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settings = await sanityClient.withConfig({useCdn: false}).fetch<SiteSettingsDocument | null>(siteSettingsQuery, {}, {next: {revalidate: 60, tags: ["siteSettings"]}})
    if (!settings) return siteConfig
    return {
      ...siteConfig,
      name: settings.name || siteConfig.name,
      tagline: settings.tagline || siteConfig.tagline,
      description: settings.description || siteConfig.description,
      footerDescription: settings.footerDescription || siteConfig.footerDescription,
      founder: settings.founder || siteConfig.founder,
      contactEmail: settings.contactEmail || siteConfig.contactEmail,
      disclaimer: settings.disclaimer || siteConfig.disclaimer,
      logos: {
        horizontal: settings.footerLogo || siteConfig.logos.horizontal,
        compact: settings.headerLogo || siteConfig.logos.compact,
        favicon: settings.favicon || siteConfig.logos.favicon,
      },
      defaultSocialImage: settings.socialImage || undefined,
    }
  } catch (error) {
    console.error("Unable to load Sanity site settings.", error)
    return siteConfig
  }
}

export async function getStartHereContent(): Promise<StartHereContent> {
  try {
    const data = await sanityClient.withConfig({useCdn: false}).fetch<StartHereDocument | null>(startHerePageQuery, {}, {next: {revalidate: 60, tags: ["startHerePage"]}})
    if (!data) return defaultStartHere
    return {
      label: data.label || defaultStartHere.label,
      title: data.title || defaultStartHere.title,
      introduction: Array.isArray(data.introduction) ? data.introduction : defaultStartHere.introduction,
      seoDescription: data.seoDescription || defaultStartHere.seoDescription,
      steps: Array.isArray(data.steps) ? data.steps.map((step) => ({
        _key: step._key,
        title: step.title,
        description: step.description,
        linkLabel: step.linkLabel || "Read next",
        href: step.articleSlug ? `/articles/${step.articleSlug}` : step.pagePath || undefined,
      })) : defaultStartHere.steps,
    }
  } catch (error) {
    console.error("Unable to load the Sanity Start Here page.", error)
    return defaultStartHere
  }
}
