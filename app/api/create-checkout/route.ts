import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase-server'

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

    const supabase = createAdminClient()

    // Upsert subscriber with pending status
    const { error: dbError } = await supabase.from('subscribers').upsert(
      { name, email, status: 'pending', is_founding_member: true },
      { onConflict: 'email', ignoreDuplicates: false }
    )
    if (dbError) throw new Error(dbError.message)

    // Create or retrieve Stripe customer
    const stripe = getStripe()
    const existing = await stripe.customers.list({ email, limit: 1 })
    const customer = existing.data[0] ?? await stripe.customers.create({ email, name })

    // Update subscriber with stripe_customer_id
    await supabase.from('subscribers').update({ stripe_customer_id: customer.id }).eq('email', email)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
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
