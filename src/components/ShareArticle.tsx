"use client"

import {useState} from "react"
import {SocialIcon} from "@/components/SocialIcon"

export function ShareArticle({title, url}: {title: string; url: string}) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  async function copyLink() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return <div className="share-row" aria-label="Share this article">
    <span className="share-label">Share</span>
    <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" title="Share on X"><SocialIcon name="X"/></a>
    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" title="Share on Facebook"><SocialIcon name="Facebook"/></a>
    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" title="Share on LinkedIn"><SocialIcon name="LinkedIn"/></a>
    <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} aria-label="Share by email" title="Share by email"><SocialIcon name="Email"/></a>
    <button type="button" onClick={copyLink} aria-label="Copy article link" title="Copy article link"><SocialIcon name="Copy"/></button>
    <span className="sr-only" aria-live="polite">{copied ? "Article link copied" : ""}</span>
  </div>
}
