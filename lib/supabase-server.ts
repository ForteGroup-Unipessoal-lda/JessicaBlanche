import { createClient } from '@supabase/supabase-js'

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not configured.')

  return url.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')
}

export function createAdminClient() {
  return createClient(
    getSupabaseUrl(),
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function getActiveSubscriberCount(): Promise<number> {
  try {
    const supabase = createAdminClient()
    const { count } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
    return count ?? 0
  } catch {
    return 0
  }
}
