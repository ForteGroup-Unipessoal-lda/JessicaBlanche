import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'
import { setSessionCookie } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  const next = req.nextUrl.searchParams.get('next') ?? '/dashboard'

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=missing', req.url))
  }

  const supabase = createAdminClient()
  const { data: subscriber } = await supabase
    .from('subscribers')
    .select('id, email, status, magic_link_token, magic_link_expires_at')
    .eq('magic_link_token', token)
    .single()

  if (
    !subscriber ||
    subscriber.status !== 'active' ||
    !subscriber.magic_link_expires_at ||
    new Date(subscriber.magic_link_expires_at) < new Date()
  ) {
    return NextResponse.redirect(new URL('/login?error=invalid', req.url))
  }

  // Consume the token
  await supabase
    .from('subscribers')
    .update({ magic_link_token: null, magic_link_expires_at: null })
    .eq('id', subscriber.id)

  await setSessionCookie(subscriber.email)

  return NextResponse.redirect(new URL(next.startsWith('/') ? next : '/dashboard', req.url))
}
