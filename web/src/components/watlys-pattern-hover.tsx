'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Droplets, ShieldCheck, LucideIcon, Waves } from 'lucide-react'

// Pattern frame image sources
const DEFAULT_PATTERNS = [
  '/patterns/Patterns-01.png',
  '/patterns/Patterns-02.png',
  '/patterns/Patterns-03.png',
  '/patterns/Patterns-04.png',
  '/patterns/Patterns-05.png',
  '/patterns/Patterns-06.png',
]

// Secondary fallback paths if required
const FALLBACK_PATTERNS = [
  '/Patterns-01.png',
  '/Patterns-02.png',
  '/Patterns-03.png',
  '/Patterns-04.png',
  '/Patterns-05.png',
  '/Patterns-06.png',
]

interface WatlysPatternHoverProps {
  variant?: 'logo' | 'card' | 'badge' | 'icon'
  title?: string
  subtitle?: string
  icon?: LucideIcon
  fps?: number
  className?: string
  children?: React.ReactNode
}

export default function WatlysPatternHover({
  variant = 'card',
  title,
  subtitle,
  icon: Icon = Droplets,
  fps = 16, // Default ~16fps (approx 62ms interval)
  className = '',
  children,
}: WatlysPatternHoverProps) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [patterns, setPatterns] = useState<string[]>(DEFAULT_PATTERNS)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    DEFAULT_PATTERNS.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onerror = () => {
        setPatterns(FALLBACK_PATTERNS)
      }
    })
  }, [])

  // Cycle pattern frames rapidly on hover (15-20fps)
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isHovered) {
      const intervalMs = Math.round(1000 / fps)
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % patterns.length)
      }, intervalMs)
    } else {
      setCurrentFrame(0)
    }
    return () => clearInterval(interval)
  }, [isHovered, fps, patterns.length])

  const activePatternUrl = isMounted ? patterns[currentFrame] : DEFAULT_PATTERNS[0]

  // --- VARIANT 1: LOGO MASK REVEAL ---
  if (variant === 'logo') {
    return (
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className={`relative inline-flex items-center justify-center p-2 rounded-2xl bg-[#0a1128] border border-blue-500/30 overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 group ${className}`}
      >
        {/* Dynamic Glowing Ambient Backlight */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1.25 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 blur-2xl opacity-40 shadow-blue-500 pointer-events-none rounded-full"
            />
          )}
        </AnimatePresence>

        {/* Liquid Pattern Layer Masked by Logo */}
        <div className="relative w-full h-full flex items-center justify-center z-10 overflow-hidden rounded-xl">
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-75 mix-blend-screen opacity-80"
            suppressHydrationWarning
            style={{
              backgroundImage: `url(${activePatternUrl})`,
              filter: isHovered ? 'brightness(1.2) contrast(1.1)' : 'brightness(0.85) opacity(0.4)',
            }}
          />

          {/* Clean Metallic Overlay Grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-[#0a1128]/80 pointer-events-none" />

          {/* Logo Mark Text / Icon or Custom Children */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 px-3 py-1.5 z-20">
            {children ? (
              children
            ) : (
              <>
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'scale-110 text-cyan-300' : 'text-blue-200'}`} />
                <span className="font-extrabold tracking-wider text-white text-sm uppercase drop-shadow-md">
                  WATLYS
                </span>
              </>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // --- VARIANT 2: BADGE / ACCENT PILL ---
  if (variant === 'badge') {
    return (
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.04 }}
        className={`relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0a1128] border border-blue-400/30 overflow-hidden cursor-pointer shadow-lg transition-all duration-300 ${className}`}
      >
        {/* Pulsing Ambient Backlight Glow */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 blur-xl transition-opacity duration-500 ${
            isHovered ? 'opacity-70 animate-pulse' : 'opacity-0'
          }`}
        />

        {/* Animated Background Pattern */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-150 mix-blend-screen"
          suppressHydrationWarning
          style={{
            backgroundImage: `url(${activePatternUrl})`,
            opacity: isHovered ? 0.65 : 0.2,
          }}
        />

        {/* Metallic Dark Overlay */}
        <div className="absolute inset-0 bg-[#0a1128]/70 backdrop-blur-[2px]" />

        {/* Badge Content */}
        <div className="relative z-10 flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-100 uppercase">
          <Sparkles className={`w-3.5 h-3.5 transition-colors duration-300 ${isHovered ? 'text-cyan-300 animate-spin-slow' : 'text-blue-400'}`} />
          <span>{title || 'Pure Hydro Flow'}</span>
        </div>
      </motion.div>
    )
  }

  // --- VARIANT 3: CARD CONTAINER (DEFAULT) ---
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative w-full rounded-2xl p-6 bg-[#0a1128] border border-blue-500/30 overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 group ${className}`}
    >
      {/* Ambient Pulsing Backlight */}
      <div
        className={`absolute -inset-4 bg-gradient-to-tr from-blue-600/40 via-cyan-500/30 to-blue-900/0 blur-2xl pointer-events-none transition-all duration-500 ${
          isHovered ? 'opacity-80 scale-105' : 'opacity-0 scale-95'
        }`}
      />

      {/* Dynamic Animated Pattern Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-100 mix-blend-screen"
        suppressHydrationWarning
        style={{
          backgroundImage: `url(${activePatternUrl})`,
          opacity: isHovered ? 0.45 : 0.15,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      {/* Subtle Metallic Edge Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/40 via-transparent to-[#0a1128]/90 pointer-events-none" />

      {/* Card Content Structure */}
      <div className="relative z-10 flex flex-col space-y-4">
        {/* Icon & Status Badge */}
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-400/20 text-cyan-400 shadow-inner group-hover:border-cyan-400/40 transition-colors">
            <Icon className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'scale-110 text-cyan-300' : ''}`} />
          </div>

          <span className="text-[10px] uppercase tracking-widest font-mono text-blue-300/70 bg-blue-900/40 px-2.5 py-1 rounded-full border border-blue-500/20">
            {isHovered ? 'Fluid Motion Active' : 'Idle State (Patterns-01)'}
          </span>
        </div>

        {/* Text Details */}
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
            {title || 'Watlys Pure Hydration'}
          </h3>
          <p className="text-sm text-blue-200/70 mt-1 leading-relaxed">
            {subtitle || 'Hover to activate the 6-frame liquid wave motion sequence.'}
          </p>
        </div>

        {children}
      </div>
    </motion.div>
  )
}
