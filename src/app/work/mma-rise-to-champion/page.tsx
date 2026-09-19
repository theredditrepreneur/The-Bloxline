import type {Metadata} from "next"
import Image from "next/image"
import {BrowserFrame} from "@/components/BrowserFrame"

export const metadata: Metadata = {
  title: {absolute: "MMA Rise To Champion Reddit Community Work | The Bloxline"},
  description: "How The Bloxline is building and managing the Reddit community for Roblox fighting game MMA Rise To Champion through beta launch and beyond.",
  alternates: {canonical: "/work/mma-rise-to-champion"},
  openGraph: {
    title: "MMA Rise To Champion Reddit Community Work | The Bloxline",
    description: "How The Bloxline is building and managing the Reddit community for Roblox fighting game MMA Rise To Champion through beta launch and beyond.",
    url: "/work/mma-rise-to-champion",
    type: "article",
    images: [{url: "/work/mma-rise-to-champion/subreddit-launch.png", width: 1464, height: 1008, alt: "MMA Rise To Champion subreddit beta launch page"}],
  },
}

const deliverables = [
  "Subreddit strategy and architecture",
  "Branding and setup",
  "Rules, post flairs and user roles",
  "Beta launch planning",
  "Seeded gameplay and discussion content",
  "Player feedback systems",
  "Developer participation",
  "Discord integration",
  "TikTok content management",
  "YouTube Shorts management",
  "Moderation",
  "Ongoing growth strategy",
]

export default function MmaRiseToChampionWorkPage() {
  return <>
    <header className="work-hero">
      <div className="container work-hero-inner">
        <Image className="work-client-logo" src="/clients/mma-rise-to-champion-logo.png" alt="MMA Rise To Champion" width={1254} height={1254} priority/>
        <span className="eyebrow">Client Work</span>
        <h1>Building the Reddit Community for MMA Rise To Champion</h1>
        <p>The Bloxline is working with The Champs Avenue to build and manage the Reddit community around MMA Rise To Champion, while also managing TikTok and YouTube Shorts as the game moves through beta.</p>
        <div className="work-meta" aria-label="Services provided"><span>Community Launch</span><span>Reddit Strategy</span><span>Social Content Management</span></div>
        <div className="work-actions"><a className="button" href="https://www.roblox.com/games/125782775498304/MMA-RISE-TO-CHAMPION" target="_blank" rel="noopener noreferrer">Play the beta on Roblox <span aria-hidden>→</span></a><a className="text-link" href="https://www.reddit.com/r/MMARiseToChampion/" target="_blank" rel="noopener noreferrer">Visit r/MMARiseToChampion</a></div>
      </div>
    </header>

    <div className="container work-hero-visual"><BrowserFrame src="/work/mma-rise-to-champion/subreddit-launch.png" alt="The MMA Rise To Champion subreddit showing its branded launch page, beta discussion megathread and community description" priority/></div>

    <section className="work-results"><div className="container"><div className="work-section-head"><span className="eyebrow">Early community response</span><h2>19.4k subreddit views before the full game launch.</h2><p>About 20 days into the project, Reddit community insights reported 19.4k views, an average of 4.8k weekly visitors, 39 published posts and 107 comments.</p></div><div className="work-results-grid"><div><strong>19.4k</strong><span>Subreddit views</span></div><div><strong>4.8k</strong><span>Average weekly visitors</span></div><div><strong>39</strong><span>Published posts</span></div><div><strong>107</strong><span>Published comments</span></div></div><p className="work-results-note">Figures are from Reddit community insights, recorded in the project&apos;s first 20 days while MMA Rise To Champion is in beta.</p></div></section>

    <section className="work-story container"><div><span className="eyebrow">The approach</span><h2>Building the community before the players arrive</h2></div><div className="work-prose"><p>MMA Rise To Champion entered beta with an existing Discord community but without a dedicated home on Reddit. The Bloxline&apos;s role is to build that presence from the ground up, creating the structure, content and ongoing community strategy needed to give players somewhere to discover the game, discuss their experiences and communicate with the development team.</p><p>Rather than waiting for a community to appear organically after launch, the subreddit was established ahead of the beta with its foundational content, moderation structure and player discussion formats already in place.</p></div></section>

    <section className="work-deliverables"><div className="container"><div className="work-section-head"><span className="eyebrow">The work</span><h2>Community infrastructure built for launch and beyond.</h2></div><ul>{deliverables.map((item, index) => <li key={item}><span aria-hidden>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul></div></section>

    <section className="work-conversation container"><div className="work-conversation-copy"><span className="eyebrow">Content and participation</span><h2>Turning gameplay into conversation</h2><p>The community strategy goes beyond announcements. Gameplay content is being used to introduce individual parts of MMA Rise To Champion&apos;s combat system and create natural reasons for players to discuss what they&apos;re learning, what they&apos;re enjoying and what they want to see developed next.</p><p>The Bloxline also manages the project&apos;s <a href="https://www.tiktok.com/@risetochampionmma" target="_blank" rel="noopener noreferrer">TikTok</a> and <a href="https://www.youtube.com/@mmarisetochampion" target="_blank" rel="noopener noreferrer">YouTube Shorts</a>, extending that conversation to short form video audiences.</p></div><BrowserFrame src="/work/mma-rise-to-champion/gameplay-conversation.png" alt="A gameplay discussion post in the MMA Rise To Champion subreddit showing fighting mechanics and community infrastructure"/></section>

    <section className="work-continues"><div className="container"><span className="eyebrow">Active engagement</span><h2>The work continues</h2><p>MMA Rise To Champion is currently in beta, which means this isn&apos;t a finished case study with a retrospective set of results. The Bloxline will continue working alongside the game&apos;s launch, using player behaviour and community response across Reddit, TikTok and YouTube Shorts to shape the community as the audience develops.</p><div className="work-social-links"><a href="https://www.roblox.com/games/125782775498304/MMA-RISE-TO-CHAMPION" target="_blank" rel="noopener noreferrer">Play the beta on Roblox</a><a href="https://www.tiktok.com/@risetochampionmma" target="_blank" rel="noopener noreferrer">Follow on TikTok</a><a href="https://www.youtube.com/@mmarisetochampion" target="_blank" rel="noopener noreferrer">Watch on YouTube</a></div><p className="work-update">This page will be updated as the community grows.</p></div></section>
  </>
}
