import type {Metadata} from "next"
import {siteConfig} from "@/lib/site"

export const metadata: Metadata = {
  title: {absolute: "Roblox Community Building | The Bloxline"},
  description: "Build a stronger community around your Roblox game with Reddit strategy, community setup, player engagement, moderation and ongoing management.",
  alternates: {canonical: "/services/community-building"},
  openGraph: {title: "Build A Community Around Your Roblox Game", description: "Reddit community building and ongoing management for Roblox games and studios.", url: "/services/community-building", type: "website"},
}

const launchItems = ["Community strategy session", "Reddit community setup", "Naming and structure", "Branding using supplied assets", "Rules and moderation framework", "Post flairs and categories", "Welcome content", "Initial discussion content", "Recurring community formats", "Player feedback structure", "Launch plan", "Initial content calendar", "First 30 days of launch support"]
const managementItems = ["Regular community posts", "Discussion prompts", "Update threads", "Feedback threads", "Player engagement", "Moderation oversight", "Recurring community formats", "Player feedback collection", "Monthly community observations", "Monthly recommendations"]
const plusItems = ["Everything within Community Management", "Higher content frequency", "Deeper moderation involvement", "Structured monthly reporting", "Community sentiment analysis", "Player insight summaries", "Launch support for new updates", "Community event planning", "Tournament or competition support where appropriate", "Closer coordination with the development team", "Support across multiple games where agreed"]
const formats = [
  ["Update Discussions", "A permanent place for players to react to new features and changes."],
  ["Player Feedback", "Structured discussions where developers can understand what players think."],
  ["Clips And Highlights", "Players share their best moments."],
  ["Suggestions", "Community ideas can be discussed and voted on."],
  ["Rankings And Competitive Discussion", "Useful for games with competitive systems."],
  ["Community Events", "Tournaments, challenges and other recurring activities."],
  ["Developer Q And A", "Give players occasional direct access to the people building the game."],
  ["Beginner Questions", "Allow experienced players to help new players."],
  ["Community Polls", "Simple ways to create participation while collecting useful opinions."],
]
const insights = ["What players love", "What frustrates them", "What they want changed", "What keeps them playing", "What makes them leave", "Which updates create excitement", "What experienced players think new players struggle with", "Which features repeatedly generate discussion"]

export default function CommunityBuildingPage() {
  const talkLink = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Roblox Community Enquiry")}`
  const managementLink = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Community Management Enquiry")}`
  return <>
    <header className="service-page-hero community-hero"><div className="container"><span className="eyebrow">Roblox Community Building</span><h1>Build a community around your Roblox game.</h1><div className="community-hero-copy"><p>Roblox discovery can bring players into your experience.</p><p>The harder challenge is building relationships with those players once they leave the game.</p><p>The Bloxline helps Roblox studios create and grow communities where players can talk, share feedback, discuss updates, create content and stay connected to the game.</p><p>We currently specialise in Reddit community building, particularly for Roblox games that already use Discord but have little or no persistent Reddit presence.</p></div><a className="button" href={talkLink}>Talk About Your Game</a></div></header>

    <section className="platform-section container"><div className="agency-section-head"><span className="eyebrow">A connected community</span><h2>Reddit does not replace Discord.</h2><p>Discord and Reddit solve different problems. For many Roblox games, the strongest setup is not Reddit or Discord. It is Roblox, Discord and Reddit working together.</p></div><div className="platform-grid"><article><h3>Roblox</h3><p>Where the game happens.</p></article><article><h3>Discord</h3><p>Where the most engaged players talk in real time.</p></article><article><h3>Reddit</h3><p>Where the wider community creates persistent discussion, feedback and discovery.</p></article></div><div className="platform-explainer"><p>Discord is excellent for immediate communication, live chat, announcements and highly engaged existing players.</p><p>Reddit creates persistent conversations that remain discoverable, searchable and useful long after they are posted. A player can find a Reddit discussion through Google. A new player can discover advice written months earlier. Developers can collect structured feedback, while players can create discussions that exist independently of real time chat.</p></div></section>

    <section className="pricing-section" id="pricing"><div className="container"><div className="agency-section-head"><span className="eyebrow">Straightforward options</span><h2>Community Building Pricing</h2></div><div className="pricing-grid">
      <article className="pricing-card"><span className="eyebrow">Community Launch</span><h3>£495 <small>one time</small></h3><p>Designed for games and studios with no established Reddit community or a subreddit that needs rebuilding.</p><ul>{launchItems.map((item) => <li key={item}>{item}</li>)}</ul><a className="button" href={talkLink}>Start A Community</a></article>
      <article className="pricing-card"><span className="eyebrow">Community Management</span><h3>From £395 <small>per month</small></h3><p>For studios that want The Bloxline to stay involved after launch.</p><ul>{managementItems.map((item) => <li key={item}>{item}</li>)}</ul><a className="button" href={managementLink}>Discuss Ongoing Management</a></article>
      <article className="pricing-card"><span className="eyebrow">Community Management Plus</span><h3>From £695 <small>per month</small></h3><p>For larger games, more active communities or teams launching multiple Roblox experiences.</p><ul>{plusItems.map((item) => <li key={item}>{item}</li>)}</ul><a className="button" href={managementLink}>Discuss Management Plus</a></article>
    </div><p className="pricing-note">Every Roblox community is different. We will recommend the level of support that makes sense for your game rather than pushing you into a larger package unnecessarily.</p></div></section>

    <section className="studio-structure container"><div><span className="eyebrow">Community structure</span><h2>Building for one game or the whole studio</h2><p>For developers planning multiple Roblox experiences, creating separate communities for every title may not always be the best long term approach.</p><p>This is particularly valuable for Roblox studios that want to carry an audience from one release into the next.</p></div><div><p>The Bloxline can help decide whether the strongest structure is:</p><ul><li>One community dedicated to a flagship game</li><li>A studio level community covering multiple games</li><li>Individual game communities connected to a wider studio presence</li></ul><p>The right structure depends on the existing audience, future release plans and how closely the games are connected.</p></div></section>

    <section className="formats-section"><div className="container"><div className="agency-section-head"><span className="eyebrow">Recurring community formats</span><h2>Give players reasons to return.</h2></div><div className="formats-grid">{formats.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="community-insight container"><div><span className="eyebrow">Why this matters</span><h2>Players are more valuable when you understand them.</h2><p>Roblox analytics can show developers what players do. Community conversations can help explain why they do it.</p></div><div><p>A healthy community can reveal:</p><ul>{insights.map((item) => <li key={item}>{item}</li>)}</ul></div></section>

    <section className="agency-final"><div className="container"><h2>Ready to build around your players?</h2><p>Tell us about your game, the community you already have and what you want players to be able to do beyond the experience.</p><a className="button" href={talkLink}>Talk About Your Game</a></div></section>
  </>
}
