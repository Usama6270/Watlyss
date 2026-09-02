'use client'

import React, { useEffect, useRef } from 'react'

interface EdgeRipple {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
}

export default function FooterWaterEffect({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Disable on reduced motion or touch devices
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (mediaQuery.matches || isTouch) return

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let isHovered = false

    let targetX = 0
    let currentX = 0
    const ripples: EdgeRipple[] = []
    let lastRippleTime = 0

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(container)

    const handleMouseEnter = (e: MouseEvent) => {
      isHovered = true
      const rect = container.getBoundingClientRect()
      targetX = e.clientX - rect.left
      currentX = targetX
    }

    const handleMouseMove = (e: MouseEvent) => {
      isHovered = true
      const rect = container.getBoundingClientRect()
      targetX = e.clientX - rect.left

      const now = performance.now()
      if (now - lastRippleTime > 150) {
        ripples.push({
          x: targetX,
          y: canvas.height - 15,
          radius: 8,
          maxRadius: 70,
          alpha: 0.25,
        })
        lastRippleTime = now
      }
    }

    const handleMouseLeave = () => {
      isHovered = false
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const bottomY = canvas.height

      // 1. Far Bottom Edge Ambient Water Gradient Line (Strictly at bottom-most 40px)
      const edgeGrad = ctx.createLinearGradient(0, bottomY - 40, 0, bottomY)
      edgeGrad.addColorStop(0, 'rgba(0, 100, 208, 0.0)')
      edgeGrad.addColorStop(1, 'rgba(0, 100, 208, 0.06)')

      ctx.fillStyle = edgeGrad
      ctx.fillRect(0, bottomY - 40, canvas.width, 40)

      // 2. Render Gentle Edge Ripples along bottom boundary
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        r.radius += 1.0
        r.alpha -= 0.006

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1)
          continue
        }

        ctx.strokeStyle = `rgba(0, 100, 208, ${r.alpha})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI, true)
        ctx.stroke()
      }

      // 3. Smooth Water Glow following cursor X at bottom edge
      if (isHovered) {
        currentX += (targetX - currentX) * 0.12

        const glowGrad = ctx.createRadialGradient(
          currentX,
          bottomY,
          0,
          currentX,
          bottomY,
          140
        )
        glowGrad.addColorStop(0, 'rgba(0, 100, 208, 0.14)')
        glowGrad.addColorStop(0.5, 'rgba(0, 100, 208, 0.04)')
        glowGrad.addColorStop(1, 'rgba(0, 100, 208, 0.0)')

        ctx.fillStyle = glowGrad
        ctx.beginPath()
        ctx.arc(currentX, bottomY, 140, Math.PI, 0, false)
        ctx.fill()
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      resizeObserver.disconnect()
    }
  }, [containerRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}
