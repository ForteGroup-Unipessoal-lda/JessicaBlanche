import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase-server'

export default async function AdminMessages() {
  const supabase = createAdminClient()
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  // Group by email
  const threadMap = new Map<string, { email: string; lastBody: string; lastAt: string; unread: number }>()
  for (const msg of messages ?? []) {
    const existing = threadMap.get(msg.subscriber_email)
    if (!existing) {
      threadMap.set(msg.subscriber_email, {
        email: msg.subscriber_email,
        lastBody: msg.body,
        lastAt: msg.created_at,
        unread: 0,
      })
    }
    if (!msg.from_jessica && !msg.read_at) {
      threadMap.get(msg.subscriber_email)!.unread++
    }
  }
  const threads = Array.from(threadMap.values()).sort((a, b) =>
    new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime()
  )

  return (
    <div className="admin-messages">
      <h1 className="admin-page-title">Messages</h1>
      {!threads.length ? (
        <p className="admin-empty">No messages yet.</p>
      ) : (
        <ul className="admin-thread-list">
          {threads.map(t => (
            <li key={t.email}>
              <Link href={`/admin/dashboard/messages/${encodeURIComponent(t.email)}`} className="admin-thread-item">
                <div className="admin-thread-info">
                  <span className="admin-thread-email">{t.email}</span>
                  <span className="admin-thread-preview">{t.lastBody.slice(0, 80)}</span>
                </div>
                <div className="admin-thread-meta">
                  <time>{new Date(t.lastAt).toLocaleDateString('en-GB')}</time>
                  {t.unread > 0 && <span className="admin-unread-badge">{t.unread}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
