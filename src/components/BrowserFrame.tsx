import Image from "next/image"

type BrowserFrameProps = {
  src: string
  alt: string
  priority?: boolean
  className?: string
}

export function BrowserFrame({src, alt, priority = false, className = ""}: BrowserFrameProps) {
  return <figure className={`browser-frame ${className}`.trim()}>
    <div className="browser-frame-bar" aria-hidden="true">
      <span/><span/><span/>
      <div>reddit.com/r/MMARiseToChampion</div>
    </div>
    <div className="browser-frame-image">
      <Image src={src} alt={alt} width={1464} height={1008} sizes="(max-width: 1180px) 100vw, 1132px" priority={priority}/>
    </div>
  </figure>
}
