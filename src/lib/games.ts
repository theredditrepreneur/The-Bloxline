import {sanityClient} from "@/sanity/client"
import {allGamesQuery} from "@/sanity/queries"

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
  robloxGameUrl?: string
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
const localGames: Game[] = [
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

function mapSanityGame(document: Record<string, unknown>): Game | null {
  const cover = document.coverImage as {alt?: string; asset?: {url?: string}} | undefined
  const title = typeof document.title === "string" ? document.title : undefined
  const slug = typeof document.slug === "string" && document.slug ? document.slug : title?.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  if (!title || !slug || typeof document.youtubeUrl !== "string" || !document.youtubeUrl) return null
  const developer = typeof document.developer === "string" ? document.developer : undefined
  const publisher = typeof document.publisher === "string" ? document.publisher : undefined
  const website = typeof document.studioWebsite === "string" ? document.studioWebsite : undefined
  const discord = typeof document.studioDiscord === "string" ? document.studioDiscord : undefined
  return {
    title,
    slug,
    description: typeof document.description === "string" ? document.description : undefined,
    thoughts: typeof document.thoughts === "string" ? document.thoughts : undefined,
    genre: typeof document.genre === "string" ? document.genre : undefined,
    coverImage: cover?.asset?.url,
    coverAlt: cover?.alt,
    youtubeUrl: typeof document.youtubeUrl === "string" ? document.youtubeUrl : undefined,
    robloxGameUrl: typeof document.robloxGameUrl === "string" ? document.robloxGameUrl : undefined,
    gameplayDuration: typeof document.gameplayDuration === "string" ? document.gameplayDuration : undefined,
    gameplayUploadedAt: typeof document.gameplayUploadedAt === "string" ? document.gameplayUploadedAt : undefined,
    studio: developer || publisher || website || discord ? {developer, publisher, website, discord} : undefined,
    releaseStatus: typeof document.releaseStatus === "string" ? document.releaseStatus : undefined,
    releaseDate: typeof document.releaseDate === "string" ? document.releaseDate : undefined,
    relatedArticleSlugs: Array.isArray(document.relatedArticleSlugs) ? document.relatedArticleSlugs.filter((value): value is string => typeof value === "string") : [],
    relatedGameSlugs: Array.isArray(document.relatedGameSlugs) ? document.relatedGameSlugs.filter((value): value is string => typeof value === "string") : [],
  }
}

export async function getAllGames(): Promise<Game[]> {
  try {
    // Games should appear promptly after publishing. The direct API avoids the
    // extra propagation delay of the Sanity CDN while a short cache keeps pages fast.
    const documents = await sanityClient.withConfig({useCdn: false}).fetch<unknown[]>(allGamesQuery, {}, {next: {revalidate: 30, tags: ["games"]}})
    const studioGames = documents.map((document) => mapSanityGame(document as Record<string, unknown>)).filter((game): game is Game => game !== null)
    const gamesBySlug = new Map(localGames.map((game) => [game.slug, game]))
    studioGames.forEach((game) => gamesBySlug.set(game.slug, game))
    return [...studioGames, ...localGames.filter((game) => !studioGames.some((studioGame) => studioGame.slug === game.slug))]
  } catch (error) {
    console.error("Unable to load Games from Sanity. Using local games.", error)
    return localGames
  }
}

export async function getGame(slug: string) { return (await getAllGames()).find((game) => game.slug === slug) }
export async function getGamesForArticle(articleSlug: string) { return (await getAllGames()).filter((game) => game.relatedArticleSlugs.includes(articleSlug)) }
export async function getRelatedGames(game: Game) { return (await getAllGames()).filter((candidate) => candidate.slug !== game.slug && (game.relatedGameSlugs?.includes(candidate.slug) || candidate.studio?.profileSlug && candidate.studio.profileSlug === game.studio?.profileSlug)).slice(0, 3) }

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
