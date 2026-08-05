import {defineConfig} from "sanity"
import {structureTool} from "sanity/structure"
import {visionTool} from "@sanity/vision"
import {schemaTypes} from "./schemaTypes"

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || "production"

if (!projectId) throw new Error("Add SANITY_STUDIO_PROJECT_ID to studio/.env")

export default defineConfig({
  name: "the-bloxline",
  title: "The Bloxline",
  projectId,
  dataset,
  basePath: "/",
  plugins: [structureTool(), visionTool({defaultApiVersion: "2026-08-05"})],
  schema: {types: schemaTypes},
  document: {
    newDocumentOptions: (previous) => previous.filter((item) => item.templateId !== "author"),
  },
})
