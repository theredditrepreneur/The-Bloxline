import Link from "next/link"

export const geeiqReferralUrl = "https://geeiq.com/developers?ref=mmu0ztc"

const benefits = [
  "See where your audience stands out across age, gender and geography",
  "Become visible to GEEIQ brand clients looking for games to work with",
  "Receive direct interest from brands without GEEIQ taking commission on deals",
  "Access Network Rewards from products and tools across user generated gaming",
]

export function GeeiqReferral({featured = false}: {featured?: boolean}) {
  if (featured) return <section className="geeiq-feature">
    <div className="container">
      <div className="geeiq-feature-intro"><span className="eyebrow">Developer Opportunity</span><h2>Help your Roblox game stand out to brands.</h2><p>The GEEIQ Integration Network gives accepted Roblox and Fortnite developers audience insights, visibility to brand clients, direct brand contact and access to a growing rewards programme. It is free to apply.</p></div>
      <div className="geeiq-benefits">{benefits.map((benefit) => <div key={benefit}>{benefit}</div>)}</div>
      <div className="geeiq-actions"><a className="button" href={geeiqReferralUrl} target="_blank" rel="sponsored nofollow noopener noreferrer">Apply To The GEEIQ Integration Network</a><Link className="text-link" href="/developer-network">Learn how the network works</Link></div>
      <p className="affiliate-note"><strong>Affiliate disclosure:</strong> The Bloxline may receive a referral payment if an accepted developer joins through this link. This does not change the cost to the developer.</p>
    </div>
  </section>

  return <aside className="geeiq-sitewide" aria-label="GEEIQ Integration Network developer opportunity"><div className="container"><div><span className="eyebrow">For Roblox And Fortnite Developers</span><h2>Understand your audience and become more visible to brands.</h2><p>Apply to join the free GEEIQ Integration Network.</p></div><div><a className="button" href={geeiqReferralUrl} target="_blank" rel="sponsored nofollow noopener noreferrer">Apply Through The Bloxline</a><p className="affiliate-note">Affiliate link. The Bloxline may receive a referral payment if an accepted developer joins.</p></div></div></aside>
}
