import { createAdminClient } from '@/lib/supabase-server'
import AdminReplyForm from '@/components/admin/AdminReplyForm'

export default async function AdminThread({ params }: { params: Promise<{ email: string }> }) {
  const { email } = await params
  const decodedEmail = decodeURIComponent(email)
  const supabase = createAdminClient()

  // Mark unread fan messages as read
  await supabase
    .from('messages')
    .update({ read_at: new Date().toISOString() })
    .eq('subscriber_email', decodedEmail)
    .eq('from_jessica', false)
    .is('read_at', null)

  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .eq('subscriber_email', decodedEmail)
    .order('created_at', { ascending: true })

  return (
    <div className="admin-thread-page">
      <h1 className="admin-page-title">Thread: {decodedEmail}</h1>

      <div className="admin-thread-msgs">
        {messages?.map(msg => (
          <div key={msg.id} className={`admin-thread-msg ${msg.from_jessica ? 'from-jessica' : 'from-fan'}`}>
            <div className="admin-thread-bubble">{msg.body}</div>
            <time className="admin-thread-time">
              {new Date(msg.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              {msg.from_jessica ? ' · Jessica' : ' · Fan'}
            </time>
          </div>
        ))}
      </div>

      <AdminReplyForm email={decodedEmail} />
    </div>
  )
}
