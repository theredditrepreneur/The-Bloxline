import type {Job} from "./jobs"

// Copy this object into the jobs array in jobs.ts, then replace every example value.
// Never set a role to active until its official application page has been checked.
export const jobTemplate: Job = {
  id: "company-role-name",
  slug: "role-name-at-company",
  title: "Role title",
  company: "Company name",
  companySlug: "company-name",
  companyDescription: "One factual sentence about the company.",
  companyUrl: "https://company.example",
  location: "City or region",
  remoteType: "Remote",
  employmentType: "Full time",
  category: "Development",
  description: "A short Bloxline summary written in plain English.",
  whoItSuits: "A brief explanation of the experience that may suit the role.",
  ecosystemContext: "Why this work matters in the Roblox ecosystem.",
  sourceUrl: "https://company.example/careers/role",
  applicationUrl: "https://company.example/careers/role/apply",
  dateDiscovered: "YYYY-MM-DD",
  datePosted: "YYYY-MM-DD",
  verifiedAt: "YYYY-MM-DD",
  status: "unknown",
  featured: false,
  tags: ["Roblox"],
}
