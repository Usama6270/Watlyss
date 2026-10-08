'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function FinalCtaSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [isOverInteractive, setIsOverInteractive] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const target = e.target as HTMLElement
    const isInteractive = target.closest('button, a, input, select, textarea, [role="button"]') !== null
    setIsOverInteractive(isInteractive)

    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsOverInteractive(false)
  }

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`relative section-padding px-[var(--gutter)] text-center overflow-x-hidden border-t font-sans transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isHovered
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-background text-foreground border-border/50'
      }`}
    >
      <AnimatePresence>
        {isHovered && !isOverInteractive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] rounded-full z-10 overflow-hidden transform-gpu will-change-transform"
            style={{
              left: mousePosition.x - 250,
              top: mousePosition.y - 250,
              maskImage: 'radial-gradient(circle 220px at center, black 30%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(circle 220px at center, black 30%, transparent 85%)',
            }}
          >
            <div className="absolute inset-0 bg-white/15 rounded-full blur-xl" />
            <div
              className="absolute inset-0 w-full h-full bg-repeat opacity-40 mix-blend-overlay"
              style={{
                backgroundImage: `url('/patterns/pattern-05.svg'), url('/patterns/pattern-04.svg')`,
                backgroundSize: '240px auto',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 relative z-20 px-2">
        <span
          className={`eyebrow transition-colors duration-500 ${
            isHovered ? '!text-primary-foreground/80' : ''
          }`}
        >
          Start Your Subscription
        </span>
        <h2 className="section-title !text-inherit">Your Water. Your Schedule.</h2>
        <p
          className={`section-lead mx-auto transition-colors duration-500 ${
            isHovered ? '!text-primary-foreground/85' : ''
          }`}
        >
          Choose a plan that works for you and get 19L drinking water delivered to your doorstep.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
          <Link
            href="/order"
            className={`btn-primary w-full sm:w-auto ${
              isHovered
                ? '!bg-card !text-primary hover:!bg-card/90 !shadow-lg'
                : ''
            }`}
          >
            Order Water
          </Link>
          <a
            href="#calculator"
            className={`btn-secondary w-full sm:w-auto ${
              isHovered
                ? '!bg-transparent !text-primary-foreground !border-primary-foreground/35 hover:!bg-white/10'
                : ''
            }`}
          >
            Build a Custom Plan
          </a>
        </div>
      </div>
    </section>
  )
}
