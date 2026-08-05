import type {Metadata} from "next"
import Link from "next/link"
import {SanityBody} from "@/components/SanityBody"
import {getStartHereContent} from "@/lib/sanity-content"

export async function generateMetadata(): Promise<Metadata> {
  const content = await getStartHereContent()
  return {title: content.title, description: content.seoDescription, alternates: {canonical: "/start-here"}}
}

export default async function Page() {
  const content = await getStartHereContent()
  return <><header className="page-head"><div><span className="eyebrow">{content.label}</span><h1>{content.title}</h1><div className="start-intro"><SanityBody value={content.introduction}/></div></div></header><section className="section container"><div className="journey">{content.steps.map((step) => <div className="journey-item" key={step._key}><div><h2>{step.title}</h2><p>{step.description}</p>{step.href ? <Link className="text-link" href={step.href}>{step.linkLabel}</Link> : <span className="badge">Coming soon</span>}</div></div>)}</div></section></>
}
