'use client'

const cards = [
  { src: '/images/jessie%231.webp', label: 'Exclusive Content' },
  { src: '/images/jessie%232.webp', label: 'Behind the Scenes' },
  { src: '/images/jessie%233.webp', label: 'Private Access' },
  { src: '/images/jessie%234.webp', label: 'Inner Circle' },
]

export default function UnlockSection() {
  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="unlock-section">
      <div className="unlock-inner">

        <div className="unlock-preview">
          <div className="unlock-preview-grid stagger">
            {cards.map((c, i) => (
              <div key={i} className="preview-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.src} alt="Members Only" />
                <div className="preview-lock">
                  <div className="preview-lock-icon">🔒</div>
                  <div className="preview-lock-txt">Members Only</div>
                </div>
                <span className="preview-card-label">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="unlock-text reveal">
          <span className="section-label">Private Access</span>
          <h2 className="unlock-h">
            She <em>actually</em><br />writes back.
          </h2>
          <p className="unlock-sub">
            Unfiltered content. Real messages. Her actual world — for the first 1,000.
          </p>

          <div className="dm-window unlock-dm">
            <div className="dm-window-header">
              <div className="dm-avatar" />
              <div className="dm-header-info">
                <div className="dm-name">Jessica Blanche</div>
                <div className="dm-status">
                  <span className="dm-dot" />Active now
                </div>
              </div>
              <span className="dm-lock-badge">🔒 Members Only</span>
            </div>
            <div className="dm-messages">
              <div className="dm-msg dm-msg-her">
                <div className="dm-bubble dm-bubble-her">
                  Hey, welcome. I actually check these myself 🖤
                </div>
                <span className="dm-time">Just now</span>
              </div>
              <div className="dm-msg dm-msg-you">
                <div className="dm-bubble dm-bubble-you dm-blur">
                  Your message here
                </div>
              </div>
              <div className="dm-msg dm-msg-her">
                <div className="dm-bubble dm-bubble-her dm-blur">
                  Her reply — only members can read this
                </div>
                <span className="dm-time">Members only</span>
              </div>
            </div>
            <div className="dm-window-footer" onClick={scrollToJoin} style={{ cursor: 'pointer' }}>
              <span className="dm-footer-txt">Join to unlock the full conversation</span>
              <span className="dm-footer-arrow">→</span>
            </div>
          </div>

          <button className="btn-p unlock-cta" onClick={scrollToJoin}>
            Chat with me →
          </button>
          <p className="unlock-note">Join the first 1,000. Lock this rate forever.</p>
        </div>

      </div>
    </section>
  )
}
