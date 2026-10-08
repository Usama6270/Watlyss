'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const STATS = [
  { value: 99.9, suffix: '%', label: 'Purity Assured', decimals: 1 },
  { value: 25000, suffix: '+', label: 'Households Served', decimals: 0 },
  { value: 48, suffix: 'h', label: 'Avg. Delivery Window', decimals: 0 },
  { value: 9, suffix: '-stage', label: 'Purification Barrier', decimals: 0 },
] as const

function useCountUp(target: number, active: boolean, duration = 1400, decimals = 0) {
  const [n, setN] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!active) return
    if (reduce) {
      setN(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Number((target * eased).toFixed(decimals)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration, decimals, reduce])

  return n
}

function StatItem({
  value,
  suffix,
  label,
  decimals,
  active,
}: {
  value: number
  suffix: string
  label: string
  decimals: number
  active: boolean
}) {
  const n = useCountUp(value, active, 1400, decimals)
  const display =
    decimals > 0
      ? n.toFixed(decimals)
      : Math.round(n).toLocaleString('en-PK')

  return (
    <div className="text-center px-3 sm:px-5">
      <div className="stat-value">
        {display}
        <span className="text-[0.65em] text-primary font-medium">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

/** Signature trust strip — elegant counting stats on scroll. */
export default function BrandStats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div
      ref={ref}
      className="relative z-10 container-custom mt-10 sm:mt-12"
    >
      <div className="glass rounded-[var(--radius-xl)] border border-border/70 px-2 py-5 sm:py-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-2">
        {STATS.map((s) => (
          <StatItem key={s.label} {...s} active={inView} />
        ))}
      </div>
    </div>
  )
}
