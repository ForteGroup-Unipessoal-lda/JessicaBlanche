'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Feed' },
  { href: '/dashboard/messages', label: 'Messages' },
  { href: '/dashboard/live', label: 'Live Sessions' },
  { href: '/dashboard/account', label: 'Account' },
]

export default function DashboardNav({ email }: { email: string }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <nav className="dash-nav">
      <div className="dash-nav-brand">
        <span className="dash-nav-jb">Jessica Blanche</span>
        <span className="dash-nav-badge">✦ Member</span>
      </div>
      <ul className="dash-nav-links">
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} className={`dash-nav-link${pathname === l.href ? ' active' : ''}`}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="dash-nav-foot">
        <span className="dash-nav-email">{email}</span>
        <button className="dash-nav-logout" onClick={handleLogout}>Log out</button>
      </div>
    </nav>
  )
}
