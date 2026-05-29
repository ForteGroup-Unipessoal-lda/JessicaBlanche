import { createAdminClient } from '@/lib/supabase-server'

export default async function AdminOverview() {
  const supabase = createAdminClient()

  const [
    { count: totalActive },
    { count: totalPending },
    { count: totalCanceled },
    { count: totalPosts },
    { count: unreadMessages },
  ] = await Promise.all([
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).eq('status', 'canceled'),
    supabase.from('content_posts').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }).eq('from_jessica', false).is('read_at', null),
  ])

  const stats = [
    { label: 'Active Members', value: totalActive ?? 0, accent: true },
    { label: 'Pending Checkout', value: totalPending ?? 0 },
    { label: 'Canceled', value: totalCanceled ?? 0 },
    { label: 'Content Posts', value: totalPosts ?? 0 },
    { label: 'Unread Messages', value: unreadMessages ?? 0, highlight: (unreadMessages ?? 0) > 0 },
  ]

  return (
    <div className="admin-overview">
      <h1 className="admin-page-title">Overview</h1>
      <div className="admin-stats-grid">
        {stats.map(s => (
          <div key={s.label} className={`admin-stat-card${s.accent ? ' accent' : ''}${s.highlight ? ' highlight' : ''}`}>
            <div className="admin-stat-val">{s.value.toLocaleString()}</div>
            <div className="admin-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="admin-overview-note">
        Founding member target: 1,000 · {((totalActive ?? 0) / 1000 * 100).toFixed(1)}% claimed
      </p>
      <div className="admin-progress-bar">
        <div className="admin-progress-fill" style={{ width: `${Math.min((totalActive ?? 0) / 1000 * 100, 100)}%` }} />
      </div>
    </div>
  )
}
