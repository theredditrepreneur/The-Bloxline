import {jobs as localJobs, effectiveJobStatus, type Job} from "../../content/jobs/jobs"
import {sanityClient} from "@/sanity/client"
import {allJobsQuery} from "@/sanity/queries"
import {toPlainText, type PortableTextBlock} from "@portabletext/react"

function validJob(value: unknown): value is Job {
  if (!value || typeof value !== "object") return false
  const job = value as Partial<Job>
  return typeof job.id === "string" && typeof job.slug === "string" && typeof job.title === "string" && typeof job.company === "string" && typeof job.companySlug === "string" && typeof job.location === "string" && typeof job.description === "string" && typeof job.applicationUrl === "string" && typeof job.sourceUrl === "string" && Array.isArray(job.tags)
}

export async function getAllJobs(): Promise<Job[]> {
  try {
    const documents = await sanityClient.withConfig({useCdn: false}).fetch<unknown[]>(allJobsQuery, {}, {next: {revalidate: 60, tags: ["jobs"]}})
    const sanityJobs = documents.map((value) => {
      if (!value || typeof value !== "object") return value
      const document = value as Record<string, unknown>
      const aboutRole = Array.isArray(document.aboutRole) ? document.aboutRole : undefined
      return {...document, aboutRole, description: aboutRole?.length ? toPlainText(aboutRole as PortableTextBlock[]) : document.description}
    }).filter(validJob)
    return sanityJobs
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
