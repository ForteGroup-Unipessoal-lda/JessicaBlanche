'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminReplyForm({ email }: { email: string }) {
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim() || sending) return
    setSending(true)
    try {
      await fetch(`/api/admin/messages/${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body }),
      })
      setBody('')
      router.refresh()
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="admin-reply-form" onSubmit={handleSubmit}>
      <textarea
        className="admin-textarea"
        placeholder="Write your reply…"
        value={body}
        onChange={e => setBody(e.target.value)}
        rows={4}
        disabled={sending}
      />
      <button className="admin-btn-primary" type="submit" disabled={sending || !body.trim()}>
        {sending ? 'Sending…' : 'Send Reply'}
      </button>
    </form>
  )
}
