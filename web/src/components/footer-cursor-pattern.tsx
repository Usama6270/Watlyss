'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FooterCursorPatternProps {
  children: React.ReactNode
  className?: string
  patternSrc?: string
}

export default function FooterCursorPattern({
  children,
  className = '',
  patternSrc = '/patterns/pattern-05.svg',
}: FooterCursorPatternProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isOverInteractive, setIsOverInteractive] = useState(false)
  const [activePattern, setActivePattern] = useState(patternSrc)

  useEffect(() => {
    const img = new Image()
    img.src = patternSrc
    img.onerror = () => {
      setActivePattern('/patterns/Patterns-05.svg')
    }
  }, [patternSrc])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const target = e.target as HTMLElement
    const isInteractive = target.closest('button, a, input, select, textarea, [role="button"]') !== null
    setIsOverInteractive(isInteractive)

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!e.touches[0]) return
    const rect = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement
    const isInteractive = target ? target.closest('button, a, input, select, textarea, [role="button"]') !== null : false
    setIsOverInteractive(isInteractive)

    setIsHovered(true)
    setMousePosition({ x, y })
  }

  const handleTouchEnd = () => {
    setIsHovered(false)
    setIsOverInteractive(false)
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsOverInteractive(false)
      }}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={`relative w-full ${className}`}
    >
      {/* Background Floating Rectangular Box Spotlight Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-3xl">
        <AnimatePresence>
          {isHovered && !isOverInteractive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-none absolute w-[340px] h-[200px] sm:w-[460px] sm:h-[260px] rounded-3xl overflow-hidden transition-transform duration-75 z-0"
              style={{
                left: mousePosition.x - 230,
                top: mousePosition.y - 130,
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
              }}
            >
              {/* Soft Blue Ambient Water Glow */}
              <div className="absolute inset-0 bg-[#0064D0]/18 dark:bg-[#0064D0]/30 rounded-3xl blur-md" />

              {/* Box Outline Highlight */}
              <div className="absolute inset-0 border border-[#0064D0]/40 dark:border-[#0064D0]/60 rounded-3xl" />

              {/* Water Brand Pattern 05 Layer */}
              <div
                className="absolute inset-0 bg-repeat bg-center mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-55 transition-opacity duration-300"
                style={{
                  backgroundImage: `url(${activePattern})`,
                  backgroundSize: '220px auto',
                  filter: 'contrast(1.2) brightness(0.95)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 pointer-events-auto">{children}</div>
    </div>
  )
}
