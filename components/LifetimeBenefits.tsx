'use client'

export default function LifetimeBenefits() {
  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="lifetime-section">
      <div className="lifetime-inner">
        <span className="section-label reveal">Founding Rate</span>
        <h2 className="lifetime-h reveal">
          You lock in <em>$9.99</em> today.<br />
          The price goes up when we hit 1,000.
        </h2>

        <div className="lifetime-cards reveal">
          <div className="lf-card lf-card-founding">
            <span className="lf-card-label">Founding Member</span>
            <div className="lf-card-price">$9.99<span className="lf-card-per">/mo</span></div>
            <div className="lf-card-note">Locked forever · never changes</div>
          </div>
          <div className="lf-card lf-card-future">
            <span className="lf-card-label">Future Members</span>
            <div className="lf-card-price">$24.99<span className="lf-card-per">/mo</span></div>
            <div className="lf-card-note">After founding round closes</div>
          </div>
        </div>

        <p className="lf-savings reveal">
          You save <strong>$180 every year</strong> the price stays locked.<br />
          That&apos;s every year. Forever.
        </p>

        <div className="lf-timeline reveal">
          <div className="lf-tl-item">
            <div className="lf-tl-year">Year 1</div>
            <div className="lf-tl-save">$180</div>
            <div className="lf-tl-save-note">saved</div>
          </div>
          <div className="lf-tl-sep" />
          <div className="lf-tl-item">
            <div className="lf-tl-year">Year 2</div>
            <div className="lf-tl-save">$360</div>
            <div className="lf-tl-save-note">saved</div>
          </div>
          <div className="lf-tl-sep" />
          <div className="lf-tl-item">
            <div className="lf-tl-year">Year 5</div>
            <div className="lf-tl-save">$900</div>
            <div className="lf-tl-save-note">saved</div>
          </div>
          <div className="lf-tl-sep" />
          <div className="lf-tl-item">
            <div className="lf-tl-year">Forever</div>
            <div className="lf-tl-save">∞</div>
            <div className="lf-tl-save-note">locked</div>
          </div>
        </div>

        <button className="btn-p reveal" onClick={scrollToJoin} style={{ fontSize: '15px', padding: '18px 48px' }}>
          Lock in $9.99 now →
        </button>
      </div>
    </section>
  )
}
