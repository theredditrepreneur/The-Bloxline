import Image from "next/image"
import Link from "next/link"
import type {Game} from "@/lib/games"

export function GameArtwork({game, priority = false}: {game: Game; priority?: boolean}) {
  return <div className="game-artwork">{game.coverImage ? <Image src={game.coverImage} alt={game.coverAlt || `${game.title} artwork`} fill sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 900px) 50vw, 33vw" priority={priority} /> : <span aria-hidden="true">The Bloxline<br/>Games</span>}</div>
}

export function GameCard({game}: {game: Game}) {
  return <article className="game-card"><Link href={`/games/${game.slug}`} tabIndex={-1}><GameArtwork game={game}/></Link><div className="game-card-details">{game.genre && <span className="eyebrow">{game.genre}</span>}<h3><Link href={`/games/${game.slug}`}>{game.title}</Link></h3>{game.gameplayDuration && <p className="game-duration">Gameplay: {game.gameplayDuration}</p>}{game.studio?.developer && <p>{game.studio.developer}</p>}<div className="game-card-links">{game.youtubeUrl && <a className="text-link" href={game.youtubeUrl} target="_blank" rel="noopener noreferrer">Watch Gameplay</a>}<Link className="text-link" href={`/games/${game.slug}`}>Read More</Link></div></div></article>
}
