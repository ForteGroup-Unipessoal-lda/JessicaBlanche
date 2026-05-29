import { createAdminClient } from '@/lib/supabase-server'
import { getSessionEmail } from '@/lib/auth'
import LogoutButton from '@/components/dashboard/LogoutButton'
import ManageSubscriptionButton from '@/components/dashboard/ManageSubscriptionButton'

export default async function AccountPage() {
  const email = await getSessionEmail()
  const supabase = createAdminClient()

  const { data: sub } = await supabase
    .from('subscribers')
    .select('name, email, status, is_founding_member, stripe_customer_id, created_at')
    .eq('email', email!)
    .single()

  return (
    <div className="dash-account">
      <h1 className="dash-page-title">Your Account</h1>

      <div className="dash-account-card">
        <div className="dash-account-row">
          <span className="dash-account-label">Name</span>
          <span className="dash-account-val">{sub?.name ?? '—'}</span>
        </div>
        <div className="dash-account-row">
          <span className="dash-account-label">Email</span>
          <span className="dash-account-val">{sub?.email}</span>
        </div>
        <div className="dash-account-row">
          <span className="dash-account-label">Status</span>
          <span className={`dash-status-badge status-${sub?.status}`}>{sub?.status ?? '—'}</span>
        </div>
        <div className="dash-account-row">
          <span className="dash-account-label">Plan</span>
          <span className="dash-account-val">
            9.99€ / month{sub?.is_founding_member ? ' · locked forever ✦' : ''}
          </span>
        </div>
        {sub?.is_founding_member && (
          <div className="dash-account-row">
            <span className="dash-account-label">Membership</span>
            <span className="founding-badge">✦ Founding Member</span>
          </div>
        )}
        <div className="dash-account-row">
          <span className="dash-account-label">Member since</span>
          <span className="dash-account-val">
            {sub?.created_at ? new Date(sub.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
          </span>
        </div>
      </div>

      <div className="dash-account-actions">
        {sub?.stripe_customer_id && <ManageSubscriptionButton />}
        <LogoutButton />
      </div>
    </div>
  )
}
