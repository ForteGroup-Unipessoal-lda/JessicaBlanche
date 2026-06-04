'use client'

const TOTAL_SPOTS = 1000

export default function Offer({ activeCount }: { activeCount: number }) {
  const remaining = Math.max(0, TOTAL_SPOTS - activeCount)
  const claimed = Math.min(activeCount, TOTAL_SPOTS)
  const pct = Math.round((claimed / TOTAL_SPOTS) * 100)

  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="offer-section" id="offer">
      <div className="offer-inner">
        <span className="offer-eyebrow reveal">One Offer. One Price. Forever.</span>
        <h2 className="offer-h reveal">
          The most <em>intimate</em><br />seat in the room.
        </h2>
        <p className="offer-sub reveal">
          Jessica doesn't do tiers, upsells, or tricks. One offer, one price — and when the first thousand spots are gone, this deal closes with them.
        </p>
        <div className="offer-card reveal">
          <span className="offer-badge-top">✦ Founding Member — First 1,000 Only</span>
          <p className="offer-social-micro">47 people joined this week</p>
          <div>
            <div className="offer-future-price">Future members pay <s>$24.99+/mo</s></div>
            <div className="offer-price"><sup>$</sup>9<span style={{ fontSize: '52px' }}>.99</span></div>
            <div className="offer-price-note">per month · locked forever · cancel anytime</div>
          </div>
          <div className="offer-divider" />
          <ul className="offer-perks">
            <li><strong>Exclusive content</strong> — photos and videos never shared publicly</li>
            <li><strong>Behind-the-scenes</strong> — her real life, unfiltered and unscripted</li>
            <li><strong>24h early access</strong> — every drop before anyone else</li>
            <li><strong>Direct messages</strong> — she reads and responds. Personally.</li>
            <li><strong>Monthly live session</strong> — intimate, never recorded, members only</li>
            <li><strong>Founding gift</strong> — a personal surprise for the first 1,000</li>
          </ul>
          <button className="offer-cta" onClick={scrollToJoin}>
            Chat with me →
          </button>
          <div className="offer-trust-grid">
            <div className="offer-trust-item">
              <span className="offer-trust-icon">🔒</span>
              <div className="offer-trust-txt"><strong>Rate Locked Forever</strong>$9.99 never changes.</div>
            </div>
            <div className="offer-trust-item">
              <span className="offer-trust-icon">⚡</span>
              <div className="offer-trust-txt"><strong>Cancel Anytime</strong>One click. No questions.</div>
            </div>
            <div className="offer-trust-item">
              <span className="offer-trust-icon">🛡️</span>
              <div className="offer-trust-txt"><strong>100% Private</strong>Never sold or shared.</div>
            </div>
            <div className="offer-trust-item">
              <span className="offer-trust-icon">🎁</span>
              <div className="offer-trust-txt"><strong>Exclusive Gifts</strong>Founding members only.</div>
            </div>
          </div>
          <div className="offer-spots">
            <div className="spots-label">
              <span>Spots claimed</span>
              <span>{claimed.toLocaleString()} / {TOTAL_SPOTS.toLocaleString()}</span>
            </div>
            <div className="spots-bar">
              <div className="spots-fill" style={{ width: `${pct}%` }} />
            </div>
            <p className="spots-note">
              <strong>{remaining.toLocaleString()}</strong> founding spots remaining — once gone, the price goes up.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
