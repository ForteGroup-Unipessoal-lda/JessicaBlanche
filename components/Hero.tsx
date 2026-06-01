'use client'

const privateImages = [
  '/images/jessie%231.webp',
  '/images/jessie%232.webp',
  '/images/jessie%233.webp',
  '/images/jessie%234.webp',
]

export default function Hero({ activeCount = 0 }: { activeCount?: number }) {
  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="hero-blur-grid">
        {privateImages.map((src, i) => (
          <div key={i} className="hero-blur-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Private content" />
            <div className="hero-blur-lock">🔒</div>
          </div>
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge-row">
          <span className="hero-live-dot" />
          <span className="hero-badge-txt">First 1,000 · Founding Rate</span>
        </div>
        <h1 className="hero-name">
          Jessica<br /><em>Blanche</em>
        </h1>
        <p className="hero-tagline">Private access. Real conversations. $9.99/mo.</p>
        <div className="hero-btns">
          <button className="btn-p" onClick={scrollToJoin} style={{ pointerEvents: 'auto', fontSize: '16px', padding: '18px 52px' }}>
            Chat with me
          </button>
        </div>
        {activeCount > 0 && (
          <p className="hero-anchor-note">↓ {activeCount} founding spots claimed</p>
        )}
      </div>
    </section>
  )
}
