import type {Metadata} from "next"
import {geeiqReferralUrl} from "@/components/GeeiqReferral"

export const metadata: Metadata = {
  title: {absolute: "GEEIQ Integration Network for Roblox Developers | The Bloxline"},
  description: "Learn how Roblox and Fortnite developers can apply to the free GEEIQ Integration Network for audience insights, brand visibility, direct enquiries and Network Rewards.",
  alternates: {canonical: "/developer-network"},
  openGraph: {title: "GEEIQ Integration Network for Roblox Developers", description: "Audience insights, brand visibility and direct partnership opportunities for accepted Roblox and Fortnite developers.", url: "/developer-network", type: "website"},
}

const benefits = [
  {title: "Understand where your audience stands out", copy: "Compare audience information such as age, gender and geography with other experiences in the network. This can help a studio explain what makes its audience distinctive."},
  {title: "Become more visible to brands", copy: "Accepted developers can appear within GEEIQ for brand clients looking for suitable games and studios for integrations."},
  {title: "Receive direct brand interest", copy: "Brands can contact developers directly. GEEIQ says it does not take commission or a cut from deals arranged through the network."},
  {title: "Access Network Rewards", copy: "Members can access a growing collection of credits, discounts and partner offers from tools and products used across user generated gaming."},
]

export default function DeveloperNetworkPage() {
  return <>
    <header className="service-page-hero developer-network-hero"><div className="container"><span className="eyebrow">Developer Opportunity</span><h1>Make your Roblox audience easier for brands to understand.</h1><p>The GEEIQ Integration Network helps accepted Roblox and Fortnite developers understand their audiences, show where those audiences stand out and become visible to brands looking for games to work with.</p><a className="button" href={geeiqReferralUrl} target="_blank" rel="sponsored nofollow noopener noreferrer">Apply To The Network</a><p className="affiliate-note"><strong>Affiliate disclosure:</strong> The Bloxline may receive a referral payment if an accepted developer joins through this link.</p></div></header>

    <section className="developer-network-benefits container"><div className="agency-section-head"><span className="eyebrow">What accepted developers receive</span><h2>Audience insight and a clearer route to brand opportunities.</h2></div><div className="developer-benefit-grid">{benefits.map((benefit) => <article key={benefit.title}><h3>{benefit.title}</h3><p>{benefit.copy}</p></article>)}</div></section>

    <section className="developer-network-details"><div className="container agency-proof-grid"><div><span className="eyebrow">Before you apply</span><h2>Free to join and subject to approval.</h2></div><div><p>GEEIQ currently supports Roblox and Fortnite Creative experiences. Applications are reviewed by GEEIQ, and its official page says applicants should normally hear back within 10 working days.</p><p>Developers provide private experience data for analysis. GEEIQ says this data is available to its internal team and subscribed brand clients under confidentiality controls, rather than being shared publicly or with competitors.</p><p>Read the programme information and terms carefully before sharing data or accepting an agreement.</p></div></div></section>

    <section className="developer-network-cta container"><h2>Ready to see where your audience stands out?</h2><p>Use The Bloxline referral link to apply directly through GEEIQ.</p><a className="button" href={geeiqReferralUrl} target="_blank" rel="sponsored nofollow noopener noreferrer">Apply Through The Bloxline</a><p className="affiliate-note">This is an affiliate link. The Bloxline may receive a payment if your application is accepted and you join. Joining the network is currently free for developers, according to GEEIQ.</p></section>

    <section className="affiliate-disclosure container" id="affiliate-disclosure"><h2>Affiliate disclosure</h2><p>The Bloxline participates in the GEEIQ affiliate programme. If you follow a marked referral link, apply and are accepted into the Integration Network, The Bloxline may receive a referral payment from GEEIQ.</p><p>The referral relationship does not increase the price you pay. The Bloxline does not decide whether an application is accepted and cannot guarantee acceptance, brand enquiries, partnerships or commercial results.</p></section>
  </>
}
