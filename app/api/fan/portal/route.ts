import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'
import { getSessionEmail } from '@/lib/auth'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const email = await getSessionEmail()
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createAdminClient()
  const { data: sub } = await supabase
    .from('subscribers')
    .select('stripe_customer_id')
    .eq('email', email)
    .single()

  if (!sub?.stripe_customer_id) {
    return NextResponse.json({ error: 'No billing account found.' }, { status: 404 })
  }

  const stripe = getStripe()
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin).replace(/\/$/, '')
  const session = await stripe.billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: `${siteUrl}/dashboard/account`,
  })

  return NextResponse.json({ url: session.url })
}
