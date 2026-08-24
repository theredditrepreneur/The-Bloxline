import {getCliClient} from "sanity/cli"

type GameSeed = {
  title: string
  slug: string
  youtubeUrl: string
  gameplayDuration: string
}

const games: GameSeed[] = [
  {title: "+1 Loot Evo", slug: "plus-one-loot-evo", youtubeUrl: "https://www.youtube.com/watch?v=XJQS1jgflHo", gameplayDuration: "11 minutes"},
  {title: "Surf and Plunge", slug: "surf-and-plunge", youtubeUrl: "https://www.youtube.com/watch?v=FGQPJLvRLZI", gameplayDuration: "7 minutes"},
  {title: "Plane Race with 99 Propellers", slug: "plane-race-with-99-propellers", youtubeUrl: "https://www.youtube.com/watch?v=SyDXWUFsHIo", gameplayDuration: "20 minutes"},
  {title: "South London Remastered", slug: "south-london-remastered", youtubeUrl: "https://www.youtube.com/watch?v=EpDKW3GyP4M", gameplayDuration: "10 minutes"},
  {title: "Eat To Grow", slug: "eat-to-grow", youtubeUrl: "https://www.youtube.com/watch?v=mwhRgfFqMr4", gameplayDuration: "26 minutes"},
  {title: "Blow Up and Fall!", slug: "blow-up-and-fall", youtubeUrl: "https://www.youtube.com/watch?v=-yF8aq8Xqsw", gameplayDuration: "21 minutes"},
  {title: "Island Defenders: Bandits and Bosses", slug: "island-defenders-bandits-and-bosses", youtubeUrl: "https://www.youtube.com/watch?v=QcURpJkFVYY", gameplayDuration: "5 minutes"},
]

async function importGames() {
  const client = getCliClient({apiVersion: "2026-08-05"})
  for (const game of games) {
    const existing = await client.fetch<{_id: string} | null>("*[_type == 'game' && slug.current == $slug][0]{_id}", {slug: game.slug})
    if (existing) continue
    await client.create({_type: "game", title: game.title, slug: {_type: "slug", current: game.slug}, youtubeUrl: game.youtubeUrl, gameplayDuration: game.gameplayDuration, status: "published"})
  }
  console.log("Games imported into Sanity.")
}

importGames().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
