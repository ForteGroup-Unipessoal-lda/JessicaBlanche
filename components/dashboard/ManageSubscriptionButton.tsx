'use client'

import { useState } from 'react'

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/fan/portal', { method: 'POST' })
      const { url } = await res.json()
      if (url) window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  return (
    <button className="dash-portal-link" onClick={handleClick} disabled={loading}>
      {loading ? 'Opening…' : 'Manage subscription (cancel, billing) →'}
    </button>
  )
}
