"use client"

import {useEffect, useRef, useState} from "react"

type TikTokEmbedProps = {
  videoUrl: string
  title?: string
  creator?: string
}

type TikTokVideo = {
  creator: string
  id: string
  url: string
}

let tiktokScriptPromise: Promise<void> | undefined

function renderTikTokEmbeds() {
  const tiktok = window as typeof window & {tiktokEmbed?: {lib?: {render?: () => void}}}
  tiktok.tiktokEmbed?.lib?.render?.()
}

function getTikTokVideo(videoUrl: string): TikTokVideo | null {
  try {
    const url = new URL(videoUrl)
    const isTikTok = url.hostname === "tiktok.com" || url.hostname.endsWith(".tiktok.com")
    const match = url.pathname.match(/^\/@([^/]+)\/video\/(\d+)/)

    if (!isTikTok || !match) return null

    return {creator: match[1], id: match[2], url: `https://www.tiktok.com/@${match[1]}/video/${match[2]}`}
  } catch {
    return null
  }
}

function loadTikTokEmbedScript() {
  if (tiktokScriptPromise) return tiktokScriptPromise

  tiktokScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById("tiktok-embed-script") as HTMLScriptElement | null

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        renderTikTokEmbeds()
        resolve()
      }
      else {
        existingScript.addEventListener("load", () => resolve(), {once: true})
        existingScript.addEventListener("error", () => reject(new Error("TikTok embed script could not load.")), {once: true})
      }
      return
    }

    const script = document.createElement("script")
    script.id = "tiktok-embed-script"
    script.src = "https://www.tiktok.com/embed.js"
    script.async = true
    script.onload = () => {
      script.dataset.loaded = "true"
      renderTikTokEmbeds()
      resolve()
    }
    script.onerror = () => reject(new Error("TikTok embed script could not load."))
    document.body.appendChild(script)
  })

  return tiktokScriptPromise
}

export default function TikTokEmbed({videoUrl, title, creator}: TikTokEmbedProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const video = getTikTokVideo(videoUrl)

  useEffect(() => {
    const card = cardRef.current
    if (!card || !video) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setShouldLoad(true)
      observer.disconnect()
    }, {rootMargin: "280px 0px"})

    observer.observe(card)
    return () => observer.disconnect()
  }, [video])

  useEffect(() => {
    if (!shouldLoad || !video) return
    void loadTikTokEmbedScript().then(renderTikTokEmbeds).catch(() => undefined)
  }, [shouldLoad, video])

  if (!video) {
    return <article className="tiktok-card tiktok-card-invalid">
      <span className="eyebrow">TikTok</span>
      <h3>{title ?? "TikTok video unavailable"}</h3>
      <p>This video link is not a valid TikTok video URL.</p>
    </article>
  }

  return <article className="tiktok-card" ref={cardRef}>
    {shouldLoad ? <blockquote className="tiktok-embed" cite={video.url} data-video-id={video.id} style={{maxWidth: 605, minWidth: 325}}>
      <section><a href={video.url} target="_blank" rel="noreferrer">Watch this TikTok video</a></section>
    </blockquote> : <div className="tiktok-loading" aria-label={`Loading ${title ?? "TikTok video"}`} />}
    {(title || creator) && <footer className="tiktok-card-meta">{title && <h3>{title}</h3>}{creator && <p>By {creator}</p>}</footer>}
  </article>
}
