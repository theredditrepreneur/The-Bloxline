"use client"

import {useMemo, useState} from "react"
import {JobCard} from "@/components/JobCard"
import type {Job} from "../../content/jobs/jobs"

export function JobsBrowser({jobs}: {jobs: Job[]}) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [remote, setRemote] = useState("All")
  const categories = ["All", ...new Set(jobs.map((job) => job.category))]
  const results = useMemo(() => jobs.filter((job) => {
    const searchable = [job.title, job.company, job.category, job.location, ...job.tags].join(" ").toLowerCase()
    return searchable.includes(query.toLowerCase().trim()) && (category === "All" || job.category === category) && (remote === "All" || job.remoteType === remote)
  }), [jobs, query, category, remote])
  return <div>
    <div className="job-filters">
      <label className="job-search"><span>Search jobs</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Job title, company or location" /></label>
      <fieldset><legend>Category</legend><div className="filter-chips">{categories.map((item) => <button type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div></fieldset>
      <fieldset><legend>Work style</legend><div className="filter-chips">{["All", "Remote", "Hybrid", "On site"].map((item) => <button type="button" aria-pressed={remote === item} onClick={() => setRemote(item)} key={item}>{item}</button>)}</div></fieldset>
    </div>
    <p className="search-count" aria-live="polite">{results.length} {results.length === 1 ? "role" : "roles"} found</p>
    <div className="jobs-list">{results.map((job) => <JobCard job={job} key={job.id} />)}</div>
    {!results.length && <p className="empty">No current roles match those filters. Try a broader search.</p>}
  </div>
}
