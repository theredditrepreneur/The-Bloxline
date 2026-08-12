"use client"

import Image from "next/image"
import Link from "next/link"
import {useState} from "react"

const links = [["Latest", "/latest"], ["Parents", "/parents"], ["Games", "/games"], ["Industry", "/industry"], ["Studios", "/studios"], ["For Studios", "/for-studios/community-building"], ["Jobs", "/jobs"], ["Education", "/education"], ["Start Here", "/start-here"], ["About", "/about"]]

export function Header({name, logo}: {name: string; logo: string}) {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><div className="topbar"><Link href="/" aria-label={`${name} home`}><Image src={logo} alt={name} width={1254} height={1254} priority /></Link><nav aria-label="Primary navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><div className="header-actions"><Link className="search-link" href="/search" aria-label="Search articles">Search</Link><button className="menu-button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button></div></div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/search" onClick={() => setOpen(false)}>Search</Link></nav>}</header>
}
