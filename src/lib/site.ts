const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL

export type SiteSettings = {
  name: string
  tagline: string
  description: string
  footerDescription: string
  founder: string
  url: string
  contactEmail: string
  jobsEmail: string
  commercialEmail: string
  social: Record<string, string>
  logos: {horizontal: string; compact: string; favicon: string}
  defaultSocialImage?: string
  disclaimer: string
}

export const siteConfig: SiteSettings = {
  name: "The Bloxline",
  tagline: "Roblox Community And Audience Services",
  description: "The Bloxline helps Roblox games, studios and brands build communities, understand audiences and connect with people beyond the game.",
  footerDescription: "Roblox community and audience services for games, studios and brands.",
  founder: "Tonte Bo Douglas",
  url: configuredUrl || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@thebloxline.com",
  jobsEmail: process.env.NEXT_PUBLIC_JOBS_EMAIL || "thebloxline@gmail.com",
  commercialEmail: process.env.NEXT_PUBLIC_COMMERCIAL_EMAIL || "thebloxline@gmail.com",
  social: {
    Instagram: "https://www.instagram.com/thebloxline",
    YouTube: "https://youtube.com/@thebloxline",
    TikTok: "https://www.tiktok.com/@thebloxline",
    Facebook: "https://www.facebook.com/share/14n3ogsZ532/?mibextid=wwXIfr",
    LinkedIn: "https://www.linkedin.com/company/the-bloxline",
  },
  logos: {horizontal: "/brand/bloxline-banner.jpg", compact: "/brand/bloxline-logo.jpg", favicon: "/brand/bloxline-favicon.jpg"},
  defaultSocialImage: undefined,
  disclaimer: "The Bloxline is an independent business and publication and is not affiliated with, endorsed by or operated by Roblox Corporation.",
}

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString()
