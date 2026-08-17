import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import "./brand-overrides.css"
import {Header} from "@/components/Header"
import {Footer} from "@/components/Footer"
import {getSiteSettings} from "@/lib/sanity-content"
import {SanityLive} from "@/sanity/live"
import {siteConfig} from "@/lib/site"
import {GeeiqReferral} from "@/components/GeeiqReferral"

const inter = Inter({subsets: ["latin"], display: "swap"})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const socialImage = settings.defaultSocialImage ? new URL(settings.defaultSocialImage, settings.url).toString() : undefined
  return {
    metadataBase: new URL(settings.url),
    title: {default: "The Bloxline | Roblox Community Building for Games, Studios and Brands", template: `%s | ${settings.name}`},
    description: siteConfig.description,
    alternates: {canonical: "/"},
    icons: {icon: [{url: settings.logos.favicon}, {url: "/favicon.png", type: "image/png", sizes: "512x512"}], shortcut: settings.logos.favicon, apple: "/apple-touch-icon.png"},
    openGraph: {type: "website", siteName: settings.name, title: "The Bloxline | Roblox Community Building for Games, Studios and Brands", description: siteConfig.description, ...(socialImage ? {images: [{url: socialImage, width: 1254, height: 434, alt: settings.name}]} : {})},
    twitter: {card: socialImage ? "summary_large_image" : "summary", title: "The Bloxline | Roblox Community Building for Games, Studios and Brands", description: siteConfig.description, ...(socialImage ? {images: [socialImage]} : {})},
  }
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const settings = await getSiteSettings()
  const organisation = {"@context": "https://schema.org", "@type": "Organization", name: settings.name, url: settings.url, logo: new URL(settings.logos.compact, settings.url).toString(), founder: {"@type": "Person", name: settings.founder}, description: siteConfig.description, knowsAbout: ["Roblox community building", "Roblox audience strategy", "Roblox industry insights"]}
  return <html lang="en-GB"><body className={inter.className}><a className="skip-link" href="#main">Skip to content</a><Header name={settings.name} logo={settings.logos.compact} email={settings.commercialEmail}/><main id="main">{children}</main><GeeiqReferral/><Footer settings={settings}/><SanityLive/><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(organisation).replace(/</g, "\\u003c")}}/></body></html>
}
