'use client'

import { useRouter } from 'next/navigation'

export default function AdminDeleteSession({ id }: { id: string }) {
  const router = useRouter()
  async function handleDelete() {
    if (!confirm('Delete this session?')) return
    await fetch(`/api/admin/sessions/${id}`, { method: 'DELETE' })
    router.refresh()
  }
  return <button className="admin-delete-btn" onClick={handleDelete}>Delete</button>
}
