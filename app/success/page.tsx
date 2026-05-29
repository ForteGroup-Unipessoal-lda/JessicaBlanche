import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Welcome to the Inner Circle — Jessica Blanche Charger',
}

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { name?: string }
}) {
  const name = searchParams.name ? decodeURIComponent(searchParams.name) : null

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        background: 'var(--bg)',
        position: 'relative',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(201,169,110,.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: '520px' }}>
        <div style={{ fontSize: '36px', marginBottom: '24px' }}>✦</div>

        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(36px, 6vw, 60px)',
            fontWeight: 300,
            lineHeight: 1.05,
            marginBottom: '24px',
          }}
        >
          {name ? (
            <>
              Welcome,<br />
              <em style={{ color: 'var(--gold)' }}>{name}.</em>
            </>
          ) : (
            <>
              You're in.<br />
              <em style={{ color: 'var(--gold)' }}>Welcome.</em>
            </>
          )}
        </div>

        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'var(--muted)',
            fontWeight: 300,
            marginBottom: '12px',
          }}
        >
          Welcome to the Inner Circle{name ? `, ${name}` : ''} — genuinely.
        </p>
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'var(--muted)',
            fontWeight: 300,
            marginBottom: '48px',
          }}
        >
          Check your inbox — Jessica has something for you already.
          Your rate is locked forever at $9.99.
        </p>

        <div
          style={{
            border: '1px solid rgba(201,169,110,.2)',
            borderRadius: '16px',
            padding: '24px 32px',
            background: 'rgba(201,169,110,.04)',
            marginBottom: '48px',
          }}
        >
          <p style={{ fontSize: '13px', color: 'var(--dim)', lineHeight: 1.7 }}>
            Your founding member status is confirmed.<br />
            You'll receive a personal welcome from Jessica within 24 hours.
          </p>
        </div>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: 'var(--gold)',
            color: '#000',
            padding: '14px 36px',
            borderRadius: '980px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            fontFamily: 'var(--ui)',
          }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
