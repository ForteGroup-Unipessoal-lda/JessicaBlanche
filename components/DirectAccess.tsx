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
            She reads<br /><em>every message.</em>
          </h2>
          <p className="dm-sub">
            Founding members get a direct line. Not a form. Not a team. Her.
          </p>
          <button className="btn-p" onClick={scrollToJoin}>
            Chat with me →
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
                <span className="dm-time">Today, 2:31 PM</span>
              </div>
              <div className="dm-msg dm-msg-you">
                <div className="dm-bubble dm-bubble-you dm-blur">
                  Your first message here
                </div>
                <span className="dm-read-receipt">✓✓ Seen</span>
              </div>
              <div className="dm-msg dm-msg-her">
                <div className="dm-bubble dm-bubble-her">
                  Tell me something true about yourself.
                </div>
                <span className="dm-time">Today, 2:33 PM</span>
              </div>
              <div className="dm-msg dm-msg-you">
                <div className="dm-bubble dm-bubble-you dm-blur">
                  Your reply — only members see this
                </div>
                <span className="dm-read-receipt">✓✓ Seen</span>
              </div>
              <div className="dm-msg dm-msg-her">
                <div className="dm-bubble dm-bubble-her">
                  Just dropped something for founding members only 🖤
                </div>
                <span className="dm-time">Today, 2:47 PM</span>
              </div>
              <div className="dm-msg dm-msg-you">
                <div className="dm-bubble dm-bubble-you dm-blur">
                  Your message — blurred until you join
                </div>
                <span className="dm-read-receipt">✓✓ Seen</span>
              </div>
              <div className="dm-msg dm-msg-her">
                <div className="dm-bubble dm-bubble-her dm-typing">
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                </div>
                <span className="dm-time">Typing…</span>
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
