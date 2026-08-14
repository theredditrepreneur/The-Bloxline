import type {Metadata} from "next"
import Image from "next/image"
import Link from "next/link"
import {SocialIcon} from "@/components/SocialIcon"
import {siteConfig} from "@/lib/site"

const founderLinkedIn = "https://www.linkedin.com/in/tontebodouglas"

export const metadata: Metadata = {
  title: {absolute: "About The Bloxline | Roblox Community And Audience Agency"},
  description: "The Bloxline helps Roblox developers and studios build communities while helping businesses communicate Roblox to wider adult audiences.",
  alternates: {canonical: "/about"},
}

export default function AboutPage() {
  const email = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Bloxline Enquiry")}`
  const structuredData = {"@context": "https://schema.org", "@type": "AboutPage", name: "About The Bloxline", url: `${siteConfig.url}/about`, mainEntity: {"@type": "Organization", name: "The Bloxline", founder: {"@type": "Person", name: "Tonte Bo Douglas"}}}
  return <>
    <header className="about-hero"><div><span className="eyebrow">About The Bloxline</span><h1>A Roblox business built for the people around the platform.</h1><p>The Bloxline helps Roblox developers and studios build communities around their games while helping brands and businesses communicate Roblox to people beyond the traditional player audience.</p></div></header>
    <article className="about-page agency-about">
      <section className="about-founder-intro">
        <div className="about-portrait"><Image src="/authors/tonte-bo-douglas.jpg" alt="Tonte Bo Douglas, founder of The Bloxline" width={400} height={400} preload/></div>
        <div className="about-copy"><span className="eyebrow">How it started</span><h2>The Adult’s Guide to Roblox revealed a wider opportunity.</h2><p>My name is Tonte Bo Douglas. I started The Bloxline after watching my sons play Roblox and realising how difficult it was for adults to understand the platform clearly.</p><p>The original idea was simple: explain Roblox to parents, teachers, professionals and every adult with a reason to pay attention.</p><p>That publishing work revealed another challenge. Roblox games can reach enormous audiences without necessarily building strong relationships with those players outside the experience.</p><p>Studios are building serious businesses inside Roblox. Brands increasingly want to understand the platform. Parents, investors, educators and business leaders are paying closer attention.</p><p className="about-emphasis">The Bloxline now sits between those worlds.</p></div>
      </section>
      <section className="about-section"><span className="eyebrow">What we do now</span><h2>Community services supported by deep Roblox understanding.</h2><p>We help Roblox developers and studios build communities around their games, beginning with Reddit strategy, setup, content, feedback and ongoing management.</p><p>We also help studios, brands and businesses explain Roblox to adult audiences who may not know the platform deeply but increasingly need to.</p><div className="about-service-links"><Link href="/services/community-building"><strong>Community Building</strong><span>Build stronger relationships with players beyond the game.</span></Link><Link href="/services/adult-audience"><strong>Adult Audience Strategy</strong><span>Explain Roblox clearly to parents, brands, businesses and older audiences.</span></Link></div></section>
      <section className="about-section"><span className="eyebrow">Why publishing continues</span><h2>Our insights make the commercial work stronger.</h2><p>The publication remains live because understanding the Roblox ecosystem improves every community and audience project.</p><p>Covering games, studios, careers, business models, platform changes and adult concerns gives The Bloxline useful context that a general agency would not have.</p><p>Our articles also continue helping adults understand Roblox in clear, straightforward language.</p><Link className="text-link" href="/latest">Explore Bloxline Insights</Link></section>
      <section className="about-founder-card"><Image src="/authors/tonte-bo-douglas.jpg" alt="" width={112} height={112}/><div><h2>Tonte Bo Douglas</h2><p>Founder, The Bloxline</p><a className="linkedin-button" href={founderLinkedIn} target="_blank" rel="noopener noreferrer"><SocialIcon name="LinkedIn"/><span>Follow Tonte on LinkedIn</span></a></div></section>
      <section className="about-contact"><h2>Building something on Roblox?</h2><p>Tell us what you are working on and where community or audience support could help.</p><a className="button" href={email}>Start A Conversation</a></section>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData).replace(/</g, "\\u003c")}}/>
  </>
}
