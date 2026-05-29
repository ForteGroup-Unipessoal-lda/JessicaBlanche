'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminSessionForm() {
  const [title, setTitle] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [description, setDescription] = useState('')
  const [meetingUrl, setMeetingUrl] = useState('')
  const [foundingOnly, setFoundingOnly] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !scheduledAt) return
    setSaving(true)
    try {
      await fetch('/api/admin/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, scheduled_at: new Date(scheduledAt).toISOString(), description, meeting_url: meetingUrl, is_founding_only: foundingOnly }),
      })
      setTitle(''); setScheduledAt(''); setDescription(''); setMeetingUrl('')
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form-group">
        <label className="admin-label">Title *</label>
        <input className="admin-input" value={title} onChange={e => setTitle(e.target.value)} required disabled={saving} />
      </div>
      <div className="admin-form-group">
        <label className="admin-label">Date & Time *</label>
        <input type="datetime-local" className="admin-input" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} required disabled={saving} />
      </div>
      <div className="admin-form-group">
        <label className="admin-label">Description</label>
        <textarea className="admin-textarea" value={description} onChange={e => setDescription(e.target.value)} rows={3} disabled={saving} />
      </div>
      <div className="admin-form-group">
        <label className="admin-label">Meeting / Stream URL</label>
        <input type="url" className="admin-input" value={meetingUrl} onChange={e => setMeetingUrl(e.target.value)} placeholder="https://zoom.us/j/..." disabled={saving} />
      </div>
      <div className="admin-form-group admin-form-check">
        <label className="admin-check-label">
          <input type="checkbox" checked={foundingOnly} onChange={e => setFoundingOnly(e.target.checked)} disabled={saving} />
          Founding members only
        </label>
      </div>
      <button className="admin-btn-primary" type="submit" disabled={saving}>
        {saving ? 'Saving…' : 'Schedule Session'}
      </button>
    </form>
  )
}
