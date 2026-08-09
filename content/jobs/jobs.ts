export const jobCategories = ["Development", "Game Design", "Art and Animation", "Product", "Community", "Marketing", "Trust and Safety", "AI", "Education", "Operations", "Other"] as const
export const remoteTypes = ["Remote", "Hybrid", "On site"] as const
export const jobStatuses = ["active", "closing-soon", "expired", "unknown"] as const

export type Job = {
  id: string
  slug: string
  title: string
  company: string
  companySlug: string
  companyDescription?: string
  companyUrl?: string
  location: string
  remoteType: (typeof remoteTypes)[number]
  employmentType: string
  category: (typeof jobCategories)[number]
  description: string
  whoItSuits?: string
  ecosystemContext?: string
  sourceUrl: string
  applicationUrl: string
  dateDiscovered: string
  datePosted?: string
  closingDate?: string
  verifiedAt?: string
  status: (typeof jobStatuses)[number]
  featured: boolean
  salary?: number
  salaryCurrency?: string
  salaryPeriod?: string
  tags: string[]
  studioProfileSlug?: string
  remoteEligibility?: string[]
}

export const jobs: Job[] = [
  {
    id: "voldex-nfl-software-engineer", slug: "software-engineer-nfl-universe-football", title: "Software Engineer, NFL Universe Football", company: "Voldex Games", companySlug: "voldex-games", companyDescription: "Voldex develops and operates live games on Roblox.", companyUrl: "https://www.voldex.com", location: "Remote, Canada", remoteType: "Remote", employmentType: "Full time", category: "Development", description: "Help develop and maintain NFL Universe Football, with a focus on reliable game systems and regular live updates.", whoItSuits: "An experienced software engineer who understands multiplayer games, live services and collaborative development.", ecosystemContext: "Large Roblox experiences need engineers who can keep complex live games stable while adding new features for players.", sourceUrl: "https://jobs.ashbyhq.com/voldex/886534ef-8a7d-4a9a-8a8b-59689ee14e2c", applicationUrl: "https://jobs.ashbyhq.com/voldex/886534ef-8a7d-4a9a-8a8b-59689ee14e2c/application", dateDiscovered: "2026-08-07", datePosted: "2026-08-05", verifiedAt: "2026-08-07", status: "active", featured: true, tags: ["Roblox", "Lua", "live games", "football"], remoteEligibility: ["Canada"],
  },
  {
    id: "voldex-brookhaven-software-engineer", slug: "software-engineer-brookhaven", title: "Software Engineer, Brookhaven", company: "Voldex Games", companySlug: "voldex-games", companyDescription: "Voldex develops and operates live games on Roblox.", companyUrl: "https://www.voldex.com", location: "Remote, Canada", remoteType: "Remote", employmentType: "Full time", category: "Development", description: "Work on engineering features and systems for Brookhaven, one of the games operated by Voldex.", whoItSuits: "A software engineer comfortable with game development, teamwork and improving a live product used by a large community.", ecosystemContext: "This role shows how established Roblox games employ permanent technical teams rather than relying only on individual creators.", sourceUrl: "https://jobs.ashbyhq.com/voldex/e14cad4a-d9f4-4397-a551-912e97f096d1", applicationUrl: "https://jobs.ashbyhq.com/voldex/e14cad4a-d9f4-4397-a551-912e97f096d1/application", dateDiscovered: "2026-08-07", datePosted: "2026-03-17", verifiedAt: "2026-08-07", status: "active", featured: true, tags: ["Roblox", "engineering", "Brookhaven", "live games"], remoteEligibility: ["Canada"],
  },
  {
    id: "voldex-brookhaven-qa", slug: "qa-tester-brookhaven", title: "QA Tester, Brookhaven", company: "Voldex Games", companySlug: "voldex-games", companyDescription: "Voldex develops and operates live games on Roblox.", companyUrl: "https://www.voldex.com", location: "Remote, United Kingdom", remoteType: "Remote", employmentType: "Full time", category: "Other", description: "Test Brookhaven updates, identify problems and give the development team clear information before changes reach players.", whoItSuits: "A careful tester who communicates clearly, understands games and enjoys finding repeatable problems.", ecosystemContext: "Quality assurance is an important part of professional Roblox production and helps studios release safer, more reliable updates.", sourceUrl: "https://jobs.ashbyhq.com/voldex/8d8af60f-a9b2-489b-9d61-19ff33f202a0", applicationUrl: "https://jobs.ashbyhq.com/voldex/8d8af60f-a9b2-489b-9d61-19ff33f202a0/application", dateDiscovered: "2026-08-07", datePosted: "2026-02-20", verifiedAt: "2026-08-07", status: "active", featured: false, tags: ["Roblox", "quality assurance", "testing", "Brookhaven"], remoteEligibility: ["United Kingdom"],
  },
  {
    id: "voldex-partnerships-manager", slug: "senior-partnerships-manager", title: "Senior Partnerships Manager", company: "Voldex Games", companySlug: "voldex-games", companyDescription: "Voldex develops and operates live games on Roblox.", companyUrl: "https://www.voldex.com", location: "Remote, United States", remoteType: "Remote", employmentType: "Full time", category: "Marketing", description: "Build commercial partnerships that connect brands and other organisations with Voldex games and their audiences.", whoItSuits: "A commercial partnerships professional who can explain digital games clearly and manage relationships from first conversation to delivery.", ecosystemContext: "Roblox studios increasingly employ commercial specialists as brands look for thoughtful ways to reach gaming communities.", sourceUrl: "https://jobs.ashbyhq.com/voldex/48e7bd0a-bcf6-4392-b067-3eb9b06043d0", applicationUrl: "https://jobs.ashbyhq.com/voldex/48e7bd0a-bcf6-4392-b067-3eb9b06043d0/application", dateDiscovered: "2026-08-07", datePosted: "2026-07-01", verifiedAt: "2026-08-07", status: "active", featured: false, tags: ["Roblox", "partnerships", "brands", "sales"], remoteEligibility: ["United States"],
  },
  {
    id: "voldex-security-it", slug: "security-and-it-specialist", title: "Security and IT Specialist", company: "Voldex Games", companySlug: "voldex-games", companyDescription: "Voldex develops and operates live games on Roblox.", companyUrl: "https://www.voldex.com", location: "Montreal or Ottawa, Canada", remoteType: "Hybrid", employmentType: "Full time", category: "Operations", description: "Support the company’s security and internal technology, helping staff use systems safely and reliably.", whoItSuits: "An information security or IT professional who enjoys practical problem solving and supporting a growing team.", ecosystemContext: "Roblox studios need the same operational security and technology skills as other modern software companies.", sourceUrl: "https://jobs.ashbyhq.com/voldex/286586e7-c602-47f6-a97c-a2bcb09ed6c8", applicationUrl: "https://jobs.ashbyhq.com/voldex/286586e7-c602-47f6-a97c-a2bcb09ed6c8/application", dateDiscovered: "2026-08-07", datePosted: "2026-05-07", verifiedAt: "2026-08-07", status: "active", featured: false, tags: ["security", "IT", "operations", "Roblox"],
  },
]

export function effectiveJobStatus(job: Job, now = new Date()) {
  if (job.closingDate && new Date(`${job.closingDate}T23:59:59Z`) < now) return "expired" as const
  return job.status
}

export function getPublicJobs(now = new Date()) {
  return jobs.filter((job) => ["active", "closing-soon"].includes(effectiveJobStatus(job, now))).sort((a, b) => Date.parse(b.datePosted || b.dateDiscovered) - Date.parse(a.datePosted || a.dateDiscovered))
}

export function getJob(slug: string) { return jobs.find((job) => job.slug === slug) }
export function getJobsByStudioProfileSlug(slug: string) { return getPublicJobs().filter((job) => job.studioProfileSlug === slug) }
