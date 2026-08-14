import type {Metadata} from "next"
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
  return <>
    <header className="service-page-hero"><div className="container"><span className="eyebrow">Roblox Services</span><h1>Commercial support for Roblox games, studios and brands.</h1><p>The Bloxline helps Roblox companies build stronger communities, understand their audiences and communicate with people beyond the game.</p><a className="button" href={email}>Talk To Us</a></div></header>
    <section className="service-directory container"><div className="agency-service-grid">{services.map((service) => <article className="agency-service-card" key={service.title}><h2>{service.title}</h2><p>{service.copy}</p><p className="service-detail"><strong>{service.details}</strong></p><Link className="text-link" href={service.href}>{service.cta}</Link></article>)}</div></section>
    <section className="agency-proof"><div className="container agency-proof-grid"><div><span className="eyebrow">Why The Bloxline</span><h2>Roblox is the specialism.</h2></div><div><p>The Bloxline is not a general marketing or advertising agency.</p><p>Our work is built around Roblox games, their communities and the adults, brands and businesses trying to understand the platform.</p><p>That focused knowledge shapes every community structure, content recommendation and audience conversation.</p></div></div></section>
  </>
}
