import {jobs as localJobs, effectiveJobStatus, type Job} from "../../content/jobs/jobs"
import {sanityClient} from "@/sanity/client"
import {allJobsQuery} from "@/sanity/queries"

function validJob(value: unknown): value is Job {
  if (!value || typeof value !== "object") return false
  const job = value as Partial<Job>
  return typeof job.id === "string" && typeof job.slug === "string" && typeof job.title === "string" && typeof job.company === "string" && typeof job.companySlug === "string" && typeof job.location === "string" && typeof job.description === "string" && typeof job.applicationUrl === "string" && typeof job.sourceUrl === "string" && Array.isArray(job.tags)
}

export async function getAllJobs(): Promise<Job[]> {
  try {
    const documents = await sanityClient.withConfig({useCdn: false}).fetch<unknown[]>(allJobsQuery, {}, {next: {revalidate: 60, tags: ["jobs"]}})
    const sanityJobs = documents.filter(validJob)
    return sanityJobs.length ? sanityJobs : localJobs
  } catch (error) {
    console.error("Unable to load Sanity jobs. Using the local jobs file.", error)
    return localJobs
  }
}

export async function getPublicJobs(now = new Date()) {
  return (await getAllJobs()).filter((job) => ["active", "closing-soon"].includes(effectiveJobStatus(job, now))).sort((a, b) => Date.parse(b.datePosted || b.dateDiscovered) - Date.parse(a.datePosted || a.dateDiscovered))
}

export async function getJob(slug: string) { return (await getAllJobs()).find((job) => job.slug === slug) }
export async function getJobsByStudioProfileSlug(slug: string) { return (await getPublicJobs()).filter((job) => job.studioProfileSlug === slug) }
