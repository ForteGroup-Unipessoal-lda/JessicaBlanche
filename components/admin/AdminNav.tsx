'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const links = [
  { href: '/admin/dashboard', label: 'Overview' },
  { href: '/admin/dashboard/subscribers', label: 'Subscribers' },
  { href: '/admin/dashboard/content', label: 'Content' },
  { href: '/admin/dashboard/messages', label: 'Messages' },
  { href: '/admin/dashboard/sessions', label: 'Live Sessions' },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  return (
    <nav className="admin-nav">
      <div className="admin-nav-brand">Jessica Blanche<br /><span className="admin-nav-tag">Admin</span></div>
      <ul className="admin-nav-links">
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} className={`admin-nav-link${pathname === l.href ? ' active' : ''}`}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <button className="admin-nav-logout" onClick={handleLogout}>Log out</button>
    </nav>
  )
}
