'use client'

import React, { useEffect, useRef } from 'react'
import { useTheme } from '@/components/theme-provider'

type FoamParticle = {
  x: number
  y: number
  size: number
  speed: number
  swayAmp: number
  swayFreq: number
  phase: number
  opacity: number
  spriteKey: number
}

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

function foamCount(bp: Breakpoint, lowEnd: boolean): number {
  if (bp === 'mobile') return lowEnd ? 18 : 26
  if (bp === 'tablet') return lowEnd ? 32 : 42
  return lowEnd ? 52 : 78
}

function pickSize(rand: () => number): number {
  const r = rand()
  if (r < 0.55) return 4 + rand() * 5
  if (r < 0.82) return 9 + rand() * 6
  if (r < 0.95) return 15 + rand() * 6
  return 21 + rand() * 5
}

function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function readCssColor(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

function makeSprite(size: number, rim: string, fill: string, spec: string): HTMLCanvasElement {
  const pad = Math.ceil(size * 0.2) + 2
  const dim = Math.ceil(size) + pad * 2
  const c = document.createElement('canvas')
  c.width = dim
  c.height = dim
  const ctx = c.getContext('2d')
  if (!ctx) return c
  const cx = dim / 2
  const cy = dim / 2
  const r = size / 2

  ctx.beginPath()
  ctx.arc(cx, cy, Math.max(0.5, r - 0.4), 0, Math.PI * 2)
  ctx.fillStyle = fill
  ctx.fill()

  ctx.beginPath()
  ctx.arc(cx, cy, Math.max(0.5, r - 0.5), 0, Math.PI * 2)
  ctx.strokeStyle = rim
  ctx.lineWidth = Math.max(0.7, size * 0.07)
  ctx.stroke()

  const sr = Math.max(0.6, r * 0.14)
  ctx.beginPath()
  ctx.arc(cx - r * 0.28, cy - r * 0.32, sr, 0, Math.PI * 2)
  ctx.fillStyle = spec
  ctx.fill()

  return c
}

function spawnClustered(count: number, w: number, h: number, rand: () => number): FoamParticle[] {
  const particles: FoamParticle[] = []
  const clusterCount = Math.max(4, Math.round(count / 6))
  let made = 0

  for (let c = 0; c < clusterCount && made < count; c++) {
    const cx = 0.06 + rand() * 0.88
    const cy = rand()
    const inCluster = 3 + Math.floor(rand() * 5)
    for (let i = 0; i < inCluster && made < count; i++) {
      const size = pickSize(rand)
      const depthT = size < 10 ? 0.3 : size < 16 ? 0.55 : 0.8
      particles.push({
        x: Math.min(0.97, Math.max(0.03, cx + (rand() - 0.5) * 0.1)),
        y: (cy + (rand() - 0.5) * 0.12 + 1) % 1,
        size,
        speed: ((18 + rand() * 28) / Math.max(h, 1)) * (0.7 + depthT * 0.5),
        swayAmp: (4 + rand() * 14) / Math.max(w, 1),
        swayFreq: 0.35 + rand() * 0.85,
        phase: rand() * Math.PI * 2,
        opacity: 0.25 + depthT * 0.32,
        spriteKey: Math.round(size),
      })
      made++
    }
  }

  while (made < count) {
    const size = pickSize(rand)
    const depthT = size < 10 ? 0.3 : size < 16 ? 0.55 : 0.8
    particles.push({
      x: 0.04 + rand() * 0.92,
      y: rand(),
      size,
      speed: ((16 + rand() * 32) / Math.max(h, 1)) * (0.7 + depthT * 0.5),
      swayAmp: (3 + rand() * 12) / Math.max(w, 1),
      swayFreq: 0.3 + rand() * 0.9,
      phase: rand() * Math.PI * 2,
      opacity: 0.22 + depthT * 0.35,
      spriteKey: Math.round(size),
    })
    made++
  }

  return particles
}

export default function MicroFoamCanvas({
  active,
  reduceMotion,
  breakpoint,
  className = '',
}: {
  active: boolean
  reduceMotion: boolean
  breakpoint: Breakpoint
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeRef = useRef(active)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduceMotion) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const nav = typeof navigator !== 'undefined' ? navigator : null
    const lowEnd = Boolean(
      nav &&
        ((nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) ||
          ('deviceMemory' in nav &&
            typeof (nav as Navigator & { deviceMemory?: number }).deviceMemory === 'number' &&
            ((nav as Navigator & { deviceMemory?: number }).deviceMemory as number) <= 4))
    )

    let raf = 0
    let running = true
    let particles: FoamParticle[] = []
    const sprites = new Map<number, HTMLCanvasElement>()
    const rand = mulberry32(42)
    let last = performance.now()
    let dpr = 1

    const rebuildSprites = () => {
      sprites.clear()
      const rim = readCssColor(
        '--bubble-foam-rim',
        isDark ? 'rgba(255,255,255,0.55)' : 'rgba(90,145,190,0.5)'
      )
      const fill = readCssColor(
        '--bubble-foam-fill',
        isDark ? 'rgba(255,255,255,0.08)' : 'rgba(180,210,235,0.14)'
      )
      const spec = readCssColor('--bubble-foam-spec', 'rgba(255,255,255,0.8)')
      for (let s = 4; s <= 28; s++) {
        sprites.set(s, makeSprite(s, rim, fill, spec))
      }
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const w = parent.clientWidth
      const h = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = foamCount(breakpoint, lowEnd)
      particles = spawnClustered(count, w, h, rand)
    }

    rebuildSprites()
    resize()
    window.addEventListener('resize', resize)

    const tick = (now: number) => {
      if (!running) return
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const w = canvas.clientWidth
      const h = canvas.clientHeight

      if (activeRef.current) {
        ctx.clearRect(0, 0, w, h)
        for (const p of particles) {
          p.y -= p.speed * dt
          if (p.y < -0.05) {
            p.y = 1.05
            p.x = 0.04 + rand() * 0.92
            p.phase = rand() * Math.PI * 2
          }
          const sway = Math.sin((now / 1000) * p.swayFreq + p.phase) * p.swayAmp
          const px = (p.x + sway) * w
          const py = p.y * h
          const sprite = sprites.get(p.spriteKey) || sprites.get(8)
          if (!sprite) continue
          ctx.globalAlpha = p.opacity
          ctx.drawImage(sprite, px - sprite.width / 2, py - sprite.height / 2)
        }
        ctx.globalAlpha = 1
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduceMotion, breakpoint, isDark])

  if (reduceMotion) return null

  return (
    <canvas ref={canvasRef} className={`bubble-foam-canvas ${className}`} aria-hidden />
  )
}
