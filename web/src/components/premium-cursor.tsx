'use client'

import { useEffect, useRef, useState } from 'react'

/** Desktop-only glacier ring cursor — transform only, respects reduced motion. */
export default function PremiumCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const raf = useRef(0)

  useEffect(() => {
    const mqFine = window.matchMedia('(pointer: fine)')
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqWide = window.matchMedia('(min-width: 1024px)')

    const sync = () => {
      const on = mqFine.matches && !mqMotion.matches && mqWide.matches
      setEnabled(on)
      document.body.classList.toggle('has-premium-cursor', on)
    }
    sync()
    mqFine.addEventListener('change', sync)
    mqMotion.addEventListener('change', sync)
    mqWide.addEventListener('change', sync)
    return () => {
      mqFine.removeEventListener('change', sync)
      mqMotion.removeEventListener('change', sync)
      mqWide.removeEventListener('change', sync)
      document.body.classList.remove('has-premium-cursor')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    const paint = () => {
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      raf.current = 0
    }

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!raf.current) raf.current = requestAnimationFrame(paint)
      el.classList.add('is-visible')
      const t = e.target as HTMLElement | null
      const hover = Boolean(t?.closest('a, button, [role="button"], input, textarea, select, .card-premium'))
      el.classList.toggle('is-hover', hover)
    }
    const onDown = () => el.classList.add('is-down')
    const onUp = () => el.classList.remove('is-down')
    const onLeave = () => el.classList.remove('is-visible')

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [enabled])

  if (!enabled) return null
  return <div ref={ref} className="premium-cursor" aria-hidden />
}
