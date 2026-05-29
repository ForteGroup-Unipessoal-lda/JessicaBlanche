import { createAdminClient } from '@/lib/supabase-server'

export default async function LiveSessionsPage() {
  const supabase = createAdminClient()
  const now = new Date().toISOString()
  const { data: upcoming } = await supabase
    .from('live_sessions')
    .select('*')
    .gte('scheduled_at', now)
    .order('scheduled_at', { ascending: true })

  const { data: past } = await supabase
    .from('live_sessions')
    .select('*')
    .lt('scheduled_at', now)
    .order('scheduled_at', { ascending: false })
    .limit(5)

  return (
    <div className="dash-live">
      <h1 className="dash-page-title">Live Sessions</h1>
      <p className="dash-live-sub">Intimate, never recorded, members only.</p>

      <section className="dash-live-section">
        <h2 className="dash-live-heading">Upcoming</h2>
        {!upcoming?.length ? (
          <p className="dash-empty">No sessions scheduled yet — check back soon.</p>
        ) : (
          <ul className="dash-live-list">
            {upcoming.map(s => (
              <li key={s.id} className="dash-live-card">
                <div className="dash-live-card-info">
                  <h3 className="dash-live-card-title">{s.title}</h3>
                  {s.description && <p className="dash-live-card-desc">{s.description}</p>}
                  <time className="dash-live-card-time">
                    {new Date(s.scheduled_at).toLocaleString('en-GB', {
                      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </time>
                  {s.is_founding_only && <span className="dash-founding-tag">✦ Founding Members Only</span>}
                </div>
                {s.meeting_url && (
                  <a href={s.meeting_url} target="_blank" rel="noopener noreferrer" className="btn-p dash-live-join">
                    Join →
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {!!past?.length && (
        <section className="dash-live-section">
          <h2 className="dash-live-heading">Past Sessions</h2>
          <ul className="dash-live-list">
            {past.map(s => (
              <li key={s.id} className="dash-live-card past">
                <h3 className="dash-live-card-title">{s.title}</h3>
                <time className="dash-live-card-time">
                  {new Date(s.scheduled_at).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
