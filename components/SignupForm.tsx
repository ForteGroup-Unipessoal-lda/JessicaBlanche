'use client'

import { useState } from 'react'

export default function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      window.location.href = data.url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <section className="signup-section" id="join">
      <span className="section-label reveal">Claim Your Spot</span>
      <h2 className="signup-h reveal">Join her<br /><em>inner circle</em></h2>
      <p className="signup-sub reveal">
        Enter your details. Lock in 9.99$ forever. Become one of the first thousand — and receive gifts that will never be offered again.
      </p>
      <div className="reveal">
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Your first name"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-input"
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <button className="form-submit" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Securing your spot…' : 'Claim My Founding Spot — 9.99$ →'}
        </button>
        {error && <p className="form-error">{error}</p>}
        <p className="form-note">No spam. Your email is never shared. Cancel in one tap, anytime.</p>
      </div>
    </section>
  )
}
