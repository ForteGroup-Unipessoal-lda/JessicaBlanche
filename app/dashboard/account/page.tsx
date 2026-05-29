import { createAdminClient } from '@/lib/supabase-server'
import { getSessionEmail } from '@/lib/auth'
import { getStripe } from '@/lib/stripe'
import LogoutButton from '@/components/dashboard/LogoutButton'

export default async function AccountPage() {
  const email = await getSessionEmail()
  const supabase = createAdminClient()

  const { data: sub } = await supabase
    .from('subscribers')
    .select('name, email, status, is_founding_member, stripe_customer_id, created_at')
    .eq('email', email!)
    .single()

  let portalUrl: string | null = null
  if (sub?.stripe_customer_id) {
    try {
      const stripe = getStripe()
      const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000').replace(/\/$/, '')
      const session = await stripe.billingPortal.sessions.create({
        customer: sub.stripe_customer_id,
        return_url: `${siteUrl}/dashboard/account`,
      })
      portalUrl = session.url
    } catch {
      // Stripe portal not configured — skip
    }
  }

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
        {portalUrl && (
          <a href={portalUrl} className="dash-portal-link">
            Manage subscription (cancel, billing) →
          </a>
        )}
        <LogoutButton />
      </div>
    </div>
  )
}
