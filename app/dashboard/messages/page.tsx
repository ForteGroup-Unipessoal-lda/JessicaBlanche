'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  id: string
  from_jessica: boolean
  body: string
  created_at: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  async function load() {
    const res = await fetch('/api/fan/messages')
    if (res.ok) {
      const { messages } = await res.json()
      setMessages(messages)
    }
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim() || sending) return
    setSending(true)
    try {
      const res = await fetch('/api/fan/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body }),
      })
      if (res.ok) {
        setBody('')
        await load()
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="dash-messages">
      <h1 className="dash-page-title">Direct Messages</h1>
      <p className="dash-messages-sub">She reads and responds personally. This is your private thread.</p>

      <div className="dm-thread">
        {messages.length === 0 && (
          <p className="dm-empty">Start the conversation — send your first message below.</p>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`dm-thread-msg ${msg.from_jessica ? 'from-jessica' : 'from-fan'}`}>
            <div className="dm-thread-bubble">{msg.body}</div>
            <time className="dm-thread-time">
              {new Date(msg.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </time>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form className="dm-send-form" onSubmit={handleSend}>
        <textarea
          className="dm-send-input"
          placeholder="Write a message…"
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={3}
          disabled={sending}
        />
        <button className="btn-p dm-send-btn" type="submit" disabled={sending || !body.trim()}>
          {sending ? 'Sending…' : 'Send'}
        </button>
      </form>
    </div>
  )
}
