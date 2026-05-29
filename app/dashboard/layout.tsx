import { redirect } from 'next/navigation'
import { getSessionEmail } from '@/lib/auth'
import DashboardNav from '@/components/dashboard/DashboardNav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const email = await getSessionEmail()
  if (!email) redirect('/login')

  return (
    <div className="dash-layout">
      <DashboardNav email={email} />
      <main className="dash-main">{children}</main>
    </div>
  )
}
