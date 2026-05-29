import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'
import { generateMagicToken } from '@/lib/auth'
import { sendMagicLink } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data: subscriber } = await supabase
      .from('subscribers')
      .select('id, status')
      .eq('email', email.toLowerCase().trim())
      .single()

    // Always return success to avoid leaking which emails are subscribed
    if (!subscriber || subscriber.status !== 'active') {
      return NextResponse.json({ ok: true })
    }

    const token = generateMagicToken()
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString()

    await supabase
      .from('subscribers')
      .update({ magic_link_token: token, magic_link_expires_at: expires })
      .eq('id', subscriber.id)

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin).replace(/\/$/, '')
    const magicUrl = `${siteUrl}/api/auth/verify?token=${token}`

    await sendMagicLink(email, magicUrl)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[send-magic-link]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
