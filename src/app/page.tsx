import type {Metadata} from "next"
import Image from "next/image"
import Link from "next/link"
import {ArticleCard} from "@/components/ArticleCard"
import {getAllArticles} from "@/lib/articles"
import {getPublicJobs} from "@/lib/jobs"
import {siteConfig} from "@/lib/site"
import {GeeiqReferral} from "@/components/GeeiqReferral"
import {GameCard} from "@/components/GameCard"
import {getAllGames} from "@/lib/games"
import {BrowserFrame} from "@/components/BrowserFrame"

export const metadata: Metadata = {
  title: {absolute: "The Bloxline | Roblox Community Building for Games, Studios and Brands"},
  description: "The Bloxline helps Roblox games, studios and brands build communities, understand audiences and connect with people beyond the game.",
  alternates: {canonical: "/"},
  openGraph: {title: "The Bloxline | Roblox Community Building for Games, Studios and Brands", description: "The Bloxline helps Roblox games, studios and brands build communities, understand audiences and connect with people beyond the game.", url: "/", type: "website"},
}

const services = [
  {title: "Bloxline Playtest", copy: "See your Roblox game through a player’s eyes. Independent recorded playtesting and structured feedback covering onboarding, gameplay, progression, friction and the overall player experience.", items: ["Recorded gameplay", "Independent first impression", "Think aloud observations", "Clear feedback report", "Bloxline Top 5 priorities"], href: "/services/playtest", cta: "Explore Playtest", price: "Starting from £79"},
  {title: "Roblox Community Building", copy: "For games and studios that want to turn players into an active community outside Roblox.", items: ["Reddit community strategy", "Subreddit creation and structure", "Rules and moderation setup", "Launch content", "Recurring community formats", "Player feedback systems", "Community management", "Community insight and reporting"], href: "/services/community-building", cta: "Explore Community Building", price: "Community launches from £495"},
]

export default async function Home() {
  const articles = (await getAllArticles(false)).slice(0, 3)
  const jobs = (await getPublicJobs()).slice(0, 3)
  const games = (await getAllGames()).slice(0, 3)
  const playtestEmail = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Bloxline Playtest Enquiry")}`
  const generalEmail = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Bloxline Enquiry")}`

  return <>
    <header className="agency-hero">
      <div className="container agency-hero-inner">
        <span className="eyebrow">Roblox Playtest And Community Services</span>
        <h1>Playtest the game. Build the community.</h1>
        <p>The Bloxline helps Roblox developers and studios see their games through a player’s eyes, then build stronger relationships with the people around them.</p>
        <div className="agency-actions"><Link className="button" href="#services">Explore Services</Link><a className="button button-secondary" href={playtestEmail}>Talk About Your Game</a></div>
        <small>Independent player feedback and community building for Roblox studios.</small>
      </div>
    </header>

    <section className="agency-lead container">
      <div><span className="eyebrow">Start with the player</span><h2>A fresh perspective can reveal what a team no longer sees.</h2></div>
      <div><p>When you know a Roblox game inside out, it can be hard to experience it like somebody playing for the first time. Bloxline Playtest records that first experience and turns it into practical player feedback.</p><p>Then, once players are in the game, we can help build a community where they can continue the conversation, share feedback and stay connected to your studio.</p><Link className="text-link" href="/services/playtest">Explore Bloxline Playtest</Link></div>
    </section>

    <section className="agency-services" id="services">
      <div className="container"><div className="agency-section-head"><span className="eyebrow">What we do</span><h2>Two primary services for Roblox studios</h2></div><div className="agency-service-grid agency-service-grid-primary">{services.map((service) => <article className="agency-service-card" key={service.title}><h3>{service.title}</h3><p>{service.copy}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul><p className="service-detail"><strong>{service.price}</strong></p><Link className="text-link" href={service.href}>{service.cta}</Link></article>)}</div></div>
    </section>

    <section className="agency-pricing-preview container">
      <div><span className="eyebrow">Clear starting prices</span><h2>Practical support for the game and its community.</h2><p>Get an independent player perspective before launch or an update. Then build a lasting community around the experience.</p></div>
      <div className="agency-price-list"><Link href="/services/playtest#pricing"><span>Bloxline Playtest</span><strong>From £79</strong></Link><Link href="/services/community-building#pricing"><span>Community Launch</span><strong>£495 one time</strong></Link><Link href="/services/community-building#pricing"><span>Community Management</span><strong>From £395 per month</strong></Link></div>
    </section>

    <section className="agency-proof">
      <div className="container agency-proof-grid"><div><span className="eyebrow">Built around Roblox</span><h2>Specialist knowledge makes the community work stronger.</h2></div><div><p>The Bloxline works exclusively around the Roblox ecosystem.</p><p>Our understanding comes from covering Roblox games, studios, developers, careers, business models, communities and the way the platform is changing.</p><p>This specialist focus allows us to approach community building with an understanding of the environment the game actually exists within.</p></div></div>
    </section>

    <section className="homepage-client-work container"><div className="homepage-client-copy"><Image className="homepage-client-logo" src="/clients/mma-rise-to-champion-logo.png" alt="MMA Rise To Champion" width={1254} height={1254}/><span className="eyebrow">Current Client Work</span><h2>MMA Rise To Champion</h2><p className="homepage-client-subhead">Building a Roblox community from the ground up.</p><p>The Bloxline is building and managing the Reddit community for MMA Rise To Champion, supporting the experience through beta launch and beyond with community strategy, player discussion, content, feedback systems and developer participation.</p><Link className="text-link" href="/work/mma-rise-to-champion">View The Work</Link></div><BrowserFrame src="/work/mma-rise-to-champion/subreddit-launch.png" alt="The MMA Rise To Champion subreddit showing its beta launch discussion and community information"/></section>

    <GeeiqReferral featured/>

    <section className="section container agency-insights">
      <div className="section-heading"><div><span className="eyebrow">Authority and insight</span><h2>Roblox Intelligence And Guides</h2></div><Link className="text-link" href="/latest">View all insights</Link></div>
      <p className="agency-section-copy">Alongside our commercial work, The Bloxline publishes guides, analysis and reporting that help adults understand Roblox and the businesses being built around it.</p>
      <div className="article-grid">{articles.map((article) => <ArticleCard key={article.slug} article={article}/>)}</div>
    </section>

    <section className="section container recently-played"><div className="section-heading"><div><span className="eyebrow">The Bloxline Games</span><h2>Recently Played</h2></div><Link className="text-link" href="/games">Browse Games</Link></div>{games.length ? <div className="games-grid">{games.map((game) => <GameCard game={game} key={game.slug}/>)}</div> : <p className="agency-section-copy">Games personally played by The Bloxline are being added to the library.</p>}</section>

    <section className="section container agency-jobs">
      <div className="section-heading"><div><span className="eyebrow">Roblox Careers</span><h2>Jobs across the Roblox ecosystem</h2></div><Link className="text-link" href="/jobs">Explore Roblox Jobs</Link></div>
      <p className="agency-section-copy">Discover jobs and career opportunities across Roblox studios, development teams and businesses.</p>
      <div className="homepage-job-grid">{jobs.map((job) => <Link href={`/jobs/${job.slug}`} className="homepage-job" key={job.id}><span className="eyebrow">{job.remoteType}</span><h3>{job.title}</h3><p>{job.company}</p><p>{job.location}</p></Link>)}</div>
    </section>

    <section className="homepage-affiliates container"><div><span className="eyebrow">Commercial partnerships</span><h2>Partner with The Bloxline</h2><p>We are open to carefully selected affiliate and referral partnerships with products and services relevant to the Roblox ecosystem.</p></div><Link className="button" href="/affiliates">Affiliate Partnerships</Link></section>

    <section className="agency-final"><div className="container"><h2>Building something on Roblox?</h2><p>Whether you want to create a stronger community around your game, prepare for a new launch or communicate with audiences beyond Roblox, tell us what you are working on.</p><a className="button" href={generalEmail}>Start A Conversation</a></div></section>
  </>
}
