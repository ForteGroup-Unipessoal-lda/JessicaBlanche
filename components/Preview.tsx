'use client'

export default function Preview() {
  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="preview-section">
      <div className="preview-inner">
        <div className="preview-header">
          <span className="section-label reveal">A Taste of What's Inside</span>
          <h2 className="gifts-h reveal">This is what members <em>actually</em> see.</h2>
          <p className="preview-lead reveal">
            Unfiltered. Unscripted. Exclusively for the inner circle. The content below is locked — join to unlock everything.
          </p>
        </div>
        <div className="preview-grid stagger">
          <div className="preview-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/jessi%231.webp" alt="Members Only" />
            <div className="preview-lock">
              <div className="preview-lock-icon">🔒</div>
              <div className="preview-lock-txt">Members Only</div>
            </div>
            <span className="preview-card-label">Exclusive Content</span>
          </div>
          <div className="preview-card" style={{ marginTop: '44px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/jessie%232.webp" alt="Members Only" />
            <div className="preview-lock">
              <div className="preview-lock-icon">✦</div>
              <div className="preview-lock-txt">Inner Circle Only</div>
            </div>
            <span className="preview-card-label">Behind the Scenes</span>
          </div>
          <div className="preview-card" style={{ marginTop: '20px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/jessie%234.webp" alt="Members Only" />
            <div className="preview-lock">
              <div className="preview-lock-icon">🔒</div>
              <div className="preview-lock-txt">Members Only</div>
            </div>
            <span className="preview-card-label">Private Access</span>
          </div>
        </div>
        <div className="preview-cta-wrap reveal">
          <button className="btn-p" onClick={scrollToJoin}>
            Chat with me →
          </button>
          <p className="preview-cta-note">Join the first 1,000. Lock this rate forever. Cancel anytime.</p>
        </div>
      </div>
    </section>
  )
}
