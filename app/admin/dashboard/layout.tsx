import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/auth'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const ok = await isAdminAuthenticated()
  if (!ok) redirect('/admin')

  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-main">{children}</main>
    </div>
  )
}
