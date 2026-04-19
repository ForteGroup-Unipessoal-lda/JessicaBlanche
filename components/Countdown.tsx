'use client'

import { useEffect, useState } from 'react'

function pad(n: number) {
  return String(Math.floor(n)).padStart(2, '0')
}

export default function Countdown() {
  const [time, setTime] = useState({ d: '14', h: '00', m: '00', s: '00' })

  useEffect(() => {
    const target = process.env.NEXT_PUBLIC_COUNTDOWN_TARGET
    const launch = target ? new Date(target) : (() => {
      const d = new Date()
      d.setDate(d.getDate() + 14)
      d.setHours(d.getHours() + 6)
      return d
    })()

    const tick = () => {
      const diff = launch.getTime() - Date.now()
      if (diff <= 0) {
        setTime({ d: '00', h: '00', m: '00', s: '00' })
        return
      }
      setTime({
        d: pad(diff / 86400000),
        h: pad((diff % 86400000) / 3600000),
        m: pad((diff % 3600000) / 60000),
        s: pad((diff % 60000) / 1000),
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="countdown-section">
      <span className="section-label reveal">Founding Access Closes In</span>
      <h2 className="cnt-head reveal">
        After this, the price goes up.<br />
        The gifts disappear. <em>This rate vanishes.</em>
      </h2>
      <div className="cnt-grid reveal">
        <div className="cnt-unit">
          <span className="cnt-num">{time.d}</span>
          <span className="cnt-lbl">Days</span>
        </div>
        <span className="cnt-sep">:</span>
        <div className="cnt-unit">
          <span className="cnt-num">{time.h}</span>
          <span className="cnt-lbl">Hours</span>
        </div>
        <span className="cnt-sep">:</span>
        <div className="cnt-unit">
          <span className="cnt-num">{time.m}</span>
          <span className="cnt-lbl">Minutes</span>
        </div>
        <span className="cnt-sep">:</span>
        <div className="cnt-unit">
          <span className="cnt-num">{time.s}</span>
          <span className="cnt-lbl">Seconds</span>
        </div>
      </div>
    </section>
  )
}
