import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
  if (!await isAdminAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { email } = await params
  const decodedEmail = decodeURIComponent(email)
  const supabase = createAdminClient()

  // Mark fan messages as read
  await supabase
    .from('messages')
    .update({ read_at: new Date().toISOString() })
    .eq('subscriber_email', decodedEmail)
    .eq('from_jessica', false)
    .is('read_at', null)

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('subscriber_email', decodedEmail)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ messages: data })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
  if (!await isAdminAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { email } = await params
  const decodedEmail = decodeURIComponent(email)
  const { body } = await req.json()
  if (!body?.trim()) return NextResponse.json({ error: 'body required' }, { status: 400 })

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('messages')
    .insert({ subscriber_email: decodedEmail, from_jessica: true, body: body.trim() })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ message: data }, { status: 201 })
}
