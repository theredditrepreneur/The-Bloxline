import type {Metadata} from "next"
import Link from "next/link"
import {siteConfig} from "@/lib/site"

export const metadata: Metadata = {
  title: {absolute: "Roblox Game Playtesting for Developers | Bloxline Playtest"},
  description: "Independent Roblox game playtesting with recorded gameplay and structured player feedback on onboarding, progression, friction and the overall experience.",
  alternates: {canonical: "/services/playtest"},
  openGraph: {title: "See Your Roblox Game Through A Player's Eyes", description: "Independent recorded Roblox playtesting and structured player feedback from The Bloxline.", url: "/services/playtest", type: "website"},
}

const focusAreas = [
  ["First impression", "Can we quickly understand what the experience is and what we are supposed to do?"],
  ["Onboarding", "Does the game teach the player what they need to know without overwhelming them?"],
  ["Core gameplay", "Is the main activity enjoyable and easy to understand?"],
  ["Progression", "Can we understand what we are working towards and why we should keep going?"],
  ["Controls", "Does moving, interacting, fighting, building or completing actions feel intuitive?"],
  ["Interface", "Is important information easy to find and understand?"],
  ["Rewards", "Do upgrades, currency, unlocks and achievements feel meaningful?"],
  ["Friction", "Where do we become confused, frustrated, lost or disengaged?"],
  ["Retention", "What gives us a reason to play for another five minutes, another session or another day?"],
  ["Standout moments", "What parts of the experience are memorable enough that we would mention them afterwards?"],
]

const quickItems = ["Around 30 minutes of gameplay", "Recorded playtest session", "Think aloud commentary where appropriate", "Concise feedback report", "Key strengths", "Key friction points", "Bloxline Top 5 improvement priorities"]
const fullItems = ["Around 60 minutes of gameplay", "Full recorded playtest session", "Think aloud commentary where appropriate", "Detailed Bloxline Playtest Report", "First impression analysis", "Onboarding feedback", "Gameplay loop observations", "Progression feedback", "Interface and clarity observations", "Retention and friction observations", "Standout strengths", "5 things we would keep", "5 things we would look at next", "One round of follow up questions from the studio"]
const stages = [
  ["Before launch", "Find areas of confusion before a wider audience encounters them."],
  ["During beta", "Get an independent perspective alongside feedback from your existing testing community."],
  ["Before a major update", "Test new mechanics, progression or features before promoting them heavily."],
  ["After launch", "Understand how the experience feels to somebody who has not followed its development."],
  ["When retention is a concern", "Use qualitative player observations alongside your existing analytics to investigate where friction might exist."],
]
const steps = [
  ["Tell us about your game", "Send us your Roblox experience and tell us what stage of development it is currently in."],
  ["We play", "We approach the game as naturally as possible and record the experience."],
  ["We analyse", "We review the session and organise the most useful observations into your Playtest Report."],
  ["You receive the findings", "You receive the gameplay recording and report, including the areas we believe are most worth looking at next."],
]

export default function PlaytestPage() {
  const submitLink = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Bloxline Playtest Submission")}&body=${encodeURIComponent("Name:\nEmail:\nStudio or developer name:\nRoblox game name:\nRoblox game URL:\nWebsite (optional):\nDiscord (optional):\nCurrent development stage:\n\nWhat would you particularly like us to pay attention to?\n\nWho is the game primarily designed for?\n\nSimilar games or experiences to understand for context (optional):\n\nWhich Playtest would you like? Quick Playtest £79, Full Playtest £149, or Not sure yet")}`
  const talkLink = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Bloxline Playtest Enquiry")}`

  return <>
    <header className="service-hero playtest-hero"><div className="container service-hero-inner"><div><span className="eyebrow">Bloxline Playtest</span><h1>See your Roblox game through a player&apos;s eyes.</h1></div><div className="service-hero-copy"><p>You know your game inside out.</p><p>A new player does not.</p><p>Bloxline Playtest gives Roblox developers and studios an independent look at what their experience actually feels like to someone encountering it naturally for the first time.</p><p>We play your game, record the experience and provide practical feedback on what works, what causes confusion and what we believe deserves attention.</p><div className="playtest-actions"><a className="button" href={submitLink}>Submit Your Game</a><a className="text-link" href="#report">See What You Receive</a></div><small>For Roblox developers, independent creators and studios at any stage of development.</small></div></div></header>

    <section className="service-section container"><div className="service-intro"><span className="eyebrow">A fresh perspective</span><h2>You built the game. We experience it as a player.</h2><p>When you have spent weeks, months or years building a Roblox experience, it becomes difficult to see it in the same way as somebody opening it for the first time.</p><p>Things that feel obvious to the development team may not be obvious to a player. Instructions may be overlooked. Progression may take longer to understand than expected. A mechanic the team barely thinks about may turn out to be one of the most enjoyable parts of the game.</p><p>Bloxline Playtest is designed to uncover those moments. We approach the game without developer knowledge, play naturally and document what we experience along the way.</p></div></section>

    <section className="playtest-qa"><div className="container"><div className="service-intro"><span className="eyebrow">A player experience service</span><h2>This isn&apos;t technical QA.</h2><p>Bloxline Playtest focuses on the player experience, not the code behind it. We are not reviewing your scripts, checking every device configuration or attempting to identify every technical bug.</p><p>We are asking a different question: what does this game actually feel like to play?</p></div><div className="playtest-compare"><article><h3>We focus on</h3><ul>{["First impressions", "Onboarding", "Gameplay clarity", "Core gameplay loop", "Controls from a player&apos;s perspective", "Progression", "Rewards", "Interface clarity", "Friction", "Enjoyment", "Retention signals", "Standout moments"].map((item) => <li key={item}>{item}</li>)}</ul></article><article><h3>We are not</h3><ul>{["Code auditors", "Automated QA", "Performance engineers", "Security testers", "Comprehensive bug testers"].map((item) => <li key={item}>{item}</li>)}</ul></article></div></div></section>

    <section className="service-section container"><div className="agency-section-head"><span className="eyebrow">During every session</span><h2>What we look at while playing</h2></div><div className="service-card-grid">{focusAreas.map(([title, copy]) => <article className="service-card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="playtest-recording"><div className="container playtest-recording-grid"><div><span className="eyebrow">Recorded gameplay</span><h2>Watch someone experience your game naturally.</h2></div><div><p>Every Bloxline Playtest includes recorded gameplay. Where appropriate, the tester will think aloud while playing, explaining what they notice, what they understand, what they expect to happen and where they become confused.</p><p>For a developer, seeing someone hesitate at a button, misunderstand an instruction or become unexpectedly excited about a mechanic can sometimes communicate more than a written report ever could.</p><blockquote>“We thought that was obvious.”</blockquote><strong>Those are often the most useful moments in a playtest.</strong></div></div></section>

    <section className="service-section container" id="report"><div className="service-intro"><span className="eyebrow">The Bloxline Playtest Report</span><h2>You won&apos;t just receive a gameplay video.</h2><p>After playing the experience, we turn our observations into a clear Playtest Report that your team can actually use.</p></div><div className="playtest-report-grid"><ul>{["Overall player experience", "First impression", "Onboarding observations", "Core gameplay feedback", "Progression observations", "Interface and clarity", "Friction points", "Retention observations", "Strongest elements", "Areas needing attention", "Screenshots and examples where useful", "Recommended priorities"].map((item) => <li key={item}>{item}</li>)}</ul><aside><span className="eyebrow">The Bloxline Top 5</span><h3>5 things we&apos;d keep</h3><p>The parts of the experience that worked particularly well.</p><h3>5 things we&apos;d look at next</h3><p>The changes or questions we believe deserve the studio&apos;s attention first.</p><p className="playtest-note">These are independent player observations designed to help the development team make its own decisions.</p></aside></div></section>

    <section className="service-section playtest-pricing" id="pricing"><div className="container"><div className="agency-section-head"><span className="eyebrow">Straightforward pricing</span><h2>Choose the level of feedback you need.</h2></div><div className="playtest-pricing-grid"><article className="pricing-card"><span className="eyebrow">Quick Playtest</span><h3>£79</h3><p>For developers who want a fast independent look at their game.</p><ul>{quickItems.map((item) => <li key={item}>{item}</li>)}</ul><a className="button" href={submitLink}>Submit Your Game</a></article><article className="pricing-card pricing-card-featured"><span className="badge">Recommended</span><span className="eyebrow">Full Playtest</span><h3>£149</h3><p>A deeper review for games preparing for launch, major updates or further development.</p><ul>{fullItems.map((item) => <li key={item}>{item}</li>)}</ul><a className="button" href={submitLink}>Book A Full Playtest</a></article></div><div className="playtest-panel"><div><h3>Need several players to test your game?</h3><p>We are developing a multi player testing option for studios that want feedback from several independent perspectives.</p></div><a className="text-link" href={talkLink}>Talk To The Bloxline</a></div></div></section>

    <section className="service-section container"><div className="agency-section-head"><span className="eyebrow">When to use it</span><h2>Useful throughout development</h2></div><div className="playtest-stage-grid">{stages.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div><p className="playtest-note">A single playtest cannot diagnose retention problems. It provides an additional source of qualitative information alongside your own analytics and testing.</p></section>

    <section className="agency-proof"><div className="container agency-proof-grid"><div><span className="eyebrow">Why The Bloxline</span><h2>We spend our time inside Roblox games.</h2></div><div><p>The Bloxline is focused specifically on Roblox. We discover new games, play them, record gameplay, speak with developers and studios, follow the wider industry and publish coverage explaining Roblox to adults, businesses and people outside the traditional player audience.</p><p>That means Playtest is not an unrelated service added to a general marketing agency. Playing and understanding Roblox games is already part of what we do.</p><Link className="text-link" href="/games">Games We&apos;ve Played</Link><br/><Link className="text-link" href="/latest">Explore The Bloxline</Link></div></div></section>

    <section className="service-section container"><div className="agency-section-head"><span className="eyebrow">Simple process</span><h2>How Bloxline Playtest works</h2></div><ol className="service-steps">{steps.map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>

    <section className="playtest-submit"><div className="container"><div><span className="eyebrow">Start here</span><h2>Submit your game for a Playtest</h2><p>Send us the essentials by email and tell us what you would particularly like us to pay attention to. We will reply to discuss your game and the most suitable Playtest option.</p><p className="playtest-submit-note">Please include your name, email, studio or developer name, game name and Roblox game link. You can also include your development stage, target audience and any useful context.</p></div><a className="button" href={submitLink}>Submit My Game</a></div></section>

    <section className="service-final"><div className="container"><h2>You&apos;ve played your game hundreds of times.<br/>Let us play it for the first time.</h2><p>Get an independent player&apos;s perspective before your next launch, update or development decision.</p><div className="playtest-actions"><a className="button" href={submitLink}>Submit Your Game</a><a className="button button-secondary" href={talkLink}>Talk To The Bloxline</a></div></div></section>
  </>
}
