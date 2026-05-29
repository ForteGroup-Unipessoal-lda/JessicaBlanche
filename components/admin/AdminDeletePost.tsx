'use client'

import { useRouter } from 'next/navigation'

export default function AdminDeletePost({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/admin/content/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button className="admin-delete-btn" onClick={handleDelete}>Delete</button>
  )
}
