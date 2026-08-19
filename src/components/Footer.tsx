import Image from "next/image"
import Link from "next/link"
import type {SiteSettings} from "@/lib/site"
import {SocialIcon} from "@/components/SocialIcon"

export function Footer({settings}: {settings: SiteSettings}) {
  return <footer>
    <div className="footer-grid">
      <div><Image src={settings.logos.horizontal} alt={settings.name} width={1254} height={434}/><p>Roblox community and audience services for games, studios and brands.</p><a className="footer-email" href={`mailto:${settings.commercialEmail}`}>{settings.commercialEmail}</a></div>
      <div><h2>Services</h2><Link href="/services">All Services</Link><Link href="/services/community-building">Community Building</Link><Link href="/services/adult-audience">Adult Audience Strategy</Link><Link href="/developer-network">GEEIQ Developer Network</Link><Link href="/jobs">Jobs</Link></div>
      <div><h2>Insights</h2><Link href="/latest">Latest Articles</Link><Link href="/industry">Industry</Link><Link href="/studios">Studios</Link><Link href="/games">Games</Link><Link href="/parents">Parents</Link></div>
      <div><h2>Company</h2><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/affiliates">Affiliate Partnerships</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/developer-network#affiliate-disclosure">Affiliate Disclosure</Link><Link href="/rss.xml">RSS</Link></div>
    </div>
    <div className="footer-follow"><h2>Follow</h2><div className="footer-socials">{Object.entries(settings.social).map(([name, href]) => href && <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><SocialIcon name={name}/></a>)}</div></div>
    <div className="footer-bottom"><p>{settings.disclaimer}</p><p>© {new Date().getFullYear()} {settings.name}.</p></div>
  </footer>
}
