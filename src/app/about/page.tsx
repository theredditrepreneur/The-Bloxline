import type {Metadata} from "next"
import Image from "next/image"
import Link from "next/link"
import {SocialIcon} from "@/components/SocialIcon"
import {getSiteSettings} from "@/lib/sanity-content"

const pageTitle = "About The Bloxline | The Adult’s Guide to Roblox"
const pageDescription = "Learn why Tonte Bo Douglas created The Bloxline to help parents, teachers, businesses and other adults understand Roblox."
const pageUrl = "https://thebloxline.com/about"
const founderLinkedIn = "https://www.linkedin.com/in/tontebodouglas"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const image = settings.defaultSocialImage ? new URL(settings.defaultSocialImage, settings.url).toString() : undefined
  return {
    title: {absolute: pageTitle},
    description: pageDescription,
    alternates: {canonical: pageUrl},
    openGraph: {type: "website", url: pageUrl, title: pageTitle, description: pageDescription, ...(image ? {images: [image]} : {})},
    twitter: {card: image ? "summary_large_image" : "summary", title: pageTitle, description: pageDescription, ...(image ? {images: [image]} : {})},
  }
}

const pillars = [
  {title: "Parents", href: "/parents", copy: "Clear Roblox guidance for parents and carers, including safety, spending, chat, parental controls and the games children are playing."},
  {title: "Industry", href: "/industry", copy: "The business, creator economy, regulation, partnerships, platform strategy and major decisions shaping Roblox."},
  {title: "Studios", href: "/studios", copy: "The companies, developers and teams building Roblox experiences and turning creation into professional businesses."},
  {title: "Games", href: "/games", copy: "The Roblox experiences adults should understand because they are popular, culturally significant or reveal broader trends in how people play."},
  {title: "Education", href: "/education", copy: "How Roblox is influencing creativity, coding, digital skills, schools, learning and future careers."},
]

const editorialQuestions = ["What happened?", "What is this?", "Why is it popular?", "Is it suitable for my child?", "Who built it?", "How does it make money?", "Why should adults care?", "What does it mean for the future of Roblox?"]

export default function AboutPage() {
  const aboutPageJson = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About The Bloxline",
    url: pageUrl,
    description: pageDescription,
    mainEntity: {
      "@type": "Person",
      name: "Tonte Bo Douglas",
      jobTitle: "Founder, The Bloxline",
      image: "https://thebloxline.com/authors/tonte-bo-douglas.jpg",
      sameAs: [founderLinkedIn],
      worksFor: {"@type": "NewsMediaOrganization", name: "The Bloxline", url: "https://thebloxline.com"},
    },
    isPartOf: {"@type": "NewsMediaOrganization", name: "The Bloxline", url: "https://thebloxline.com"},
  }

  return <>
    <header className="about-hero">
      <div><span className="eyebrow">Our Story</span><h1>About The Bloxline</h1><p>The Bloxline is The Adult’s Guide to Roblox, created to help parents, teachers, businesses and anyone else understand the platform, its games and the ecosystem growing around it.</p></div>
    </header>

    <article className="about-page">
      <section className="about-founder-intro" aria-labelledby="welcome-heading">
        <div className="about-portrait"><Image src="/authors/tonte-bo-douglas.jpg" alt="Tonte Bo Douglas, founder of The Bloxline" width={400} height={400} preload/></div>
        <div className="about-copy">
          <h2 id="welcome-heading">Welcome to The Bloxline</h2>
          <p>My name is Tonte Bo Douglas, and I created The Bloxline because I realised something that I think millions of adults are experiencing.</p>
          <p><strong>Children absolutely love Roblox.</strong></p>
          <p>As a parent, I watched how naturally young people disappeared into this world. They were not simply playing the occasional game. They were building, exploring, socialising and talking about Roblox with genuine passion.</p>
          <p>Like many parents, my first question was simple:</p>
          <p className="about-emphasis">What exactly is Roblox?</p>
          <p>The more I explored the platform with my own children, and eventually began playing it myself, the more I realised that Roblox is not simply a game.</p>
          <p className="about-emphasis">It is an entire digital ecosystem.</p>
          <p>Behind the millions of players is a world of professional studios, independent developers, creators, educators, artists, brands, investors and entrepreneurs.</p>
          <p>Some Roblox experiences attract audiences larger than many traditional video games. Creators are building full time careers. Major brands are investing in virtual experiences. Developers are forming professional studios. Schools and teachers are exploring Roblox as a tool for creativity, coding and digital skills.</p>
          <p>Yet much of the information surrounding Roblox is written either for children, experienced developers or investors who already understand the platform.</p>
          <p>There was very little written for adults who simply wanted Roblox explained clearly.</p>
          <p className="about-emphasis">So I decided to build it.</p>
        </div>
      </section>

      <section className="about-section about-mission" aria-labelledby="mission-heading">
        <span className="eyebrow">Our Mission</span><h2 id="mission-heading">The Adult’s Guide to Roblox</h2>
        <p>The Bloxline exists to help adults understand Roblox.</p>
        <p>That means explaining not only what is happening on the platform, but why it matters.</p>
        <p>Whether you are a parent trying to understand what your child is playing, a teacher exploring digital creativity, a developer interested in the creator economy, a business considering Roblox or an investor following the industry, The Bloxline is designed to provide clear, balanced and accessible information.</p>
        <p>Everything published on The Bloxline has one central goal:</p>
        <p className="about-promise">Help adults understand Roblox without requiring them to already be part of Roblox culture.</p>
      </section>

      <section className="about-section about-pillars" aria-labelledby="covers-heading">
        <span className="eyebrow">Editorial Desks</span><h2 id="covers-heading">What The Bloxline Covers</h2>
        <div className="about-pillar-grid">{pillars.map((pillar) => <Link className="about-pillar" href={pillar.href} key={pillar.title}><h3>{pillar.title}</h3><p>{pillar.copy}</p><span>Explore {pillar.title}</span></Link>)}</div>
      </section>

      <section className="about-section about-approach" aria-labelledby="approach-heading">
        <span className="eyebrow">Editorial Approach</span><h2 id="approach-heading">How The Bloxline Approaches Roblox</h2>
        <p>The Bloxline does not exist simply to repeat Roblox announcements.</p>
        <p>Its purpose is to explain what those announcements mean.</p>
        <p>Sometimes that means covering important news.</p>
        <p>Sometimes it means answering the questions parents and teachers are searching for.</p>
        <p>Sometimes it means explaining why a Roblox game has suddenly become one of the biggest experiences on the platform.</p>
        <p>Every article should aim to answer at least one of these questions:</p>
        <ul className="about-question-grid">{editorialQuestions.map((question) => <li key={question}>{question}</li>)}</ul>
        <p>The Bloxline’s editorial promise is simple:</p>
        <p className="about-promise">We do not merely report Roblox. We explain Roblox.</p>
      </section>

      <section className="about-section about-importance" aria-labelledby="importance-heading">
        <span className="eyebrow">The Bigger Picture</span><h2 id="importance-heading">Why Roblox Matters</h2>
        <p>I believe Roblox is becoming one of the most important digital platforms of this generation.</p>
        <p>It sits at the intersection of gaming, creativity, education, entertainment, technology and business.</p>
        <div className="about-uses"><p>Children use it to play and socialise.</p><p>Developers use it to build businesses.</p><p>Teachers use it to introduce coding and digital creation.</p><p>Brands use it to reach new audiences.</p><p>Studios use it to create games played by millions of people.</p></div>
        <p>Understanding Roblox is becoming increasingly valuable for parents, teachers, developers, businesses and investors alike.</p>
        <p>The Bloxline exists to make that understanding accessible.</p>
      </section>

      <section className="about-founder-card" aria-labelledby="founder-name">
        <Image src="/authors/tonte-bo-douglas.jpg" alt="" width={112} height={112}/>
        <div><h2 id="founder-name">Tonte Bo Douglas</h2><p>Founder, The Bloxline</p><a className="linkedin-button" href={founderLinkedIn} target="_blank" rel="noopener noreferrer" aria-label="Follow Tonte Bo Douglas on LinkedIn"><SocialIcon name="LinkedIn"/><span>Follow Tonte on LinkedIn</span></a></div>
      </section>

      <p className="about-closing">Welcome to The Bloxline, and thank you for reading.</p>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(aboutPageJson).replace(/</g, "\\u003c")}}/>
  </>
}
