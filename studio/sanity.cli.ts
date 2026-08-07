import {defineCliConfig} from "sanity/cli"

export default defineCliConfig({
  studioHost: "the-bloxline",
  deployment: {appId: "aauyr3zvjrftwkve8sklfh9q"},
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  typegen: {
    path: "../src/sanity/**/*.ts",
    schema: "schema.json",
    generates: "../src/sanity/sanity.types.ts",
  },
})
