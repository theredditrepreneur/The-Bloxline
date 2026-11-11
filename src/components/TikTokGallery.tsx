import TikTokEmbed from "@/components/TikTokEmbed"

export type TikTokGalleryVideo = {
  id: string
  videoUrl: string
  title?: string
  creator?: string
}

export default function TikTokGallery({videos}: {videos: TikTokGalleryVideo[]}) {
  return <div className="tiktok-gallery">{videos.map((video) => <TikTokEmbed key={video.id} {...video} />)}</div>
}
