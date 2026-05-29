'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="login-wrap">
      <p className="login-eyebrow">Jessica Blanche · Inner Circle</p>
      <h1 className="login-h">Member Login</h1>

      {state === 'sent' ? (
        <div className="login-sent">
          <p>Check your inbox — we sent a login link to <strong>{email}</strong>.</p>
          <p className="login-note">The link expires in 1 hour.</p>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <p className="login-error">
              {error === 'invalid' ? 'That link has expired or already been used.' : 'Something went wrong. Try again.'}
            </p>
          )}
          <label className="login-label" htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            className="login-input"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={state === 'loading'}
          />
          <button className="btn-p login-btn" type="submit" disabled={state === 'loading'}>
            {state === 'loading' ? 'Sending…' : 'Send me a login link'}
          </button>
          <p className="login-note">Only active members can log in. <a href="/#join" className="login-link">Not a member?</a></p>
        </form>
      )}
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="login-page">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  )
}
