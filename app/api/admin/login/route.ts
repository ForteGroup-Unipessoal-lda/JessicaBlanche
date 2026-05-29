import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { setAdminCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const expected = process.env.ADMIN_PASSWORD
    if (!expected) {
      return NextResponse.json({ error: 'Admin not configured.' }, { status: 500 })
    }

    let match = false
    try {
      match = timingSafeEqual(Buffer.from(password ?? ''), Buffer.from(expected))
    } catch {
      match = false
    }

    if (!match) {
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
    }

    await setAdminCookie()
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[admin-login]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
