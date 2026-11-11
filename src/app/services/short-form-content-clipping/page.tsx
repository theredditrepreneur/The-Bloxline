import type {Metadata} from "next"
import Link from "next/link"
import TikTokGallery, {type TikTokGalleryVideo} from "@/components/TikTokGallery"
import {siteConfig} from "@/lib/site"

export const metadata: Metadata = {
  title: {absolute: "Roblox Short Form Content Editing | The Bloxline"},
  description: "Professional short form content editing for Roblox games and studios. Turn gameplay and updates into TikToks, Instagram Reels and YouTube Shorts.",
  alternates: {canonical: "/services/short-form-content-clipping"},
  openGraph: {title: "Roblox Short Form Content Editing | The Bloxline", description: "Turn Roblox gameplay, updates and trailers into short form video for TikTok, Instagram Reels and YouTube Shorts.", url: "/services/short-form-content-clipping", type: "website"},
}

const benefits = [
  ["🎮", "More Visibility", "Keep your game in front of players every week with consistent short form content."],
  ["🚀", "Faster Growth", "Short form video is one of the best ways to introduce new players to your game."],
  ["⏱", "Save Time", "Your team builds the game. We handle the editing."],
]

const sourceFormats = ["Gameplay Sessions", "Developer Updates", "Livestreams", "Patch Notes", "Community Events", "Trailers", "Discord Highlights", "Creator Footage"]
const deliverables = ["30 to 60 second vertical videos", "Optimised for TikTok", "Instagram Reels", "YouTube Shorts", "Captions included", "Fast turnaround", "Optional thumbnails"]
const packages = [
  {name: "Starter", price: "£249", detail: "per month", items: ["12 clips", "1 revision", "5 to 7 day turnaround"]},
  {name: "Growth", price: "£499", detail: "per month", items: ["30 clips", "Priority turnaround", "Captions", "Hook optimisation", "Trend research"], featured: true},
  {name: "Studio", price: "£899", detail: "per month", items: ["60 clips", "Multiple games", "Priority support", "Performance report", "Monthly strategy"]},
]
const recentClips: TikTokGalleryVideo[] = [
  {id: "gameplay-moment", videoUrl: "", title: "Gameplay moment", creator: "Add your TikTok link"},
  {id: "update-highlight", videoUrl: "", title: "Update highlight", creator: "Add your TikTok link"},
  {id: "community-clip", videoUrl: "", title: "Community clip", creator: "Add your TikTok link"},
]
const faqs = [
  ["What footage do I need to provide?", "Gameplay recordings, trailers, update footage, livestream recordings, creator clips or any other material you have permission to use. We can help you decide what is most useful."],
  ["Can you record gameplay?", "Yes. Tell us about your game and the type of content you need, and we can discuss gameplay recording as part of the work."],
  ["Do you post the videos?", "We prepare the edited videos for your team to post. Posting support can also be discussed if you need a broader social content arrangement."],
  ["Can I request revisions?", "Yes. Each package includes revisions, with the exact allowance shown in the package details."],
  ["How long does editing take?", "Turnaround depends on the package and the footage supplied. Starter work is usually delivered within 5 to 7 days, while Growth and Studio receive priority turnaround."],
]

export default function ShortFormContentClippingPage() {
  const discoveryLink = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Short Form Content Discovery Call")}`
  const quoteLink = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Short Form Content Quote Request")}`

  return <>
    <header className="service-hero clipping-hero"><div className="container clipping-hero-inner"><div><span className="eyebrow">Bloxline Content</span><h1>Short Form Content Clipping</h1><p>Turn your gameplay, updates, trailers and developer footage into TikToks, Reels and YouTube Shorts that help your Roblox game reach more players.</p><div className="clipping-actions"><a className="button" href={discoveryLink}>Book a Discovery Call</a><a className="button button-secondary" href="#examples">View Examples</a></div></div><div className="clipping-hero-visual" aria-hidden="true"><span>Gameplay</span><span>Clips</span><span>Players</span></div></div></header>

    <section className="service-section container"><div className="agency-section-head"><span className="eyebrow">Why short form</span><h2>Make every useful moment work harder.</h2></div><div className="clipping-benefit-grid">{benefits.map(([icon, title, copy]) => <article key={title}><span className="clipping-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="clipping-sources"><div className="container"><div className="agency-section-head"><span className="eyebrow">Source material</span><h2>What we turn into clips</h2><p>There is often more content inside a game update, recording or community moment than a studio has time to edit.</p></div><div className="clipping-source-grid">{sourceFormats.map((format) => <article key={format}><span>Clip source</span><h3>{format}</h3></article>)}</div></div></section>

    <section className="service-section container"><div className="clipping-deliverables"><div><span className="eyebrow">What you receive</span><h2>Vertical video, ready for the places players are already watching.</h2><p>Every clip is edited for fast, clear viewing on mobile while staying true to the game and its audience.</p></div><ul>{deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div></section>

    <section className="clipping-pricing"><div className="container"><div className="agency-section-head"><span className="eyebrow">Simple monthly support</span><h2>Choose the volume that fits your game.</h2></div><div className="clipping-pricing-grid">{packages.map((tier) => <article className={`pricing-card ${tier.featured ? "clipping-pricing-featured" : ""}`} key={tier.name}>{tier.featured && <span className="badge">Recommended</span>}<span className="eyebrow">{tier.name}</span><h3>{tier.price} <small>{tier.detail}</small></h3><ul>{tier.items.map((item) => <li key={item}>{item}</li>)}</ul><a className="button" href={discoveryLink}>Book a Discovery Call</a></article>)}</div></div></section>

    <section className="clipping-examples" id="examples"><div className="container"><div className="agency-section-head"><span className="eyebrow">Portfolio</span><h2>Recent Clips</h2><p>Examples will appear here as TikTok videos are published. The gallery is ready for responsive official TikTok embeds.</p></div><TikTokGallery videos={recentClips} /></div></section>

    <section className="service-section container"><div className="clipping-faq"><div><span className="eyebrow">Questions</span><h2>Frequently asked questions</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

    <section className="service-final clipping-final"><div className="container"><h2>Ready to create more content without creating more work?</h2><div className="clipping-actions"><a className="button" href={discoveryLink}>Book a Discovery Call</a><a className="button button-secondary" href={quoteLink}>Request a Quote</a></div><Link className="text-link" href="/services">Explore all Bloxline services</Link></div></section>
  </>
}
