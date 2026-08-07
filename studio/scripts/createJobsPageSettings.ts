import {getCliClient} from "sanity/cli"

const client = getCliClient({apiVersion: "2026-08-07"})

async function run() {
  const article = await client.fetch<{_id: string} | null>(`*[_type == "article" && slug.current == "who-builds-roblox-games"][0]{_id}`)
  await client.createIfNotExists({
    _id: "jobsPageSettings",
    _type: "jobsPageSettings",
    careerGuidesHeading: "Explore Roblox Careers",
    careerGuides: [
      {_key: "who-builds", _type: "careerGuide", status: article ? "published" : "comingSoon", ...(article ? {article: {_type: "reference", _ref: article._id}, label: "Career guide"} : {title: "Who Builds Roblox Games?"}), description: "Meet the teams and specialist roles behind Roblox experiences."},
      {_key: "career", _type: "careerGuide", status: "comingSoon", title: "Can Roblox Become a Career?", description: "Clear career guidance is being prepared by The Bloxline."},
      {_key: "developer", _type: "careerGuide", status: "comingSoon", title: "How to Become a Roblox Developer", description: "Clear career guidance is being prepared by The Bloxline."},
      {_key: "skills", _type: "careerGuide", status: "comingSoon", title: "What Skills Do Roblox Studios Look For?", description: "Clear career guidance is being prepared by The Bloxline."},
    ],
  })
  console.log("Jobs page settings are ready.")
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
