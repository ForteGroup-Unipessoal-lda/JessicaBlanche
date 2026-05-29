import { createAdminClient } from '@/lib/supabase-server'
import AdminSessionForm from '@/components/admin/AdminSessionForm'
import AdminDeleteSession from '@/components/admin/AdminDeleteSession'

export default async function AdminSessions() {
  const supabase = createAdminClient()
  const { data: sessions } = await supabase
    .from('live_sessions')
    .select('*')
    .order('scheduled_at', { ascending: true })

  return (
    <div className="admin-sessions">
      <h1 className="admin-page-title">Live Sessions</h1>

      <div className="admin-sessions-content">
        <div className="admin-sessions-list">
          <h2 className="admin-section-h">Scheduled</h2>
          {!sessions?.length ? (
            <p className="admin-empty">No sessions yet.</p>
          ) : (
            <ul className="admin-session-items">
              {sessions.map(s => (
                <li key={s.id} className="admin-session-item">
                  <div className="admin-session-info">
                    <strong>{s.title}</strong>
                    <time>{new Date(s.scheduled_at).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</time>
                    {s.meeting_url && <a href={s.meeting_url} target="_blank" rel="noopener noreferrer" className="admin-session-link">{s.meeting_url}</a>}
                    {s.is_founding_only && <span className="admin-founding-tag">Founding only</span>}
                  </div>
                  <AdminDeleteSession id={s.id} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-sessions-form-wrap">
          <h2 className="admin-section-h">Schedule a Session</h2>
          <AdminSessionForm />
        </div>
      </div>
    </div>
  )
}
