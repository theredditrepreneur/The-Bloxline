import {CaseIcon} from "@sanity/icons/Case"
import {defineArrayMember, defineField, defineType} from "sanity"

const categories = ["Development", "Game Design", "Art and Animation", "Product", "Community", "Marketing", "Trust and Safety", "AI", "Education", "Operations", "Other"]

export const jobType = defineType({
  name: "job",
  title: "Job",
  type: "document",
  icon: CaseIcon,
  groups: [
    {name: "role", title: "Role", default: true},
    {name: "application", title: "Application"},
    {name: "editorial", title: "Bloxline summary"},
    {name: "publishing", title: "Status and dates"},
  ],
  fields: [
    defineField({name: "title", title: "Job title", type: "string", group: "role", validation: (rule) => rule.required()}),
    defineField({name: "slug", title: "Job page address", type: "slug", group: "role", options: {source: (document) => `${document.title || "job"}-at-${document.company || "company"}`, maxLength: 96}, validation: (rule) => rule.required()}),
    defineField({name: "company", title: "Company", type: "string", group: "role", validation: (rule) => rule.required()}),
    defineField({name: "companySlug", title: "Company address name", type: "slug", group: "role", description: "The same company address name can be used for every vacancy from that company.", options: {source: "company", isUnique: () => true}, validation: (rule) => rule.required()}),
    defineField({name: "companyDescription", title: "Company summary", type: "text", rows: 2, group: "role"}),
    defineField({name: "companyUrl", title: "Company website", type: "url", group: "role", validation: (rule) => rule.uri({scheme: ["http", "https"]})}),
    defineField({name: "location", title: "Location", type: "string", group: "role", validation: (rule) => rule.required()}),
    defineField({name: "remoteType", title: "Work style", type: "string", group: "role", options: {list: ["Remote", "Hybrid", "On site"], layout: "radio"}, validation: (rule) => rule.required()}),
    defineField({name: "employmentType", title: "Employment type", type: "string", group: "role", options: {list: ["Full time", "Part time", "Contract", "Temporary", "Internship", "Other"]}, validation: (rule) => rule.required()}),
    defineField({name: "category", title: "Category", type: "string", group: "role", options: {list: categories}, validation: (rule) => rule.required()}),
    defineField({name: "tags", title: "Search tags", type: "array", group: "role", of: [defineArrayMember({type: "string"})], options: {layout: "tags"}, validation: (rule) => rule.unique()}),
    defineField({name: "sourceUrl", title: "Official job listing", type: "url", group: "application", validation: (rule) => rule.required().uri({scheme: ["http", "https"]})}),
    defineField({name: "applicationUrl", title: "Application link", type: "url", group: "application", validation: (rule) => rule.required().uri({scheme: ["http", "https"]})}),
    defineField({name: "description", title: "Short Bloxline summary", type: "text", rows: 3, group: "editorial", validation: (rule) => rule.required().min(30).max(400)}),
    defineField({name: "whoItSuits", title: "Who this role might suit", type: "text", rows: 3, group: "editorial", validation: (rule) => rule.required().min(30)}),
    defineField({name: "ecosystemContext", title: "Why it matters in Roblox", type: "text", rows: 3, group: "editorial", validation: (rule) => rule.required().min(30)}),
    defineField({name: "status", title: "Public status", type: "string", group: "publishing", initialValue: "unknown", options: {list: [{title: "Active", value: "active"}, {title: "Closing soon", value: "closing-soon"}, {title: "Expired", value: "expired"}, {title: "Check availability", value: "unknown"}], layout: "radio"}, validation: (rule) => rule.required()}),
    defineField({name: "featured", title: "Feature this role", type: "boolean", group: "publishing", initialValue: false}),
    defineField({name: "dateDiscovered", title: "Date discovered", type: "date", group: "publishing", initialValue: () => new Date().toISOString().slice(0, 10), validation: (rule) => rule.required()}),
    defineField({name: "datePosted", title: "Date posted by employer", type: "date", group: "publishing"}),
    defineField({name: "closingDate", title: "Application closing date", type: "date", group: "publishing", description: "Leave empty when the employer has not provided one."}),
    defineField({name: "verifiedAt", title: "Last checked", type: "date", group: "publishing", description: "The date you last confirmed the official application page was open."}),
    defineField({name: "salary", title: "Salary amount", type: "number", group: "publishing", validation: (rule) => rule.positive()}),
    defineField({name: "salaryCurrency", title: "Salary currency", type: "string", group: "publishing", hidden: ({document}) => !document?.salary}),
    defineField({name: "salaryPeriod", title: "Salary period", type: "string", group: "publishing", options: {list: ["Hour", "Day", "Month", "Year"]}, hidden: ({document}) => !document?.salary}),
    defineField({name: "studioProfileSlug", title: "Matching studio profile address", type: "string", group: "role", description: "Optional. Used when a matching Studio profile exists."}),
    defineField({name: "remoteEligibility", title: "Eligible countries", type: "array", group: "role", of: [defineArrayMember({type: "string"})], options: {layout: "tags"}, hidden: ({document}) => document?.remoteType !== "Remote"}),
    defineField({name: "sourceId", title: "Source record ID", type: "string", readOnly: true, hidden: ({value}) => value === undefined}),
  ],
  orderings: [{title: "Newest roles first", name: "newest", by: [{field: "datePosted", direction: "desc"}, {field: "dateDiscovered", direction: "desc"}]}],
  preview: {select: {title: "title", company: "company", status: "status"}, prepare: ({title, company, status}) => ({title: title || "Untitled job", subtitle: `${company || "No company"}, ${status || "No status"}`})},
})
