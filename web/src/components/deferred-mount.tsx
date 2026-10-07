'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * Mounts children only when near viewport (or after idle fallback).
 * Keeps heavy below-fold sections off the critical path.
 */
export default function DeferredMount({
  children,
  rootMargin = '200px',
  minHeight = 320,
  className = '',
}: {
  children: React.ReactNode
  rootMargin?: string
  minHeight?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const activate = () => setReady(true)

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            activate()
            io.disconnect()
          }
        },
        { rootMargin, threshold: 0.01 }
      )
      io.observe(el)

      // Fallback: still load eventually so SEO/crawlers / deep links aren't blank forever
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => activate(), { timeout: 4000 })
      } else {
        timeoutId = setTimeout(activate, 3500)
      }

      return () => {
        io.disconnect()
        if (idleId !== undefined && 'cancelIdleCallback' in window) {
          window.cancelIdleCallback(idleId)
        }
        if (timeoutId) clearTimeout(timeoutId)
      }
    }

    timeoutId = setTimeout(activate, 100)
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [rootMargin])

  return (
    <div ref={ref} className={className} style={ready ? undefined : { minHeight }}>
      {ready ? children : null}
    </div>
  )
}
