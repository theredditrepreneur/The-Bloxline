import {getCliClient} from "sanity/cli"
import {jobs} from "../../content/jobs/jobs"

const client = getCliClient({apiVersion: "2026-08-07"})

function textBlock(text: string, index = 0, style = "normal") {
  return {
    _type: "block",
    _key: `block-${index}`,
    style,
    markDefs: [],
    children: [{_type: "span", _key: `span-${index}`, text, marks: []}],
  }
}

async function run() {
  for (const job of jobs) {
    const {_id} = await client.createOrReplace({
      _id: `job-${job.id}`,
      _type: "job",
      sourceId: job.id,
      slug: {_type: "slug", current: job.slug},
      title: job.title,
      company: job.company,
      companySlug: {_type: "slug", current: job.companySlug},
      companyDescription: job.companyDescription,
      companyUrl: job.companyUrl,
      location: job.location,
      remoteType: job.remoteType,
      employmentType: job.employmentType,
      category: job.category,
      aboutRole: [textBlock(job.description)],
      description: job.description,
      whoItSuits: job.whoItSuits,
      ecosystemContext: job.ecosystemContext,
      sourceUrl: job.sourceUrl,
      applicationUrl: job.applicationUrl,
      dateDiscovered: job.dateDiscovered,
      datePosted: job.datePosted,
      closingDate: job.closingDate,
      verifiedAt: job.verifiedAt,
      status: job.status,
      featured: job.featured,
      salary: job.salary,
      salaryCurrency: job.salaryCurrency,
      salaryPeriod: job.salaryPeriod,
      tags: job.tags,
      studioProfileSlug: job.studioProfileSlug,
      remoteEligibility: job.remoteEligibility,
      portableTextMigrationVersion: 1,
    })
    console.log(`Imported ${job.title} as ${_id}`)
  }

  const count = await client.fetch<number>(`count(*[_type == "job"])`)
  if (count < jobs.length) throw new Error(`Expected at least ${jobs.length} jobs, found ${count}`)
  console.log(`Validated ${count} Sanity job documents.`)
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
