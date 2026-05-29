import { Resend } from 'resend'

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('RESEND_API_KEY is not set')
    _resend = new Resend(key)
  }
  return _resend
}

export async function sendMagicLink(email: string, magicUrl: string): Promise<void> {
  const from = process.env.RESEND_FROM_EMAIL ?? 'noreply@jessicablanche.com'
  const resend = getResend()

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: 'Your login link — Jessica Blanche',
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#0a0a0a;color:#f5f0eb;font-family:system-ui,sans-serif;padding:40px 20px;margin:0">
  <div style="max-width:480px;margin:0 auto">
    <p style="color:#b8975e;font-size:13px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:32px">Jessica Blanche · Inner Circle</p>
    <h1 style="font-size:28px;font-weight:300;margin:0 0 16px">Your login link</h1>
    <p style="color:#aaa;font-size:15px;line-height:1.6;margin:0 0 32px">
      Click the button below to access your member dashboard. This link expires in 1 hour and can only be used once.
    </p>
    <a href="${magicUrl}" style="display:inline-block;background:#b8975e;color:#0a0a0a;text-decoration:none;padding:14px 32px;font-size:14px;font-weight:600;letter-spacing:.06em;border-radius:4px">
      Enter the Inner Circle →
    </a>
    <p style="color:#555;font-size:12px;margin-top:40px">
      If you didn't request this link, you can safely ignore this email.
    </p>
  </div>
</body>
</html>`,
  })
  if (error) throw new Error(`Resend error: ${error.message}`)
}
