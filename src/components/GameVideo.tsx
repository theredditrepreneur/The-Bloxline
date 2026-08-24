import {getYouTubeEmbedUrl, type Game} from "@/lib/games"

export function GameVideo({game, compact = false}: {game: Game; compact?: boolean}) {
  const embedUrl = getYouTubeEmbedUrl(game.youtubeUrl)
  if (!embedUrl || !game.youtubeUrl) return null
  return <section className={`game-video ${compact ? "game-video-compact" : ""}`}><div className="game-video-frame"><iframe src={embedUrl} title={`${game.title} gameplay`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div className="game-video-meta">{game.gameplayDuration && <span>Gameplay: {game.gameplayDuration}</span>}{game.gameplayUploadedAt && <time dateTime={game.gameplayUploadedAt}>Uploaded {new Intl.DateTimeFormat("en-GB", {dateStyle: "long"}).format(new Date(game.gameplayUploadedAt))}</time>}<a className="text-link" href={game.youtubeUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube</a></div></section>
}
