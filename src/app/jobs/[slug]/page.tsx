import type {Metadata} from "next"
import Link from "next/link"
import {notFound} from "next/navigation"
import {effectiveJobStatus} from "../../../../content/jobs/jobs"
import {getAllJobs, getJob, getPublicJobs} from "@/lib/jobs"
import {absoluteUrl} from "@/lib/site"

const statusLabels = {active: "Active", "closing-soon": "Closing soon", expired: "Expired", unknown: "Check availability"}
export async function generateStaticParams() { return (await getAllJobs()).map(({slug}) => ({slug})) }
type JobPageProps = {params: Promise<{slug: string}>}
export async function generateMetadata({params}: JobPageProps): Promise<Metadata> {
  const {slug} = await params; const job = await getJob(slug); if (!job) return {}
  return {title: `${job.title} at ${job.company} | The Bloxline Jobs`, description: job.description, alternates: {canonical: `/jobs/${job.slug}`}, openGraph: {title: `${job.title} at ${job.company}`, description: job.description, url: `/jobs/${job.slug}`, type: "article"}}
}

export default async function JobPage({params}: JobPageProps) {
  const {slug} = await params; const job = await getJob(slug); if (!job) notFound()
  const status = effectiveJobStatus(job)
  const related = (await getPublicJobs()).filter((item) => item.slug !== job.slug && item.companySlug === job.companySlug).slice(0, 3)
  const schema = status !== "expired" && job.datePosted && job.remoteType === "Remote" && job.remoteEligibility?.length ? {"@context": "https://schema.org", "@type": "JobPosting", title: job.title, description: job.description, datePosted: job.datePosted, employmentType: "FULL_TIME", hiringOrganization: {"@type": "Organization", name: job.company, sameAs: job.companyUrl}, jobLocationType: "TELECOMMUTE", applicantLocationRequirements: job.remoteEligibility.map((name) => ({"@type": "Country", name})), url: absoluteUrl(`/jobs/${job.slug}`), directApply: false} : null
  return <main className="job-detail container">
    {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, "\\u003c")}} />}
    <Link className="text-link" href="/jobs">All Roblox jobs</Link>
    <header><div className="job-card-top"><span className={`job-status job-status-${status}`}>{statusLabels[status]}</span><span>{job.category}</span></div><h1>{job.title}</h1><p className="job-detail-company">{job.company}</p><dl className="job-meta"><div><dt>Location</dt><dd>{job.location}</dd></div><div><dt>Work style</dt><dd>{job.remoteType}</dd></div><div><dt>Employment</dt><dd>{job.employmentType}</dd></div>{job.datePosted && <div><dt>Posted</dt><dd>{new Intl.DateTimeFormat("en-GB", {dateStyle: "long"}).format(new Date(job.datePosted))}</dd></div>}{job.closingDate && <div><dt>Closing date</dt><dd>{new Intl.DateTimeFormat("en-GB", {dateStyle: "long"}).format(new Date(job.closingDate))}</dd></div>}</dl><a className="button" href={job.applicationUrl} target="_blank" rel="noopener noreferrer">Apply on the {job.company} website</a></header>
    <div className="job-detail-grid"><article><section><h2>What the role involves</h2><p>{job.description}</p></section><section><h2>Who this role might suit</h2><p>{job.whoItSuits}</p></section><section><h2>Why it matters in Roblox</h2><p>{job.ecosystemContext}</p></section><section><h2>Original source</h2><p>This summary was written by The Bloxline from the official listing. <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer">Read the original job listing</a>.</p></section></article><aside><strong>Before applying</strong><p>Check the employer page for the full requirements and the latest status. The employer handles every application.</p></aside></div>
    {!!related.length && <section className="related-jobs"><h2>More roles at {job.company}</h2>{related.map((item) => <p key={item.slug}><Link className="text-link" href={`/jobs/${item.slug}`}>{item.title}</Link> · {item.location}</p>)}</section>}
    <aside className="jobs-disclaimer"><p>The Bloxline curates job opportunities from official company and recruitment sources. Roles can close or change without notice. Always check the original listing before applying. The Bloxline is not the employer and does not manage applications unless explicitly stated.</p></aside>
  </main>
}
