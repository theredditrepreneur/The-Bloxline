import type {Metadata} from "next"
import Link from "next/link"
import {siteConfig} from "@/lib/site"

const title = "Roblox Community Building for Studios | The Bloxline"
const description = "Bloxline helps Roblox developers and studios build communities around their games, starting with Reddit strategy, setup, content and player engagement."
const enquiryLink = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Community Building Enquiry")}`

export const metadata: Metadata = {
  title: {absolute: title},
  description,
  alternates: {canonical: "/for-studios/community-building"},
  openGraph: {
    title: "Build a Community Around Your Roblox Game",
    description: "Community building for Roblox developers and studios from The Bloxline.",
    url: "/for-studios/community-building",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Build a Community Around Your Roblox Game",
    description: "Community building for Roblox developers and studios from The Bloxline.",
  },
}

const services = [
  ["Community setup", "Creation and configuration of the Reddit community, including structure, naming, branding and essential settings."],
  ["Rules and moderation", "Clear community rules, moderation structure and guidance designed to keep discussions useful and welcoming."],
  ["Launch content", "A foundation of posts that gives the subreddit something useful to discover from day one."],
  ["Recurring formats", "Ideas for regular discussions such as player feedback, update threads, clips, rankings, tournaments, suggestions, polls and developer questions and answers."],
  ["Player feedback", "Create ways for developers to hear directly from the people playing their games."],
  ["Community growth strategy", "A practical plan for introducing the community to existing players and growing participation organically."],
]

const communityUses = ["Gameplay clips", "Suggestions and feedback", "Update discussions", "Competitive rankings", "Community events", "Questions and support", "Player created content", "Developer communication"]

const audiences = [
  "Your experience already has players but no dedicated Reddit community",
  "You are preparing to launch a new Roblox experience",
  "You want better feedback from your existing players",
  "You want somewhere to communicate updates outside Roblox",
  "You are building multiple games and want stronger relationships with your audience",
  "You want to create a community asset that can grow alongside your studio",
]

const steps = [
  ["Tell us about your game", "We start with a short conversation about your experience, your existing audience and what you want the community to achieve."],
  ["Community strategy", "We decide how the community should be structured, what players should use it for and what content will encourage participation."],
  ["Build and launch", "We create the initial community structure, rules, content and recurring formats needed for launch."],
  ["Grow and learn", "We monitor what players respond to and use those insights to improve the community over time."],
]

export default function CommunityBuildingPage() {
  return <>
    <header className="service-hero">
      <div className="container service-hero-inner">
        <div>
          <span className="eyebrow">Bloxline Community Building</span>
          <h1>Build a community around your Roblox game.</h1>
        </div>
        <div className="service-hero-copy">
          <p>Roblox discovery can bring players into your experience.</p>
          <p>The harder challenge is giving those players somewhere to stay connected, share feedback, talk about updates and become part of something bigger than the game itself.</p>
          <p>Bloxline Community Building helps Roblox developers and studios create and establish communities beyond the experience, starting with Reddit.</p>
          <a className="button" href={enquiryLink}>Talk to us about your game</a>
          <small>For independent developers, growing studios and established Roblox experiences.</small>
        </div>
      </div>
    </header>

    <div className="service-page">
      <section className="service-section container">
        <div className="service-intro"><span className="eyebrow">What we help with</span><h2>From players to community</h2><p>A subreddit should be more than somewhere to post update announcements.</p><p>We help create a structure that gives players reasons to participate, return and contribute.</p></div>
        <div className="service-card-grid">{services.map(([heading, copy]) => <article className="service-card" key={heading}><h3>{heading}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="service-section service-reddit">
        <div className="container service-split">
          <div><span className="eyebrow">Why Reddit?</span><h2>Roblox is where the game happens. Reddit can be where the community talks about it.</h2></div>
          <div><p>Roblox experiences can reach huge audiences, but those audiences often disappear as soon as players leave the game.</p><p>An independent community gives your most engaged players somewhere to continue the conversation.</p><p>It can become a place for:</p><ul>{communityUses.map((item) => <li key={item}>{item}</li>)}</ul><p>The goal is not simply to collect subreddit members.</p><p><strong>The goal is to build a place players actually want to return to.</strong></p></div>
        </div>
      </section>

      <section className="service-section container service-split">
        <div><span className="eyebrow">Who this is for</span><h2>Built for Roblox developers and studios</h2></div>
        <div><p>This service may be useful if:</p><ul className="service-check-list">{audiences.map((item) => <li key={item}>{item}</li>)}</ul><p className="service-note">We will always start by understanding your game and whether Reddit is actually the right community platform for it.</p></div>
      </section>

      <section className="service-section container">
        <div className="service-intro"><span className="eyebrow">The process</span><h2>How it works</h2></div>
        <ol className="service-steps">{steps.map(([heading, copy], index) => <li key={heading}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{heading}</h3><p>{copy}</p></div></li>)}</ol>
      </section>

      <section className="service-section container">
        <div className="service-pricing"><div><span className="eyebrow">For studios</span><h2>Pricing</h2><p>Every Roblox experience is different, so community projects are scoped around the game, audience and level of support required.</p><p className="service-price"><strong>Community launch projects start from £495.</strong></p></div><a className="button" href={enquiryLink}>Talk to us about your game</a></div>
      </section>

      <section className="service-final">
        <div className="container"><h2>Your players already have something in common.</h2><p>They play your game.</p><p>We can help you give them somewhere to build a community around it.</p><a className="button" href={enquiryLink}>Start a conversation</a></div>
      </section>

      <nav className="service-back container" aria-label="Related Bloxline sections"><Link className="text-link" href="/studios">Read about Roblox studios</Link><Link className="text-link" href="/jobs">Explore Roblox jobs</Link></nav>
    </div>
  </>
}
