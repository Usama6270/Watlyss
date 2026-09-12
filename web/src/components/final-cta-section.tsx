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
      className={`relative py-16 sm:py-24 px-4 sm:px-8 lg:px-12 text-center overflow-hidden border-t font-sans transition-all duration-700 ease-in-out ${
        isHovered
          ? 'bg-[#0064D0] dark:bg-[#0052ad] text-white border-[#0064D0]'
          : 'bg-[#FAF9F6] dark:bg-[#0a1128] text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-800/60'
      }`}
    >
      {/* Pattern Layer revealed around cursor ONLY when hovered AND NOT over interactive elements */}
      <AnimatePresence>
        {isHovered && !isOverInteractive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-none absolute w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] rounded-full z-10 overflow-hidden transform-gpu will-change-transform"
            style={{
              left: mousePosition.x - 250,
              top: mousePosition.y - 250,
              maskImage: 'radial-gradient(circle 220px at center, black 30%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(circle 220px at center, black 30%, transparent 85%)',
            }}
          >
            {/* Ambient White/Sky Blue Glow */}
            <div className="absolute inset-0 bg-white/20 dark:bg-white/25 rounded-full blur-xl" />

            {/* Water Brand Pattern Layer */}
            <div
              className="absolute inset-0 w-full h-full bg-repeat opacity-50 dark:opacity-70 mix-blend-overlay"
              style={{
                backgroundImage: `url('/patterns/pattern-05.svg'), url('/patterns/pattern-04.svg')`,
                backgroundSize: '240px auto',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 relative z-20 font-sans px-2">
        <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] transition-colors duration-500 ${
          isHovered ? 'text-sky-200' : 'text-[#0064D0]'
        }`}>
          START YOUR SUBSCRIPTION
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide">
          Your Water. Your Schedule.
        </h2>
        <p className={`text-xs sm:text-base font-light max-w-xl mx-auto leading-relaxed transition-colors duration-500 ${
          isHovered ? 'text-sky-100' : 'text-slate-600 dark:text-slate-200'
        }`}>
          Choose a plan that works for you and get 19L drinking water delivered to your doorstep.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
          <Link
            href="/order"
            className={`w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.25em] rounded-2xl transition-all shadow-xl text-center cursor-pointer ${
              isHovered
                ? 'bg-white text-[#0064D0] hover:bg-sky-50 shadow-white/20 hover:scale-105'
                : 'bg-[#0064D0] hover:bg-[#0052ad] text-white shadow-[#0064D0]/20'
            }`}
          >
            Order Water
          </Link>
          <a
            href="#calculator"
            className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-2xl border transition-all shadow-sm text-center cursor-pointer ${
              isHovered
                ? 'bg-white/10 hover:bg-white/20 text-white border-white/40 backdrop-blur-md'
                : 'bg-white/80 dark:bg-white dark:text-black hover:dark:bg-slate-100 text-slate-900 border-slate-200 dark:border-white'
            }`}
          >
            Build a Custom Plan
          </a>
        </div>
      </div>
    </section>
  )
}
