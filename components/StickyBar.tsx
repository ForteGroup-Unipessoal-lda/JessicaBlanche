'use client'

import { useEffect, useState } from 'react'

const TOTAL_SPOTS = 1000

function pad(n: number) {
  return String(Math.floor(n)).padStart(2, '0')
}

export default function StickyBar({ activeCount }: { activeCount: number }) {
  const [visible, setVisible] = useState(false)
  const [time, setTime] = useState({ h: '00', m: '00', s: '00' })

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const target = process.env.NEXT_PUBLIC_COUNTDOWN_TARGET
    const launch = target
      ? new Date(target)
      : (() => { const d = new Date(); d.setDate(d.getDate() + 14); return d })()

    const tick = () => {
      const diff = launch.getTime() - Date.now()
      if (diff <= 0) { setTime({ h: '00', m: '00', s: '00' }); return }
      setTime({
        h: pad((diff % 86400000) / 3600000),
        m: pad((diff % 3600000) / 60000),
        s: pad((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const remaining = Math.max(0, TOTAL_SPOTS - activeCount)

  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={`sticky-bar${visible ? ' sticky-bar--visible' : ''}`}>
      <div className="sticky-bar-timer">
        <span className="sticky-bar-timer-label">Offer ends · {remaining} spots left</span>
        <span className="sticky-bar-timer-nums">{time.h}:{time.m}:{time.s}</span>
      </div>
      <button className="sticky-bar-cta" onClick={scrollToJoin}>
        Chat with me — $9.99
      </button>
    </div>
  )
}
