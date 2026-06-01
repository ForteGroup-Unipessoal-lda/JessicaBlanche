import type { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--serif',
})

export const metadata: Metadata = {
  title: 'Jessica Blanche Charger — Inner Circle',
  description: "She's been in control her whole life. Now she's choosing who gets access to the unfiltered version.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cormorant.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
