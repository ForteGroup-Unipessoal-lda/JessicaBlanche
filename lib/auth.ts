import { createHmac, randomBytes, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

const SESSION_COOKIE = 'jb_session'
const ADMIN_COOKIE = 'jb_admin'
const SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
const ADMIN_MAX_AGE = 60 * 60 * 8 // 8 hours

function getSecret(): string {
  const s = process.env.SESSION_SECRET
  if (!s) throw new Error('SESSION_SECRET env var is not set')
  return s
}

function sign(payload: string): string {
  const hmac = createHmac('sha256', getSecret())
  hmac.update(payload)
  const sig = hmac.digest('hex')
  return `${payload}.${sig}`
}

function verify(signed: string): string | null {
  const dot = signed.lastIndexOf('.')
  if (dot === -1) return null
  const payload = signed.slice(0, dot)
  const expected = sign(payload)
  try {
    if (!timingSafeEqual(Buffer.from(signed), Buffer.from(expected))) return null
  } catch {
    return null
  }
  return payload
}

export function generateMagicToken(): string {
  return randomBytes(32).toString('hex')
}

// Fan session

interface SessionPayload {
  email: string
  exp: number
}

function encodeSession(email: string): string {
  const payload = JSON.stringify({ email, exp: Date.now() + SESSION_MAX_AGE * 1000 })
  return sign(Buffer.from(payload).toString('base64url'))
}

function decodeSession(token: string): SessionPayload | null {
  const raw = verify(token)
  if (!raw) return null
  try {
    const data = JSON.parse(Buffer.from(raw, 'base64url').toString('utf-8')) as SessionPayload
    if (data.exp < Date.now()) return null
    return data
  } catch {
    return null
  }
}

export async function setSessionCookie(email: string) {
  const jar = await cookies()
  jar.set(SESSION_COOKIE, encodeSession(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
}

export async function clearSessionCookie() {
  const jar = await cookies()
  jar.delete(SESSION_COOKIE)
}

export async function getSessionEmail(): Promise<string | null> {
  const jar = await cookies()
  const val = jar.get(SESSION_COOKIE)?.value
  if (!val) return null
  return decodeSession(val)?.email ?? null
}

export function getSessionEmailFromHeader(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`))
  if (!match) return null
  return decodeSession(match[1])?.email ?? null
}

// Admin session

export function encodeAdminToken(): string {
  const payload = String(Date.now() + ADMIN_MAX_AGE * 1000)
  return sign(payload)
}

export function verifyAdminToken(token: string): boolean {
  const raw = verify(token)
  if (!raw) return false
  return Number(raw) > Date.now()
}

export async function setAdminCookie() {
  const jar = await cookies()
  jar.set(ADMIN_COOKIE, encodeAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_MAX_AGE,
  })
}

export async function clearAdminCookie() {
  const jar = await cookies()
  jar.delete(ADMIN_COOKIE)
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies()
  const val = jar.get(ADMIN_COOKIE)?.value
  if (!val) return false
  return verifyAdminToken(val)
}

export function getAdminTokenFromHeader(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE}=([^;]+)`))
  if (!match) return false
  return verifyAdminToken(match[1])
}
