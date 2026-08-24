import type {Metadata} from "next"
import {ArticleCard} from "@/components/ArticleCard"
import {GameCard} from "@/components/GameCard"
import {getByDesk} from "@/lib/articles"
import {getAllGames} from "@/lib/games"

export const metadata: Metadata = {
  title: "Games We've Played",
  description: "Browse Roblox gameplay, articles and studio information for games personally played by The Bloxline.",
  alternates: {canonical: "/games"},
  openGraph: {title: "Games We've Played | The Bloxline", description: "Roblox gameplay, articles and studio information for games personally played by The Bloxline.", url: "/games", type: "website"},
}

export default async function GamesPage() {
  const [games, articles] = await Promise.all([getAllGames(), getByDesk("Games")])
  return <>
    <header className="service-page-hero games-library-hero"><div className="container"><span className="eyebrow">The Bloxline Games</span><h1>Games We&apos;ve Played</h1><p>The Bloxline is exploring Roblox one game at a time. Browse gameplay, articles and studio information for the Roblox experiences we&apos;ve personally played.</p></div></header>
    <section className="games-library container"><div className="section-heading"><h2>Recently Played</h2></div>{games.length ? <div className="games-grid">{games.map((game) => <GameCard game={game} key={game.slug}/>)}</div> : <div className="empty"><h2>The first games are being added.</h2><p>The Bloxline only adds games it has personally played, so this library will grow carefully.</p></div>}</section>
    {articles.length > 0 && <section className="section container games-coverage"><div className="section-heading"><div><span className="eyebrow">Games coverage</span><h2>Roblox games explained</h2></div></div><div className="article-grid">{articles.map((article) => <ArticleCard article={article} key={article.slug}/>)}</div></section>}
  </>
}
