const gifts = [
  { num: '01', icon: '🎁', title: 'Personal Welcome', desc: 'The first 1,000 members receive a personal message from Jessica — written by her, for you, on day one.' },
  { num: '02', icon: '📸', title: 'Exclusive Photo Set', desc: 'A private collection made only for founding members. Never sold. Never re-released. Yours to keep forever.' },
  { num: '03', icon: '🔒', title: 'Rate Locked for Life', desc: "Whatever the subscription costs in a year — you'll always pay $9.99. No exceptions, no surprises." },
  { num: '04', icon: '⚡', title: 'Priority DM Access', desc: "Your messages go to the top of her inbox. Founding members get real responses — not automation." },
  { num: '05', icon: '🎥', title: 'Founding-Only Live', desc: 'One intimate live session reserved exclusively for the first thousand — before the platform opens.' },
  { num: '06', icon: '✦', title: 'Founding Badge', desc: 'A permanent mark. Others will know you were here first — and exactly what that means.' },
]

const conditions = [
  { icon: '🔒', title: 'Rate Locked Forever', txt: "Your $9.99 never changes. Not in a year, not in five." },
  { icon: '⚡', title: 'Cancel Anytime', txt: 'One click. No questions. You stay because you want to.' },
  { icon: '🛡️', title: '100% Private', txt: 'Your data stays yours. Never sold, never shared.' },
  { icon: '🎁', title: 'Exclusive Gifts', txt: 'Offers and surprises only founding members ever receive.' },
]

export default function Gifts() {
  return (
    <>
      <div id="perks" />
      <section className="gifts-section">
        <div className="gifts-inner">
          <div className="gifts-header">
            <span className="section-label reveal">For the First Thousand</span>
            <h2 className="gifts-h reveal">Gifts that don't<br />go to <em>everyone.</em></h2>
          </div>
          <div className="gifts-grid stagger">
            {gifts.map(g => (
              <div key={g.num} className="gift-card">
                <span className="gift-num">{g.num}</span>
                <div className="gift-icon">{g.icon}</div>
                <h3 className="gift-title">{g.title}</h3>
                <p className="gift-desc">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="conditions">
        <div className="cond-inner stagger">
          {conditions.map(c => (
            <div key={c.title} className="cond-item">
              <span className="cond-icon">{c.icon}</span>
              <h4 className="cond-title">{c.title}</h4>
              <p className="cond-txt">{c.txt}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="photo-band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="pb-img pbi1 reveal"><img src="/images/Gym_session.png" alt="Jessica" /></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="pb-img pbi2 reveal" style={{ transitionDelay: '.12s' }}><img src="/images/Bikini_photo.jpg" alt="Jessica" /></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="pb-img pbi3 reveal" style={{ transitionDelay: '.24s' }}><img src="/images/IMG_8188.PNG" alt="Jessica" /></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="pb-img pbi4 reveal" style={{ transitionDelay: '.36s' }}><img src="/images/IMG_8134.PNG" alt="Jessica" /></div>
      </div>
    </>
  )
}
