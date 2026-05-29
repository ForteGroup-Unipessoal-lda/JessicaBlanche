'use client'

import { useEffect, useRef } from 'react'

const orbitImages = [
  '/images/photo-01.jpg',
  '/images/Photo_mirror_night.png',
  '/images/jessica_beach.png',
  '/images/Bikini_photo.jpg',
  '/images/photo-02.jpg',
  '/images/Gym_session.png',
  '/images/jessica_night_out.png',
  '/images/IMG_8134.PNG',
  '/images/photo-03.jpg',
]

export default function Hero() {
  const tiltRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const animFrameRef = useRef(false)

  useEffect(() => {
    const tilt = tiltRef.current
    const hero = heroRef.current
    if (!tilt || !hero) return

    const onMove = (e: MouseEvent) => {
      if (animFrameRef.current) return
      animFrameRef.current = true
      requestAnimationFrame(() => {
        const cx = window.innerWidth / 2
        const cy = window.innerHeight / 2
        const rx = 10 - ((e.clientY - cy) / cy) * 6
        const rz = ((e.clientX - cx) / cx) * 1.2
        tilt.style.transform = `rotateX(${rx}deg) rotateZ(${rz}deg)`
        animFrameRef.current = false
      })
    }

    const onLeave = () => {
      tilt.style.transition = 'transform .8s cubic-bezier(.25,.46,.45,.94)'
      tilt.style.transform = 'rotateX(10deg) rotateZ(0deg)'
      setTimeout(() => { tilt.style.transition = '' }, 800)
    }

    document.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-ambient" />
      <div className="scene-wrap">
        <div className="scene-tilt" ref={tiltRef}>
          <div className="orbit-ring">
            {orbitImages.map((src, i) => (
              <div key={i} className={`photo-card pc${i + 1}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Jessica" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hero-portrait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/jessie%233.webp" alt="Jessica" />
      </div>
      <div className="hero-content">
        <p className="eyebrow">Inner Circle · First 1,000 Only</p>
        <h1 className="hero-name">
          Jessica<br /><em>Blanche</em>
          <span className="last">Charger</span>
        </h1>
        <p className="hero-lead">
          She's been in control her whole life. Now she's choosing who gets access to the unfiltered version.
        </p>
        <div className="hero-btns">
          <button className="btn-p" onClick={scrollToJoin}>
            Get First Access — 9.99€
          </button>
          <button className="btn-g" onClick={scrollToStory}>
            Her Story
          </button>
        </div>
      </div>
      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
