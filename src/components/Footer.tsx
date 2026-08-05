import Image from "next/image"
import Link from "next/link"
import type {SiteSettings} from "@/lib/site"

export function Footer({settings}: {settings: SiteSettings}) {
  return <footer><div className="footer-grid"><div><Image src={settings.logos.horizontal} alt={`${settings.name}, ${settings.tagline}`} width={1254} height={434}/><p>{settings.footerDescription}</p></div><div><h2>Publication</h2><Link href="/latest">Latest</Link><Link href="/start-here">Start Here</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/jobs">Jobs</Link></div><div><h2>Desks</h2>{["Parents", "Industry", "Games", "Studios", "Education"].map((desk) => <Link key={desk} href={`/${desk.toLowerCase()}`}>{desk}</Link>)}</div><div><h2>Information</h2><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/rss.xml">RSS</Link></div></div><div className="footer-bottom"><p>{settings.disclaimer}</p><p>© {new Date().getFullYear()} {settings.name}.</p></div></footer>
}
