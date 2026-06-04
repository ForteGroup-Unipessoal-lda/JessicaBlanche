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
        <p className="hero-tagline">She reads every message. Personally.</p>
        <div className="hero-btns">
          <button className="btn-p" onClick={scrollToJoin} style={{ pointerEvents: 'auto', fontSize: '16px', padding: '18px 52px' }}>
            Chat with me
          </button>
        </div>
        <div className="hero-dm-notify">
          <div className="hero-dm-notify-avatar" />
          <div className="hero-dm-notify-body">
            <div className="hero-dm-notify-name">Jessica Blanche</div>
            <div className="hero-dm-notify-msg">Hey, welcome. I actually check these myself 🖤</div>
          </div>
          <div className="hero-dm-notify-time">Just now</div>
        </div>
        {activeCount > 0 && (
          <p className="hero-anchor-note">↓ {activeCount} founding members already chatting with her</p>
        )}
      </div>
    </section>
  )
}
