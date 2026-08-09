import {getCliClient} from "sanity/cli"

const client = getCliClient({apiVersion: "2026-08-09"})

type JobDocument = {
  _id: string
  description?: string
}

type TextBlock = {
  _type: "block"
  _key: string
  style: "normal" | "h2"
  listItem?: "bullet" | "number"
  level?: number
  markDefs: never[]
  children: Array<{_type: "span"; _key: string; text: string; marks: never[]}>
}

const knownHeadings = new Set([
  "Who this role might suit",
  "Why it matters in Roblox",
])

function makeBlock(text: string, index: number, style: TextBlock["style"] = "normal", listItem?: TextBlock["listItem"]): TextBlock {
  return {
    _type: "block",
    _key: `block-${index}`,
    style,
    ...(listItem ? {listItem, level: 1} : {}),
    markDefs: [],
    children: [{_type: "span", _key: `span-${index}`, text, marks: []}],
  }
}

function toPortableText(value: string): TextBlock[] {
  const blocks: TextBlock[] = []
  let paragraph: string[] = []

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim()
    if (text) blocks.push(makeBlock(text, blocks.length))
    paragraph = []
  }

  for (const rawLine of value.replace(/\r\n?/g, "\n").split("\n")) {
    const line = rawLine.trim()
    if (!line) {
      flushParagraph()
      continue
    }

    if (knownHeadings.has(line.replace(/:$/, ""))) {
      flushParagraph()
      blocks.push(makeBlock(line.replace(/:$/, ""), blocks.length, "h2"))
      continue
    }

    const bullet = line.match(/^[\-•]\s+(.+)$/)
    const number = line.match(/^\d+[.)]\s+(.+)$/)
    if (bullet || number) {
      flushParagraph()
      blocks.push(makeBlock((bullet?.[1] ?? number?.[1]) as string, blocks.length, "normal", bullet ? "bullet" : "number"))
      continue
    }

    paragraph.push(line)
  }

  flushParagraph()
  return blocks
}

async function run() {
  const documents = await client.fetch<JobDocument[]>(
    `*[_type == "job" && defined(description) && length(description) > 0 && !defined(aboutRole)]{_id, description}`,
  )

  for (const document of documents) {
    const aboutRole = toPortableText(document.description ?? "")
    if (!aboutRole.length) continue
    await client.patch(document._id).set({aboutRole, portableTextMigrationVersion: 1}).commit()
    console.log(`Formatted ${document._id}`)
  }

  console.log(`Formatted ${documents.length} job documents. The original text was retained as a safety copy.`)
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
