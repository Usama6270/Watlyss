'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarCursorPatternProps {
  children: React.ReactNode
  className?: string
  patternSrc?: string
}

export default function NavbarCursorPattern({
  children,
  className = '',
  patternSrc = '/patterns/Patterns-01.png',
}: NavbarCursorPatternProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [activePattern, setActivePattern] = useState(patternSrc)

  useEffect(() => {
    const img = new Image()
    img.src = patternSrc
    img.onerror = () => {
      setActivePattern('/Patterns-01.png')
    }
  }, [patternSrc])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Dynamic Cursor-Following Professional & Premium Brand Spotlight */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-none absolute w-32 h-32 rounded-full overflow-hidden transition-transform duration-75 z-0"
            style={{
              left: mousePosition.x - 64, // Centering 128px compact spotlight on cursor
              top: mousePosition.y - 64,
              maskImage: 'radial-gradient(circle at center, black 15%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 15%, transparent 70%)',
            }}
          >
            {/* Ultra-subtle luxury ambient blue tint */}
            <div className="absolute inset-0 bg-cyan-400/10 dark:bg-cyan-300/15 blur-sm" />

            {/* Compact, Ultra-Subtle Brand Water Pattern Texture */}
            <div
              className="absolute inset-0 bg-repeat bg-center mix-blend-multiply dark:mix-blend-screen opacity-18 dark:opacity-25 transition-opacity duration-300"
              style={{
                backgroundImage: `url(${activePattern})`,
                backgroundSize: '140px auto',
                filter: 'contrast(1.1) brightness(1.02)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Existing Navbar Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
