'use client'

import { useEffect } from 'react'

export default function CustomCursor() {
  useEffect(() => {
    const cur = document.getElementById('cur')
    const ring = document.getElementById('cur-ring')
    if (!cur || !ring) return

    let mx = -100, my = -100, rx = -100, ry = -100

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      cur.style.left = mx + 'px'
      cur.style.top = my + 'px'
    }

    const animate = () => {
      rx += (mx - rx) * 0.09
      ry += (my - ry) * 0.09
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    animate()

    const interactables = document.querySelectorAll('button,a,input')
    const expand = () => {
      ring.style.width = '52px'
      ring.style.height = '52px'
      ring.style.borderColor = 'rgba(201,169,110,.65)'
    }
    const shrink = () => {
      ring.style.width = '34px'
      ring.style.height = '34px'
      ring.style.borderColor = 'rgba(201,169,110,.4)'
    }
    interactables.forEach(el => {
      el.addEventListener('mouseenter', expand)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div id="cur" />
      <div id="cur-ring" />
    </>
  )
}
