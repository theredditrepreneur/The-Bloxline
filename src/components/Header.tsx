"use client"

import Image from "next/image"
import Link from "next/link"
import {useState} from "react"

const links = [["Services", "/services"], ["Jobs", "/jobs"], ["Insights", "/latest"], ["About", "/about"]]

export function Header({name, logo, email}: {name: string; logo: string; email: string}) {
  const [open, setOpen] = useState(false)
  const contactLink = `mailto:${email}?subject=${encodeURIComponent("Bloxline Enquiry")}`
  return <header className="site-header"><div className="topbar"><Link href="/" aria-label={`${name} home`}><Image src={logo} alt={name} width={1254} height={1254} priority /></Link><nav aria-label="Primary navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><div className="header-actions"><Link className="search-link" href="/search" aria-label="Search insights">Search</Link><a className="header-cta" href={contactLink}>Talk To Us</a><button className="menu-button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button></div></div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/search" onClick={() => setOpen(false)}>Search</Link><a href={contactLink} onClick={() => setOpen(false)}>Talk To Us</a></nav>}</header>
}
