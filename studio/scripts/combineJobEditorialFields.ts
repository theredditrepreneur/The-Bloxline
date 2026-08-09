import {getCliClient} from "sanity/cli"

const client = getCliClient({apiVersion: "2026-08-09"})

type JobEditorialFields = {_id: string; description?: string; whoItSuits?: string; ecosystemContext?: string; editorialMigrationVersion?: number}

async function run() {
  const jobs = await client.fetch<JobEditorialFields[]>(`*[_type == "job" && coalesce(editorialMigrationVersion, 0) < 1]{_id, description, whoItSuits, ecosystemContext, editorialMigrationVersion}`)
  for (const job of jobs) {
    const sections = [job.description?.trim()]
    if (job.whoItSuits?.trim()) sections.push(`Who this role might suit\n${job.whoItSuits.trim()}`)
    if (job.ecosystemContext?.trim()) sections.push(`Why it matters in Roblox\n${job.ecosystemContext.trim()}`)
    const description = sections.filter(Boolean).join("\n\n")
    if (!description) continue
    await client.patch(job._id).set({description, editorialMigrationVersion: 1}).commit()
    console.log(`Combined editorial fields for ${job._id}`)
  }
  console.log(`Checked ${jobs.length} job documents.`)
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
