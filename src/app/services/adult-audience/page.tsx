import type {Metadata} from "next"
import {siteConfig} from "@/lib/site"

export const metadata: Metadata = {
  title: {absolute: "Roblox Audience Strategy | The Bloxline"},
  description: "The Bloxline helps Roblox studios and brands explain Roblox, reach adult audiences and communicate with parents, businesses, investors and older players.",
  alternates: {canonical: "/services/adult-audience"},
  openGraph: {title: "Reach The Adults Around Roblox", description: "Roblox audience strategy for studios, developers and brands from The Bloxline.", url: "/services/adult-audience", type: "website"},
}

const audiences = ["Parents", "Teachers", "Agencies", "Investors", "Brands", "Business leaders", "Journalists", "Older players"]
const support = ["Messaging reviews", "Adult audience positioning", "Content strategy", "Explaining Roblox products in plain English", "Brand communication", "Industry context", "Editorial consulting", "Audience research", "Campaign concepts"]

export default function AdultAudiencePage() {
  const email = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Adult Audience Strategy Enquiry")}`
  return <>
    <header className="service-page-hero"><div className="container"><span className="eyebrow">Adult Audience Strategy</span><h1>Roblox is growing up. The audience around it is getting broader too.</h1><p>The Bloxline helps Roblox studios, developers and brands communicate with people who may not understand Roblox deeply but increasingly need to.</p><a className="button" href={email}>Discuss Your Audience</a></div></header>
    <section className="adult-origin container"><div><span className="eyebrow">Why this is different</span><h2>The Bloxline began by explaining Roblox to adults.</h2></div><div><p>That remains an important part of what makes the business different.</p><p>We understand the questions adults ask, the language that confuses people outside Roblox and the context businesses need before they can make good decisions.</p><p>That knowledge helps studios and brands explain their work clearly without speaking down to the audience.</p></div></section>
    <section className="adult-audiences"><div className="container"><div className="agency-section-head"><span className="eyebrow">Who you may need to reach</span><h2>People around Roblox, not only players inside it.</h2></div><div className="audience-chip-grid">{audiences.map((audience) => <div key={audience}>{audience}</div>)}</div></div></section>
    <section className="adult-support container"><div><span className="eyebrow">What we can help with</span><h2>Clear communication grounded in Roblox.</h2><p>Each project is shaped around the audience, product and decision you need to support.</p></div><ul>{support.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section className="service-price-callout container"><div><span className="eyebrow">Pricing</span><h2>Projects from £495</h2><p>Larger strategy projects can be quoted individually after a short conversation.</p></div><a className="button" href={email}>Discuss Your Audience</a></section>
  </>
}
