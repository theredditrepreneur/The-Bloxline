import fs from "node:fs"
import path from "node:path"
import {randomUUID} from "node:crypto"
import matter from "gray-matter"

const articleDirectory = path.join(process.cwd(), "content", "articles")
const outputDirectory = path.join(process.cwd(), ".sanity-import")
const outputFile = path.join(outputDirectory, "starter-articles.ndjson")
const authorId = randomUUID()

const key = () => randomUUID().replaceAll("-", "").slice(0, 12)

function textBlock(text, style = "normal", extra = {}) {
  return {
    _key: key(),
    _type: "block",
    style,
    markDefs: [],
    children: [{_key: key(), _type: "span", marks: [], text: text.trim()}],
    ...extra,
  }
}

function portableText(source) {
  const blocks = []
  const lines = source.replaceAll("\r\n", "\n").split("\n")
  let paragraph = []
  let callout = null

  const flush = () => {
    if (paragraph.length) blocks.push(textBlock(paragraph.join(" ")))
    paragraph = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    const opening = line.match(/^<([A-Za-z]+)>$/)
    const closing = line.match(/^<\/([A-Za-z]+)>$/)

    if (opening) {
      flush()
      callout = {name: opening[1], lines: []}
    } else if (closing && callout) {
      const titles = {
        WhatAdultsNeedToKnow: "What Adults Need to Know",
        WhyItMatters: "Why It Matters",
        ForParents: "For Parents",
        ForTeachers: "For Teachers",
        BusinessAngle: "Business Angle",
        InPlainEnglish: "In Plain English",
        KeyTakeaways: "Key Takeaways",
        BloxlineView: "The Bloxline View",
        EditorNote: "Editor’s Note",
      }
      blocks.push({_key: key(), _type: "editorialCallout", kind: titles[callout.name] || "Note", body: [textBlock(callout.lines.join(" "))]})
      callout = null
    } else if (callout) {
      if (line) callout.lines.push(line)
    } else if (!line) {
      flush()
    } else if (line.startsWith("## ")) {
      flush()
      blocks.push(textBlock(line.slice(3), "h2"))
    } else if (line.startsWith("### ")) {
      flush()
      blocks.push(textBlock(line.slice(4), "h3"))
    } else if (line.startsWith("> ")) {
      flush()
      blocks.push(textBlock(line.slice(2), "blockquote"))
    } else if (/^[-*] /.test(line)) {
      flush()
      blocks.push(textBlock(line.slice(2), "normal", {listItem: "bullet", level: 1}))
    } else if (/^\d+\. /.test(line)) {
      flush()
      blocks.push(textBlock(line.replace(/^\d+\. /, ""), "normal", {listItem: "number", level: 1}))
    } else {
      paragraph.push(line)
    }
  }
  flush()
  return blocks
}

const documents = [{
  _id: authorId,
  _type: "author",
  name: "Tonte Bo Douglas",
  slug: {_type: "slug", current: "tonte-bo-douglas"},
  role: "Founder and editor",
}]

for (const filename of fs.readdirSync(articleDirectory).filter((name) => name.endsWith(".mdx") && !name.startsWith("_"))) {
  const {data, content} = matter(fs.readFileSync(path.join(articleDirectory, filename), "utf8"))
  documents.push({
    _id: randomUUID(),
    _type: "article",
    title: data.title,
    slug: {_type: "slug", current: data.slug},
    subtitle: data.subtitle,
    excerpt: data.excerpt,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    author: {_type: "reference", _ref: authorId},
    primaryDesk: data.primaryDesk,
    secondaryTopics: (data.secondaryTopics || []).map((topic) => ({_key: key(), _type: "string", value: topic})).map(({value}) => value),
    featured: Boolean(data.featured),
    draft: data.draft !== false,
    readingTime: data.readingTime,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    canonicalUrl: data.canonicalUrl,
    sourceLinks: (data.sourceLinks || []).map((source) => ({_key: key(), _type: "sourceLink", ...source})),
    disclosure: data.disclosure,
    parentRelevance: data.parentRelevance,
    teacherRelevance: data.teacherRelevance,
    industryRelevance: data.industryRelevance,
    body: portableText(content),
  })
}

fs.mkdirSync(outputDirectory, {recursive: true})
fs.writeFileSync(outputFile, documents.map((document) => JSON.stringify(document)).join("\n") + "\n")
console.log(outputFile)
