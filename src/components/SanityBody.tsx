import Image from "next/image"
import {PortableText, type PortableTextComponents} from "next-sanity"

type SanityBodyProps = {value: unknown[]}

function getYouTubeEmbedUrl(value: unknown) {
  if (!value || typeof value !== "object" || typeof (value as {url?: unknown}).url !== "string") return null
  try {
    const url = new URL((value as {url: string}).url)
    const host = url.hostname.replace(/^www\./, "")
    let id = ""
    if (host === "youtu.be") id = url.pathname.split("/").filter(Boolean)[0] || ""
    if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      id = url.searchParams.get("v") || ""
      if (!id) {
        const parts = url.pathname.split("/").filter(Boolean)
        if (["embed", "shorts", "live"].includes(parts[0] || "")) id = parts[1] || ""
      }
    }
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null
  } catch {
    return null
  }
}

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p>{children}</p>,
    h2: ({children}) => <h2>{children}</h2>,
    h3: ({children}) => <h3>{children}</h3>,
    blockquote: ({children}) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({children, value}) => {
      const href = typeof value?.href === "string" ? value.href : "#"
      const external = !href.startsWith("/")
      return <a href={href} target={value?.openInNewTab ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{children}</a>
    },
  },
  types: {
    image: ({value}) => value?.asset?.url ? <figure><Image src={value.asset.url} alt={value.alt || ""} width={value.asset.metadata?.dimensions?.width || 1200} height={value.asset.metadata?.dimensions?.height || 800}/>{value.caption && <figcaption>{value.caption}</figcaption>}</figure> : null,
    youtubeVideo: ({value}) => {
      const embedUrl = getYouTubeEmbedUrl(value)
      return embedUrl ? <figure className="youtube-embed"><iframe src={embedUrl} title={typeof value?.title === "string" ? value.title : "YouTube video"} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></figure> : null
    },
    editorialCallout: ({value}) => <aside className="callout"><h2>{value?.kind || "Note"}</h2>{Array.isArray(value?.body) && <PortableText value={value.body} components={components}/>}</aside>,
  },
}

export function SanityBody({value}: SanityBodyProps) {
  if (!Array.isArray(value)) return null
  return <PortableText value={value} components={components}/>
}
