const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteConfig = {
  name: "The Bloxline",
  tagline: "The Adult’s Guide to Roblox",
  description: "The Bloxline explains the games, businesses, studios, creators, education, safety and culture shaping Roblox.",
  founder: "Tonte Bo Douglas",
  url: configuredUrl || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@thebloxline.com",
  social: {} as Record<string, string>,
  logos: { horizontal: "/brand/bloxline-banner.jpg", compact: "/brand/bloxline-logo.jpg", favicon: "/brand/bloxline-favicon.jpg" },
  defaultSocialImage: "/brand/bloxline-banner.jpg",
  disclaimer: "The Bloxline is an independent publication and is not affiliated with, endorsed by or operated by Roblox Corporation.",
} as const;

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();
