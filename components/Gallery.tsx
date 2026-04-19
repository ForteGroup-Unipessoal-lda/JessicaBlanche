const track1 = [
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-02.jpg',
  '/images/photo-01.jpg',
  '/images/photo-02.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-02.jpg',
  '/images/photo-01.jpg',
  '/images/photo-02.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
]

const track2 = [
  '/images/photo-02.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-02.jpg',
  '/images/photo-01.jpg',
  '/images/photo-02.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-02.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-02.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-01.jpg',
  '/images/photo-02.jpg',
]

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
