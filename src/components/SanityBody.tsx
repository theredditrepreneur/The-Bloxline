import Image from "next/image"
import {PortableText, type PortableTextComponents} from "next-sanity"

type SanityBodyProps = {value: unknown[]}

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
    editorialCallout: ({value}) => <aside className="callout"><h2>{value?.kind || "Note"}</h2>{Array.isArray(value?.body) && <PortableText value={value.body} components={components}/>}</aside>,
  },
}

export function SanityBody({value}: SanityBodyProps) {
  if (!Array.isArray(value)) return null
  return <PortableText value={value} components={components}/>
}
