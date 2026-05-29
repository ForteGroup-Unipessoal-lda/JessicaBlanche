import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase-server'
import AdminDeletePost from '@/components/admin/AdminDeletePost'

export default async function AdminContent() {
  const supabase = createAdminClient()
  const { data: posts } = await supabase
    .from('content_posts')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(100)

  return (
    <div className="admin-content">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Content</h1>
        <Link href="/admin/dashboard/content/new" className="admin-btn-primary">+ New Post</Link>
      </div>

      {!posts?.length ? (
        <p className="admin-empty">No posts yet. Create the first one.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Early Access</th>
                <th>Published</th>
                <th>Media</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.post_type}</td>
                  <td>{p.is_early_access ? '✦' : '—'}</td>
                  <td>{new Date(p.published_at).toLocaleDateString('en-GB')}</td>
                  <td>{(p.media_urls as string[]).length}</td>
                  <td><AdminDeletePost id={p.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
