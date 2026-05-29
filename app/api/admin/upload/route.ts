import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'
import { isAdminAuthenticated } from '@/lib/auth'
import { randomBytes } from 'crypto'

export async function POST(req: NextRequest) {
  if (!await isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { filename, contentType } = await req.json()
    if (!filename || !contentType) {
      return NextResponse.json({ error: 'filename and contentType required' }, { status: 400 })
    }
    const ext = filename.split('.').pop() ?? ''
    const key = `${randomBytes(16).toString('hex')}.${ext}`

    const supabase = createAdminClient()
    const { data, error } = await supabase.storage
      .from('member-content')
      .createSignedUploadUrl(key)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ uploadUrl: data.signedUrl, path: key, token: data.token })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
