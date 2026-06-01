'use client'

import { useEffect, useState } from 'react'

const TOTAL_SPOTS = 1000

function pad(n: number) {
  return String(Math.floor(n)).padStart(2, '0')
}

export default function SignupForm({ activeCount = 0 }: { activeCount?: number }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    const target = process.env.NEXT_PUBLIC_COUNTDOWN_TARGET
    const launch = target
      ? new Date(target)
      : (() => { const d = new Date(); d.setDate(d.getDate() + 14); return d })()

    const tick = () => {
      const diff = launch.getTime() - Date.now()
      if (diff <= 0) { setTime(''); return }
      const h = pad((diff % 86400000) / 3600000)
      const m = pad((diff % 3600000) / 60000)
      const s = pad((diff % 60000) / 1000)
      setTime(`${h}:${m}:${s}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const remaining = Math.max(0, TOTAL_SPOTS - activeCount + 990)

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
        Enter your details. Lock in $9.99 forever. Become one of the first thousand.
      </p>
      <div className="reveal">
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="What should I call you?"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-input"
            placeholder="I need an email also..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        {time && (
          <div className="form-urgency">
            <span className="form-urgency-dot" />
            <span>Founding rate closes in {time} — {remaining.toLocaleString()} spots left</span>
          </div>
        )}
        <button className="form-submit" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Securing your spot…' : 'Chat with me — $9.99 →'}
        </button>
        {error && <p className="form-error">{error}</p>}
        <p className="form-note">No spam. Your email is never shared. Cancel in one tap, anytime.</p>
      </div>
    </section>
  )
}
