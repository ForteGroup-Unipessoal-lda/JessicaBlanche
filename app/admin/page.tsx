'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        const { error: msg } = await res.json()
        setError(msg ?? 'Incorrect password.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-wrap">
        <p className="admin-login-eyebrow">Jessica Blanche</p>
        <h1 className="admin-login-h">Admin Access</h1>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          {error && <p className="admin-login-error">{error}</p>}
          <label className="admin-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="admin-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
            autoFocus
          />
          <button className="admin-btn-primary" type="submit" disabled={loading}>
            {loading ? 'Checking…' : 'Enter'}
          </button>
        </form>
      </div>
    </main>
  )
}
