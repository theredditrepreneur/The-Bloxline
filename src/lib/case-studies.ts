export type CaseStudy = {
  slug: string
  client: string
  gameOrStudio: string
  challenge?: string
  scope?: string[]
  communityStrategy?: string
  implementation?: string[]
  launchApproach?: string
  earlyObservations?: string
  results?: string[]
  lessons?: string[]
  testimonial?: {quote: string; attribution: string}
  nextSteps?: string
}

// Keep case studies unpublished until client approval and meaningful evidence are available.
// The optional fields above allow a future client story to grow without a new page model.
export const caseStudies: CaseStudy[] = []
