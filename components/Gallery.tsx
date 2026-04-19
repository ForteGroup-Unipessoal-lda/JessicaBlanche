const ALL = [
  '/images/photo-01.jpg',
  '/images/Photo_mirror_night.png',
  '/images/jessica_beach.png',
  '/images/Bikini_photo.jpg',
  '/images/photo-02.jpg',
  '/images/Gym_session.png',
  '/images/jessica_night_out.png',
  '/images/IMG_8134.PNG',
  '/images/photo-03.jpg',
  '/images/IMG_8188.PNG',
  '/images/2F08D760-503E-4BFF-AAD3-86F47FB2EB0F.PNG',
]

const track1 = Array.from({ length: 18 }, (_, i) => ALL[i % ALL.length])
const track2 = Array.from({ length: 18 }, (_, i) => ALL[(i + 4) % ALL.length])

export default function Gallery() {
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
