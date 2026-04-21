import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase-server'

function getSiteUrl(req: NextRequest) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL

  try {
    if (configuredUrl) {
      const parsed = new URL(configuredUrl)

      if (
        (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
        !parsed.hostname.endsWith('stripe.com')
      ) {
        return parsed.origin
      }
    }
  } catch {
    // Fall back to the current request origin below.
  }

  return req.nextUrl.origin
}

function getStripePriceId() {
  const priceId = process.env.STRIPE_PRICE_ID?.trim()

  if (!priceId || !priceId.startsWith('price_') || priceId.includes('...') || priceId.includes('#')) {
    throw new Error('STRIPE_PRICE_ID must be a real Stripe Price ID, for example price_123, not a payment link or placeholder.')
  }

  return priceId
}

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const priceId = getStripePriceId()
    const siteUrl = getSiteUrl(req)

    const supabase = createAdminClient()

    // Keep checkout available even if the optional CRM table has not been created yet.
    const { error: dbError } = await supabase.from('subscribers').upsert(
      { name, email, status: 'pending', is_founding_member: true },
      { onConflict: 'email', ignoreDuplicates: false }
    )
    if (dbError) console.warn('[create-checkout] subscriber upsert skipped:', dbError.message)

    // Create or retrieve Stripe customer
    const stripe = getStripe()
    const existing = await stripe.customers.list({ email, limit: 1 })
    const customer = existing.data[0] ?? await stripe.customers.create({ email, name })

    // Update subscriber with stripe_customer_id
    const { error: updateError } = await supabase
      .from('subscribers')
      .update({ stripe_customer_id: customer.id })
      .eq('email', email)
    if (updateError) console.warn('[create-checkout] subscriber customer update skipped:', updateError.message)

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}&name=${encodeURIComponent(name)}`,
      cancel_url: `${siteUrl}/#join`,
      metadata: { subscriber_email: email },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('[create-checkout]', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
