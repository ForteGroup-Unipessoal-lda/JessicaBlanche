import { createAdminClient } from '@/lib/supabase-server'

export default async function AdminSubscribers() {
  const supabase = createAdminClient()
  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('id, name, email, status, is_founding_member, created_at')
    .order('created_at', { ascending: false })
    .limit(200)

  return (
    <div className="admin-subscribers">
      <h1 className="admin-page-title">Subscribers</h1>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Type</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {subscribers?.map(s => (
              <tr key={s.id}>
                <td>{s.name ?? '—'}</td>
                <td>{s.email}</td>
                <td><span className={`admin-status-badge status-${s.status}`}>{s.status}</span></td>
                <td>{s.is_founding_member ? '✦ Founding' : 'Standard'}</td>
                <td>{new Date(s.created_at).toLocaleDateString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
