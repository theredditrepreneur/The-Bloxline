import type {Metadata} from "next"
import Image from "next/image"
import Link from "next/link"
import {siteConfig} from "@/lib/site"

export const metadata: Metadata = {
  title: {absolute: "Roblox Services for Studios and Brands | The Bloxline"},
  description: "Commercial Roblox community and audience services for games, studios and brands.",
  alternates: {canonical: "/services"},
  openGraph: {title: "Roblox Services for Studios and Brands | The Bloxline", description: "Commercial Roblox community and audience services for games, studios and brands.", url: "/services", type: "website"},
}

const services = [
  {title: "Roblox Community Building", copy: "Build or rebuild a Reddit community that gives players somewhere to discuss updates, share feedback, create content and stay connected to your game.", details: "Community launch projects start from £495.", href: "/services/community-building", cta: "Explore Community Building"},
  {title: "Community Management", copy: "Ongoing content, discussion, moderation oversight, feedback collection and reporting for Roblox communities that need consistent support.", details: "Ongoing management starts from £395 per month.", href: "/services/community-building#pricing", cta: "View Management Options"},
  {title: "Roblox Audience And Adult Strategy", copy: "Clear positioning, messaging and content support for studios and brands that need to communicate Roblox to adults and people outside the traditional player audience.", details: "Strategy projects start from £495.", href: "/services/adult-audience", cta: "Explore Adult Audience Strategy"},
]

export default function ServicesPage() {
  const email = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Bloxline Enquiry")}`
  const communityEmail = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Roblox Community Enquiry")}`
  return <>
    <header className="service-page-hero"><div className="container"><span className="eyebrow">Roblox Services</span><h1>Commercial support for Roblox games, studios and brands.</h1><p>The Bloxline helps Roblox studios build stronger public communities around their games through Reddit strategy, community infrastructure and player focused editorial thinking.</p><a className="button" href={email}>Talk To Us</a></div></header>
    <section className="service-directory container"><div className="agency-service-grid">{services.map((service) => <article className="agency-service-card" key={service.title}><h2>{service.title}</h2><p>{service.copy}</p><p className="service-detail"><strong>{service.details}</strong></p><Link className="text-link" href={service.href}>{service.cta}</Link></article>)}</div></section>
    <section className="client-work container"><div className="section-heading"><div><span className="eyebrow">Client Work</span><h2>Current community launch</h2></div></div><article className="client-work-card"><div className="client-work-identity"><Image src="/clients/mma-rise-to-champion-logo.png" alt="MMA Rise To Champion" width={1254} height={1254}/></div><div><span className="eyebrow">Reddit Community Launch</span><h3>MMA Rise to Champion</h3><p>The Bloxline is working with MMA Rise to Champion on the launch of its Reddit community.</p><p>Our work includes subreddit setup, Reddit content strategy and launch support, helping the game establish a public community space that can sit alongside its existing channels and grow with its players.</p><div className="client-work-links"><a className="text-link" href="https://discord.gg/champsavenue" target="_blank" rel="noopener noreferrer">Join the game community on Discord</a><a className="text-link" href={communityEmail}>Building a Roblox game? Let&apos;s build the community around it.</a></div></div></article></section>
    <section className="agency-proof"><div className="container agency-proof-grid"><div><span className="eyebrow">Why The Bloxline</span><h2>Roblox is the specialism.</h2></div><div><p>The Bloxline is not a general marketing or advertising agency.</p><p>Our work is built around Roblox games, their communities and the adults, brands and businesses trying to understand the platform.</p><p>That focused knowledge shapes every community structure, content recommendation and audience conversation.</p></div></div></section>
  </>
}
