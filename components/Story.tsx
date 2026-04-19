export default function Story() {
  return (
    <section className="story" id="story">
      <div className="story-imgs reveal">
        <div className="story-img-main">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/jessica_beach.png" alt="Jessica" />
        </div>
        <div className="story-img-sub">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/Photo_mirror_night.png" alt="Jessica" />
        </div>
        <div className="story-badge">27 · Model · Creator</div>
      </div>
      <div className="story-text">
        <span className="section-label reveal">Her Story</span>
        <h2 className="story-h reveal">
          She built everything.<br />Now she's <em>letting you in.</em>
        </h2>
        <div className="story-bio reveal">
          <p>
            At 27, Jessica had already built a life most people only scroll past. Ferraris at the marina.
            Penthouses above the skyline. She was <strong>addicted to work</strong> — and she was exceptional at it.
          </p>
          <p>
            But somewhere between the hustle and the highlight reel, she found something more rare than ambition:{' '}
            <strong>the ability to slow down.</strong> To choose who deserves a seat at the table. To create real
            connection in a world obsessed with performance.
          </p>
          <p>
            <em>"Life wasn't always easy — but learning to let others in sometimes changed everything."</em> This
            isn't content. It's her actual world — the one she keeps private.{' '}
            <strong>The one she's opening only for the first thousand.</strong>
          </p>
        </div>
        <div className="story-stats stagger">
          <div className="stat-item">
            <span className="stat-n">1K</span>
            <span className="stat-l">Spots Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-n">24h</span>
            <span className="stat-l">Early Access</span>
          </div>
          <div className="stat-item">
            <span className="stat-n">∞</span>
            <span className="stat-l">Locked Rate</span>
          </div>
        </div>
      </div>
    </section>
  )
}
