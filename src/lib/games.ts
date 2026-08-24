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
// Keep descriptions and studio details to information that has been checked.
export const games: Game[] = [
  {
    title: "+1 Loot Evo",
    slug: "plus-one-loot-evo",
    youtubeUrl: "https://www.youtube.com/watch?v=XJQS1jgflHo",
    gameplayDuration: "11 minutes",
    relatedArticleSlugs: [],
  },
  {
    title: "Surf and Plunge",
    slug: "surf-and-plunge",
    youtubeUrl: "https://www.youtube.com/watch?v=FGQPJLvRLZI",
    gameplayDuration: "7 minutes",
    relatedArticleSlugs: [],
  },
  {
    title: "Plane Race with 99 Propellers",
    slug: "plane-race-with-99-propellers",
    youtubeUrl: "https://www.youtube.com/watch?v=SyDXWUFsHIo",
    gameplayDuration: "20 minutes",
    relatedArticleSlugs: [],
  },
  {
    title: "South London Remastered",
    slug: "south-london-remastered",
    youtubeUrl: "https://www.youtube.com/watch?v=EpDKW3GyP4M",
    gameplayDuration: "10 minutes",
    relatedArticleSlugs: [],
  },
  {
    title: "Eat To Grow",
    slug: "eat-to-grow",
    youtubeUrl: "https://www.youtube.com/watch?v=mwhRgfFqMr4",
    gameplayDuration: "26 minutes",
    relatedArticleSlugs: [],
  },
  {
    title: "Blow Up and Fall!",
    slug: "blow-up-and-fall",
    youtubeUrl: "https://www.youtube.com/watch?v=-yF8aq8Xqsw",
    gameplayDuration: "21 minutes",
    relatedArticleSlugs: [],
  },
  {
    title: "Island Defenders: Bandits and Bosses",
    slug: "island-defenders-bandits-and-bosses",
    youtubeUrl: "https://www.youtube.com/watch?v=QcURpJkFVYY",
    gameplayDuration: "5 minutes",
    relatedArticleSlugs: [],
  },
]

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
