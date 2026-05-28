'use client'

export default function DirectAccess() {
  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="dm-section">
      <div className="dm-inner">

        <div className="dm-text reveal">
          <span className="section-label">Private Access</span>
          <h2 className="dm-h">
            She <em>actually</em><br />writes back.
          </h2>
          <p className="dm-sub">
            Every founding member gets direct access. Real messages. Real responses. Not a team — her.
          </p>
          <button className="btn-p" onClick={scrollToJoin}>
            Get Private Access →
          </button>
        </div>

        <div className="dm-mockup reveal">
          <div className="dm-glow" />
          <div className="dm-window">
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

            <div className="dm-window-footer" onClick={scrollToJoin}>
              <span className="dm-footer-txt">Join to unlock the full conversation</span>
              <span className="dm-footer-arrow">→</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
