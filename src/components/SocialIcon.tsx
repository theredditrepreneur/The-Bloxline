type IconProps = {name: string}

export function SocialIcon({name}: IconProps) {
  const common = {width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true}

  switch (name) {
    case "Instagram": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
    case "YouTube": return <svg {...common}><path d="M21 8.2a3 3 0 0 0-2.1-2.1C17 5.6 12 5.6 12 5.6s-5 0-6.9.5A3 3 0 0 0 3 8.2 31 31 0 0 0 2.6 12 31 31 0 0 0 3 15.8a3 3 0 0 0 2.1 2.1c1.9.5 6.9.5 6.9.5s5 0 6.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8Z"/><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none"/></svg>
    case "TikTok": return <svg {...common}><path d="M15 4v10.2a4.2 4.2 0 1 1-3.2-4.1"/><path d="M15 4c.8 2.3 2.2 3.6 4.5 4"/></svg>
    case "Facebook": return <svg {...common}><path d="M14 21v-8h3l.5-3H14V8.3c0-.9.3-1.8 1.9-1.8H18V3.8c-.6-.1-1.7-.3-3-.3-3 0-5 1.8-5 5.1V10H7v3h3v8"/></svg>
    case "LinkedIn": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10v7M7.5 7v.1M11 17v-7M11 13a3 3 0 0 1 6 0v4"/></svg>
    case "Email": return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
    case "Copy": return <svg {...common}><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>
    default: return null
  }
}
