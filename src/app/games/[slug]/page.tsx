import type {Metadata} from "next"
import Link from "next/link"
import {notFound} from "next/navigation"
import {ArticleCard} from "@/components/ArticleCard"
import {GameArtwork} from "@/components/GameCard"
import {GameVideo} from "@/components/GameVideo"
import {getAllArticles} from "@/lib/articles"
import {getAllGames, getGame, getRelatedGames} from "@/lib/games"
import {absoluteUrl, siteConfig} from "@/lib/site"

export const dynamicParams = true
export async function generateStaticParams() { return (await getAllGames()).map((game) => ({slug: game.slug})) }

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params
  const game = await getGame(slug)
  if (!game) return {}
  const description = game.description || `Gameplay, thoughts and studio information for ${game.title}, played by The Bloxline.`
  return {title: game.title, description, alternates: {canonical: `/games/${game.slug}`}, openGraph: {title: `${game.title} | The Bloxline Games`, description, url: `/games/${game.slug}`, type: "website", ...(game.coverImage ? {images: [{url: game.coverImage, alt: game.coverAlt || game.title}]} : {})}}
}

export default async function GamePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const game = await getGame(slug)
  if (!game) notFound()
  const relatedArticles = (await getAllArticles(false)).filter((article) => game.relatedArticleSlugs.includes(article.slug))
  const relatedGames = await getRelatedGames(game)
  const email = `mailto:${siteConfig.commercialEmail}?subject=${encodeURIComponent("Game Feature Enquiry")}`
  const studioLinks = game.studio?.social ? Object.entries(game.studio.social) : []
  const thoughtParagraphs = game.thoughts
    ?.split(/\r?\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean) ?? []
  const gameSchema = {"@context": "https://schema.org", "@type": "VideoGame", name: game.title, description: game.description, url: absoluteUrl(`/games/${game.slug}`), ...(game.genre ? {genre: game.genre} : {}), ...(game.releaseDate ? {datePublished: game.releaseDate} : {}), ...(game.studio?.developer ? {creator: {"@type": "Organization", name: game.studio.developer}} : {}), ...(game.coverImage ? {image: game.coverImage.startsWith("http") ? game.coverImage : absoluteUrl(game.coverImage)} : {})}
  return <>
    <header className="game-page-hero"><div className="container game-page-hero-grid"><div><span className="eyebrow">{game.genre || "Roblox game"}</span><h1>{game.title}</h1>{game.description && <p>{game.description}</p>}{game.gameplayDuration && <span className="game-duration">Gameplay: {game.gameplayDuration}</span>}{game.robloxGameUrl && <p className="game-roblox-link"><a className="button" href={game.robloxGameUrl} target="_blank" rel="noopener noreferrer">Play on Roblox</a></p>}</div><GameArtwork game={game} priority/></div></header>
    {game.youtubeUrl && <section className="game-page-section container"><div className="section-heading"><h2>Gameplay</h2></div><GameVideo game={game}/></section>}
      {thoughtParagraphs.length > 0 && <section className="game-thoughts"><div className="container agency-proof-grid"><div><span className="eyebrow">The Bloxline Thoughts</span><h2>What stood out while playing.</h2></div><div>{thoughtParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>}
    {game.studio && <section className="game-page-section container"><div className="section-heading"><h2>Studio</h2></div><dl className="game-studio-details">{game.studio.developer && <div><dt>Developer</dt><dd>{game.studio.profileSlug ? <Link href={`/studios/${game.studio.profileSlug}`}>{game.studio.developer}</Link> : game.studio.developer}</dd></div>}{game.studio.publisher && <div><dt>Publisher</dt><dd>{game.studio.publisher}</dd></div>}{game.genre && <div><dt>Genre</dt><dd>{game.genre}</dd></div>}{game.releaseStatus && <div><dt>Release</dt><dd>{game.releaseStatus}</dd></div>}{game.studio.website && <div><dt>Website</dt><dd><a href={game.studio.website} target="_blank" rel="noopener noreferrer">Visit website</a></dd></div>}{game.studio.discord && <div><dt>Discord</dt><dd><a href={game.studio.discord} target="_blank" rel="noopener noreferrer">Join Discord</a></dd></div>}{studioLinks.map(([label, href]) => <div key={label}><dt>{label}</dt><dd><a href={href} target="_blank" rel="noopener noreferrer">Visit {label}</a></dd></div>)}</dl></section>}
    {(relatedArticles.length > 0 || relatedGames.length > 0) && <section className="game-page-section container"><div className="section-heading"><h2>Related Content</h2></div>{relatedArticles.length > 0 && <div className="article-grid">{relatedArticles.map((article) => <ArticleCard article={article} key={article.slug}/>)}</div>}{relatedGames.length > 0 && <div className="game-related-links">{relatedGames.map((relatedGame) => <Link href={`/games/${relatedGame.slug}`} key={relatedGame.slug}>{relatedGame.title}</Link>)}</div>}</section>}
    <section className="game-playtest-cta"><div className="container"><span className="eyebrow">For Roblox developers</span><h2>Are you building a Roblox game?</h2><p>See your game through a player&apos;s eyes with Bloxline Playtest. Independent recorded gameplay and structured feedback for Roblox developers and studios.</p><Link className="button" href="/services/playtest">Explore Bloxline Playtest</Link></div></section>
    <section className="agency-final game-feature-cta"><div className="container"><h2>Want your Roblox game featured?</h2><p>The Bloxline is continually discovering Roblox games and documenting them through gameplay, articles and industry coverage.</p><p>If you&apos;d like us to feature your game, we&apos;d love to hear from you.</p><a className="button" href={email}>Feature My Game</a></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(gameSchema).replace(/</g, "\\u003c")}}/>
  </>
}
