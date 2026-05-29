'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewContentPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [postType, setPostType] = useState<'photo' | 'video' | 'text'>('photo')
  const [isEarlyAccess, setIsEarlyAccess] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function uploadFiles(): Promise<string[]> {
    if (!files?.length) return []
    const paths: string[] = []
    for (const file of Array.from(files)) {
      const sigRes = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      })
      if (!sigRes.ok) throw new Error('Upload URL generation failed')
      const { uploadUrl, path } = await sigRes.json()
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      if (!uploadRes.ok) throw new Error('File upload failed')
      paths.push(path)
    }
    return paths
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setUploading(true)
    setError('')
    try {
      const media_urls = await uploadFiles()
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, post_type: postType, is_early_access: isEarlyAccess, media_urls }),
      })
      if (!res.ok) {
        const { error: msg } = await res.json()
        throw new Error(msg)
      }
      router.push('/admin/dashboard/content')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="admin-new-post">
      <h1 className="admin-page-title">New Post</h1>
      <form className="admin-form" onSubmit={handleSubmit}>
        {error && <p className="admin-form-error">{error}</p>}

        <div className="admin-form-group">
          <label className="admin-label">Title *</label>
          <input className="admin-input" value={title} onChange={e => setTitle(e.target.value)} required disabled={uploading} />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Body / Caption</label>
          <textarea className="admin-textarea" value={body} onChange={e => setBody(e.target.value)} rows={4} disabled={uploading} />
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Post type</label>
            <select className="admin-select" value={postType} onChange={e => setPostType(e.target.value as typeof postType)} disabled={uploading}>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
              <option value="text">Text only</option>
            </select>
          </div>

          <div className="admin-form-group admin-form-check">
            <label className="admin-check-label">
              <input type="checkbox" checked={isEarlyAccess} onChange={e => setIsEarlyAccess(e.target.checked)} disabled={uploading} />
              24h Early Access drop
            </label>
          </div>
        </div>

        {postType !== 'text' && (
          <div className="admin-form-group">
            <label className="admin-label">Media files</label>
            <input
              type="file"
              className="admin-file-input"
              accept={postType === 'video' ? 'video/*' : 'image/*'}
              multiple
              onChange={e => setFiles(e.target.files)}
              disabled={uploading}
            />
          </div>
        )}

        <div className="admin-form-actions">
          <button className="admin-btn-primary" type="submit" disabled={uploading}>
            {uploading ? 'Uploading…' : 'Publish Post'}
          </button>
          <button className="admin-btn-secondary" type="button" onClick={() => router.back()} disabled={uploading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
