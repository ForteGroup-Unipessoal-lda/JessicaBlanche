import { createAdminClient } from '@/lib/supabase-server'
import { getSessionEmail } from '@/lib/auth'

async function getSignedUrl(supabase: ReturnType<typeof createAdminClient>, path: string): Promise<string> {
  const { data } = await supabase.storage
    .from('member-content')
    .createSignedUrl(path, 3600)
  return data?.signedUrl ?? path
}

export default async function DashboardFeed() {
  const email = await getSessionEmail()
  const supabase = createAdminClient()

  const { data: subscriber } = await supabase
    .from('subscribers')
    .select('is_founding_member, name')
    .eq('email', email!)
    .single()

  const { data: posts } = await supabase
    .from('content_posts')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(50)

  const postsWithUrls = await Promise.all(
    (posts ?? []).map(async p => ({
      ...p,
      resolved_urls: await Promise.all(
        (p.media_urls as string[]).map(u => u.startsWith('http') ? u : getSignedUrl(supabase, u))
      ),
    }))
  )

  return (
    <div className="dash-feed">
      <div className="dash-feed-header">
        <h1 className="dash-feed-title">
          Welcome back{subscriber?.name ? `, ${subscriber.name.split(' ')[0]}` : ''}.
        </h1>
        {subscriber?.is_founding_member && (
          <span className="founding-badge">✦ Founding Member</span>
        )}
      </div>

      {postsWithUrls.length === 0 ? (
        <div className="dash-empty">
          <p>The first drop is coming soon. Stay close.</p>
        </div>
      ) : (
        <div className="dash-posts">
          {postsWithUrls.map(post => (
            <article key={post.id} className="dash-post">
              <div className="dash-post-meta">
                {post.is_early_access && <span className="dash-early-badge">24h Early Access</span>}
                <span className="dash-post-type">{post.post_type}</span>
                <time className="dash-post-time">
                  {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
              </div>
              <h2 className="dash-post-title">{post.title}</h2>
              {post.body && <p className="dash-post-body">{post.body}</p>}
              {post.resolved_urls.length > 0 && (
                <div className={`dash-post-media count-${post.resolved_urls.length}`}>
                  {post.resolved_urls.map((url: string, i: number) =>
                    post.post_type === 'video' ? (
                      <video key={i} src={url} controls className="dash-media-item" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={url} alt={post.title} className="dash-media-item" />
                    )
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
