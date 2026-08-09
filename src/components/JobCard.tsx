import Link from "next/link"
import {effectiveJobStatus, type Job} from "../../content/jobs/jobs"

const labels = {active: "Active", "closing-soon": "Closing soon", expired: "Expired", unknown: "Check availability"}

export function JobCard({job}: {job: Job}) {
  const status = effectiveJobStatus(job)
  return <article className="job-card">
    <div className="job-card-top"><span className={`job-status job-status-${status}`}>{labels[status]}</span><span>{job.category}</span></div>
    <h3><Link href={`/jobs/${job.slug}`}>{job.title}</Link></h3>
    <p className="job-company">{job.company}</p>
    <dl className="job-meta"><div><dt>Location</dt><dd>{job.location}</dd></div><div><dt>Work style</dt><dd>{job.remoteType}</dd></div><div><dt>Type</dt><dd>{job.employmentType}</dd></div></dl>
    <p className="job-card-summary">{job.description}</p>
    <div className="job-actions"><Link className="text-link" href={`/jobs/${job.slug}`}>Read our summary</Link><a className="button" href={job.applicationUrl} target="_blank" rel="noopener noreferrer">View job at {job.company}</a></div>
  </article>
}
