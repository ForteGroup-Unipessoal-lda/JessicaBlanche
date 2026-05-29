import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  if (!await isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const supabase = createAdminClient()

  // Get latest message per subscriber email
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Group by subscriber_email, keep last message per thread
  const threads = new Map<string, { email: string; lastMessage: string; lastAt: string; unread: number }>()
  for (const msg of data ?? []) {
    if (!threads.has(msg.subscriber_email)) {
      threads.set(msg.subscriber_email, { email: msg.subscriber_email, lastMessage: msg.body, lastAt: msg.created_at, unread: 0 })
    }
    if (!msg.from_jessica && !msg.read_at) {
      const t = threads.get(msg.subscriber_email)!
      t.unread++
    }
  }

  return NextResponse.json({ threads: Array.from(threads.values()) })
}
