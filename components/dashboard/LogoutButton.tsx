'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }
  return (
    <button className="dash-logout-btn" onClick={handleLogout}>
      Log out
    </button>
  )
}
