import type {Metadata} from "next"

export const metadata: Metadata = {title: "Privacy", description: "The Bloxline privacy notice.", alternates: {canonical: "/privacy"}}

export default function PrivacyPage() {
  return <article className="legal"><span className="eyebrow">Legal template</span><h1>Privacy</h1><p><strong>Last reviewed:</strong> 17 August 2026. This initial notice requires legal review.</p><h2>Information we collect</h2><p>The website does not intentionally store newsletter email addresses unless a newsletter provider is configured. Standard hosting logs may record technical information such as IP address, device type and requested pages for security and reliability.</p><h2>External and affiliate links</h2><p>The Bloxline uses clearly disclosed affiliate links. When you follow one of these links, the destination website may receive a referral identifier and process information under its own privacy notice. The Bloxline does not control how an external website handles information you submit there.</p><h2>Cookies and analytics</h2><p>No invasive analytics or advertising trackers are enabled by default. This notice will be updated before any new tracking service is introduced.</p><h2>Contact</h2><p>Questions about privacy may be sent to thebloxline@gmail.com.</p></article>
}
