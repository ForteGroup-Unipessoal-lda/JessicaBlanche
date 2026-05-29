import { NextRequest, NextResponse } from 'next/server'
import { getSessionEmailFromHeader, getAdminTokenFromHeader } from '@/lib/auth'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const cookieHeader = req.headers.get('cookie')

  if (pathname.startsWith('/dashboard')) {
    const email = getSessionEmailFromHeader(cookieHeader)
    if (!email) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname.startsWith('/admin/dashboard')) {
    const ok = getAdminTokenFromHeader(cookieHeader)
    if (!ok) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/dashboard/:path*'],
}
