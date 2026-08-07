import Image from "next/image"
import Link from "next/link"
import type {SiteSettings} from "@/lib/site"
import {SocialIcon} from "@/components/SocialIcon"

export function Footer({settings}: {settings: SiteSettings}) {
  return <footer>
    <div className="footer-grid">
      <div><Image src={settings.logos.horizontal} alt={`${settings.name}, ${settings.tagline}`} width={1254} height={434}/><p>{settings.footerDescription}</p></div>
      <div><h2>Publication</h2><Link href="/latest">Latest</Link><Link href="/start-here">Start Here</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
      <div><h2>Desks</h2>{["Parents", "Games", "Industry", "Studios", "Jobs", "Education"].map((desk) => <Link key={desk} href={`/${desk.toLowerCase()}`}>{desk}</Link>)}</div>
      <div>
        <h2>Information</h2><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/rss.xml">RSS</Link>
      </div>
    </div>
    <div className="footer-follow"><h2>Follow</h2><div className="footer-socials">{Object.entries(settings.social).map(([name, href]) => href && <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><SocialIcon name={name}/></a>)}</div></div>
    <div className="footer-bottom"><p>{settings.disclaimer}</p><p>© {new Date().getFullYear()} {settings.name}.</p></div>
  </footer>
}
