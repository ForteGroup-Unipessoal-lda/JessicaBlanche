import fs from 'fs'
import path from 'path'

// Blurred preview images used in hero/unlock — keep out of the public gallery
const PRIVATE = new Set(['jessie#1.webp', 'jessie#2.webp', 'jessie#3.webp', 'jessie#4.webp'])
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])

function getGalleryImages(): string[] {
  const dir = path.join(process.cwd(), 'public', 'images')
  try {
    return fs.readdirSync(dir)
      .filter(f =>
        IMAGE_EXTS.has(path.extname(f).toLowerCase()) &&
        !PRIVATE.has(f) &&
        !f.startsWith('nsfw')
      )
      .sort()
      .map(f => `/images/${encodeURIComponent(f)}`)
  } catch {
    return []
  }
}

const MIN_TRACK = 20

export default function Gallery() {
  const images = getGalleryImages()
  if (images.length === 0) return null

  const len = Math.max(MIN_TRACK, images.length * 2)
  const half = Math.ceil(images.length / 2)
  const track1 = Array.from({ length: len }, (_, i) => images[i % images.length])
  const track2 = Array.from({ length: len }, (_, i) => images[(i + half) % images.length])

  return (
    <div className="flow-section">
      <div className="flow-track">
        {track1.map((src, i) => (
          <div key={i} className="flow-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Jessica" />
          </div>
        ))}
      </div>
      <div className="flow-track2">
        {track2.map((src, i) => (
          <div key={i} className="flow-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Jessica" />
          </div>
        ))}
      </div>
    </div>
  )
}
