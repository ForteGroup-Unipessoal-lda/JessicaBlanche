import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  if (!await isAdminAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('live_sessions')
    .select('*')
    .order('scheduled_at', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ sessions: data })

  
}

export async function POST(req: NextRequest) {
  if (!await isAdminAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { title, scheduled_at, description, meeting_url, is_founding_only } = await req.json()
  if (!title || !scheduled_at) return NextResponse.json({ error: 'title and scheduled_at required' }, { status: 400 })
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('live_sessions')
    .insert({ title, scheduled_at, description, meeting_url, is_founding_only: is_founding_only ?? true })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ session: data }, { status: 201 })
}
