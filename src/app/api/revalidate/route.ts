import {revalidatePath} from "next/cache"
import {NextResponse, type NextRequest} from "next/server"
import {parseBody} from "next-sanity/webhook"

type SanityWebhookBody = {_type?: string; slug?: string}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return NextResponse.json({message: "Revalidation is not configured"}, {status: 503})

  try {
    const {isValidSignature, body} = await parseBody<SanityWebhookBody>(request, secret, true)
    if (!isValidSignature) return NextResponse.json({message: "Invalid signature"}, {status: 401})

    revalidatePath("/")
    revalidatePath("/latest")
    revalidatePath("/search")
    revalidatePath("/sitemap.xml")
    revalidatePath("/rss.xml")

    if (body?._type === "article") {
      for (const path of ["/parents", "/industry", "/games", "/studios", "/education"]) revalidatePath(path)
      if (body.slug) revalidatePath(`/articles/${body.slug}`)
    }

    if (body?._type === "siteSettings") revalidatePath("/", "layout")
    return NextResponse.json({revalidated: true})
  } catch (error) {
    console.error("Sanity revalidation failed.", error)
    return NextResponse.json({message: "Unable to refresh the website"}, {status: 500})
  }
}
