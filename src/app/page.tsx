import type {Metadata} from "next"
import Link from "next/link"
import {ArticleCard} from "@/components/ArticleCard"
import {getAllArticles} from "@/lib/articles"
import {getPublicJobs} from "@/lib/jobs"
import {siteConfig} from "@/lib/site"
import {GeeiqReferral} from "@/components/GeeiqReferral"

export const metadata: Metadata = {
  title: {absolute: "The Bloxline | Roblox Community Building for Games, Studios and Brands"},
  description: "The Bloxline helps Roblox games, studios and brands build communities, understand audiences and connect with people beyond the game.",
  alternates: {canonical: "/"},
  openGraph: {title: "The Bloxline | Roblox Community Building for Games, Studios and Brands", description: "The Bloxline helps Roblox games, studios and brands build communities, understand audiences and connect with people beyond the game.", url: "/", type: "website"},
}

const services = [
  {title: "Roblox Community Building", copy: "For games and studios that want to turn players into an active community outside Roblox.", items: ["Reddit community strategy", "Subreddit creation and structure", "Rules and moderation setup", "Launch content", "Recurring community formats", "Player feedback systems", "Community management", "Community insight and reporting"], href: "/services/community-building", cta: "View Community Building"},
  {title: "Community Management", copy: "For studios that already have a community but need ongoing support keeping activity useful and collecting player feedback.", items: ["Regular community content", "Update discussion threads", "Player engagement", "Moderation oversight", "Feedback collection", "Community reporting", "Recommendations"], href: "/services/community-building#pricing", cta: "View Ongoing Management"},
  {title: "Roblox Audience And Adult Strategy", copy: "For studios, brands and businesses that need to explain Roblox clearly to people outside the traditional player audience.", items: ["Adult audience positioning", "Messaging reviews", "Roblox education for non player audiences", "Brand and studio communication strategy", "Content concepts", "Audience insight", "Industry context"], href: "/services/adult-audience", cta: "Talk To The Bloxline"},
]

export default async function Home() {
  const articles = (await getAllArticles(false)).slice(0, 3)
  const jobs = (await getPublicJobs()).slice(0, 3)
  const communityEmail = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Roblox Community Enquiry")}`
  const generalEmail = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Bloxline Enquiry")}`

  return <>
    <header className="agency-hero">
      <div className="container agency-hero-inner">
        <span className="eyebrow">Roblox Community And Audience Services</span>
        <h1>Build a stronger community around your Roblox game.</h1>
        <p>The Bloxline helps Roblox developers, studios and brands build communities beyond the experience, understand their audiences and create stronger relationships with the people around their games.</p>
        <div className="agency-actions"><Link className="button" href="#services">Explore Services</Link><a className="button button-secondary" href={communityEmail}>Talk About Your Game</a></div>
        <small>Community building, audience insight and adult facing Roblox strategy.</small>
      </div>
    </header>

    <section className="agency-lead container">
      <div><span className="eyebrow">Community beyond the experience</span><h2>Roblox brings the players. We help build the community.</h2></div>
      <div><p>A successful Roblox experience can attract thousands or millions of players without ever developing a strong community outside the game.</p><p>The Bloxline helps studios create places where players can continue the conversation, share feedback, discuss updates, create content and build stronger relationships with the people behind the game.</p><p>Our community work begins with Reddit, where persistent discussions, searchable content and player led conversations can complement platforms such as Discord rather than replace them.</p><Link className="text-link" href="/services/community-building">Explore Community Building</Link></div>
    </section>

    <section className="agency-services" id="services">
      <div className="container"><div className="agency-section-head"><span className="eyebrow">What we do</span><h2>Services for Roblox studios and brands</h2></div><div className="agency-service-grid">{services.map((service) => <article className="agency-service-card" key={service.title}><h3>{service.title}</h3><p>{service.copy}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul><Link className="text-link" href={service.href}>{service.cta}</Link></article>)}</div></div>
    </section>

    <section className="agency-pricing-preview container">
      <div><span className="eyebrow">Clear starting prices</span><h2>Community services built around your game.</h2><p>Launch a new Reddit community, rebuild an existing one or ask The Bloxline to stay involved with ongoing management.</p></div>
      <div className="agency-price-list"><Link href="/services/community-building#pricing"><span>Community Launch</span><strong>£495 one time</strong></Link><Link href="/services/community-building#pricing"><span>Community Management</span><strong>From £395 per month</strong></Link><Link href="/services/community-building#pricing"><span>Community Management Plus</span><strong>From £695 per month</strong></Link></div>
    </section>

    <section className="agency-proof">
      <div className="container agency-proof-grid"><div><span className="eyebrow">Built around Roblox</span><h2>Specialist knowledge makes the community work stronger.</h2></div><div><p>The Bloxline works exclusively around the Roblox ecosystem.</p><p>Our understanding comes from covering Roblox games, studios, developers, careers, business models, communities and the way the platform is changing.</p><p>This specialist focus allows us to approach community building with an understanding of the environment the game actually exists within.</p></div></div>
    </section>

    <section className="agency-current container"><span className="eyebrow">Current Community Work</span><h2>Building stronger community infrastructure around Roblox games.</h2><p>The Bloxline is currently in discussions with Roblox studios and developers about building stronger community infrastructure around their games, including the relationship between Reddit, Discord and existing Roblox audiences.</p></section>

    <GeeiqReferral featured/>

    <section className="section container agency-insights">
      <div className="section-heading"><div><span className="eyebrow">Authority and insight</span><h2>Roblox Intelligence And Guides</h2></div><Link className="text-link" href="/latest">View all insights</Link></div>
      <p className="agency-section-copy">Alongside our commercial work, The Bloxline publishes guides, analysis and reporting that help adults understand Roblox and the businesses being built around it.</p>
      <div className="article-grid">{articles.map((article) => <ArticleCard key={article.slug} article={article}/>)}</div>
    </section>

    <section className="section container agency-jobs">
      <div className="section-heading"><div><span className="eyebrow">Roblox Careers</span><h2>Jobs across the Roblox ecosystem</h2></div><Link className="text-link" href="/jobs">Explore Roblox Jobs</Link></div>
      <p className="agency-section-copy">Discover jobs and career opportunities across Roblox studios, development teams and businesses.</p>
      <div className="homepage-job-grid">{jobs.map((job) => <Link href={`/jobs/${job.slug}`} className="homepage-job" key={job.id}><span className="eyebrow">{job.remoteType}</span><h3>{job.title}</h3><p>{job.company}</p><p>{job.location}</p></Link>)}</div>
    </section>

    <section className="homepage-affiliates container"><div><span className="eyebrow">Commercial partnerships</span><h2>Partner with The Bloxline</h2><p>We are open to carefully selected affiliate and referral partnerships with products and services relevant to the Roblox ecosystem.</p></div><Link className="button" href="/affiliates">Affiliate Partnerships</Link></section>

    <section className="agency-final"><div className="container"><h2>Building something on Roblox?</h2><p>Whether you want to create a stronger community around your game, prepare for a new launch or communicate with audiences beyond Roblox, tell us what you are working on.</p><a className="button" href={generalEmail}>Start A Conversation</a></div></section>
  </>
}
