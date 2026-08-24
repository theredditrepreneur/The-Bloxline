export type GameStudio = {
  developer?: string
  publisher?: string
  website?: string
  discord?: string
  social?: Record<string, string>
  profileSlug?: string
}

export type Game = {
  title: string
  slug: string
  description?: string
  thoughts?: string
  genre?: string
  coverImage?: string
  coverAlt?: string
  youtubeUrl?: string
  gameplayDuration?: string
  gameplayUploadedAt?: string
  studio?: GameStudio
  releaseStatus?: string
  releaseDate?: string
  relatedArticleSlugs: string[]
  relatedGameSlugs?: string[]
}

// Add personally played games here. Use images in /public/games where possible.
// Do not add a game until its details and gameplay link are ready to publish.
export const games: Game[] = []

export function getAllGames() { return games }
export function getGame(slug: string) { return games.find((game) => game.slug === slug) }
export function getGamesForArticle(articleSlug: string) { return games.filter((game) => game.relatedArticleSlugs.includes(articleSlug)) }
export function getRelatedGames(game: Game) { return games.filter((candidate) => candidate.slug !== game.slug && (game.relatedGameSlugs?.includes(candidate.slug) || candidate.studio?.profileSlug && candidate.studio.profileSlug === game.studio?.profileSlug)).slice(0, 3) }

export function getYouTubeEmbedUrl(url?: string) {
  if (!url) return undefined
  try {
    const parsed = new URL(url)
    const id = parsed.hostname.includes("youtu.be") ? parsed.pathname.slice(1) : parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop()
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : undefined
  } catch {
    return undefined
  }
}
