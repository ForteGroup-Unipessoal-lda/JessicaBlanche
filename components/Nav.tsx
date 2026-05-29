'use client'

export default function Nav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav>
      <div className="nav-logo">
        Jessica Blanche<span>Charger</span>
      </div>
      <ul className="nav-links">
        <li><a href="#story">Her Story</a></li>
        <li><a href="#offer">The Offer</a></li>
        <li><a href="#join">Join Now</a></li>
      </ul>
      <button className="nav-cta" onClick={() => scrollTo('join')}>
        Join · $9.99
      </button>
    </nav>
  )
}
