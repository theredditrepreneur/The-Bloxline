import type {Metadata} from "next"
import Link from "next/link"
import {JobsBrowser} from "@/components/JobsBrowser"
import {getPublicJobs} from "@/lib/jobs"
import {siteConfig} from "@/lib/site"
import {getJobsPageSettings} from "@/lib/jobs-page"

export const metadata: Metadata = {
  title: "Roblox Jobs and Careers | The Bloxline",
  description: "Explore jobs and career opportunities across the Roblox ecosystem, including development, design, community, marketing, product and studio roles.",
  alternates: {canonical: "/jobs"},
  openGraph: {title: "Roblox Jobs and Careers | The Bloxline", description: "Explore jobs and career opportunities across the Roblox ecosystem.", url: "/jobs", type: "website"},
}

export default async function JobsPage() {
  const jobs = await getPublicJobs()
  const pageSettings = await getJobsPageSettings()
  const companies = [...new Map(jobs.map((job) => [job.companySlug, {slug: job.companySlug, name: job.company, description: job.companyDescription, count: jobs.filter((item) => item.companySlug === job.companySlug).length}])).values()]
  const subject = encodeURIComponent("Roblox Job Submission")
  return <>
    <header className="page-head jobs-head"><div><span className="eyebrow">The Bloxline Jobs</span><h1>Roblox Jobs</h1><p className="jobs-subtitle">Find jobs, careers and opportunities across the Roblox ecosystem.</p><p>Roblox is more than a place to play games. Studios, technology companies and creative teams hire developers, designers, artists, producers, community managers, marketers and many other professionals. The Bloxline Jobs helps adults discover those opportunities and understand what working in Roblox can actually look like.</p></div></header>
    <main>
      <section className="section container" id="latest-jobs"><div className="section-heading"><h2>Latest Roblox Jobs</h2></div><p className="jobs-studio-link">Are you a Roblox studio? <Link className="text-link" href="/services">Explore Bloxline services</Link></p><JobsBrowser jobs={jobs} /></section>
      <section className="section container jobs-secondary"><div className="section-heading"><h2>Companies Hiring</h2></div><div className="company-grid">{companies.map((company) => <article className="company-card" key={company.slug}><span className="eyebrow">{company.count} current {company.count === 1 ? "role" : "roles"}</span><h3>{company.name}</h3><p>{company.description}</p><a className="text-link" href="#latest-jobs">View jobs</a></article>)}</div></section>
      <section className="section container jobs-secondary"><div className="section-heading"><h2>{pageSettings.careerGuidesHeading}</h2></div><div className="career-grid">{pageSettings.careerGuides.map((card) => card.status === "published" && card.href ? <Link className="career-card" href={card.href} key={card._key}><span className="eyebrow">{card.label}</span><h3>{card.title}</h3><p>{card.description}</p></Link> : <div className="career-card" key={card._key}><span className="badge">Coming soon</span><h3>{card.title}</h3><p>{card.description}</p></div>)}</div></section>
      <section className="section container"><div className="jobs-submit"><div><span className="eyebrow">For studios and companies</span><h2>Hiring in the Roblox ecosystem?</h2><p>The Bloxline is building a curated destination for Roblox related careers. If your studio or company has an active role you would like us to consider featuring, send us the official job link.</p><p><strong>Job submissions are currently free while The Bloxline builds its careers directory.</strong></p><small>Listings are reviewed manually. Submission does not guarantee publication.</small></div><a className="button" href={`mailto:${siteConfig.jobsEmail}?subject=${subject}`}>Submit a job</a></div></section>
      <aside className="jobs-disclaimer container"><p>The Bloxline curates job opportunities from official company and recruitment sources. Roles can close or change without notice. Always check the original listing before applying. The Bloxline is not the employer and does not manage applications unless explicitly stated.</p></aside>
    </main>
  </>
}
