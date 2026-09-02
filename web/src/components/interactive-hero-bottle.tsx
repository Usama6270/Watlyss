'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, Droplet, Sparkles, Activity, X } from 'lucide-react'

export interface Hotspot {
  id: string
  title: string
  value: string
  icon: React.ElementType
  x: number
  y: number
  cardPosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const BOTTLE_HOTSPOTS: Hotspot[] = [
  {
    id: 'material',
    title: 'Material',
    value: 'Recycled Glass',
    icon: ShieldCheck,
    x: 50,
    y: 13,
    cardPosition: 'top-right',
  },
  {
    id: 'capacity',
    title: 'Capacity',
    value: '1 Litre',
    icon: Droplet,
    x: 35,
    y: 33,
    cardPosition: 'top-left',
  },
  {
    id: 'minerals',
    title: 'Mineral Content',
    value: 'TDS 180 mg/L',
    icon: Sparkles,
    x: 65,
    y: 56,
    cardPosition: 'bottom-right',
  },
  {
    id: 'ph',
    title: 'pH Level',
    value: '7.4',
    icon: Activity,
    x: 44,
    y: 83,
    cardPosition: 'bottom-left',
  },
]

export default function InteractiveHeroBottle() {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null)
  const [canHover, setCanHover] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkPointer = () => {
      const isHoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const isDesktopWidth = window.innerWidth >= 768
      setCanHover(isHoverCapable && isDesktopWidth)
    }

    checkPointer()

    const mediaQueryList = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setCanHover(e.matches && window.innerWidth >= 768)
    }

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleMediaChange)
    } else {
      mediaQueryList.addListener(handleMediaChange)
    }

    window.addEventListener('resize', checkPointer)
    return () => {
      window.removeEventListener('resize', checkPointer)
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleMediaChange)
      } else {
        mediaQueryList.removeListener(handleMediaChange)
      }
    }
  }, [])

  // Cursor-follow motion values with spring physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics configuration for smooth, elastic cursor follow (stiffness: 150, damping: 20)
  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), springConfig)
  const translateX = useSpring(useTransform(mouseX, [-1, 1], [-12, 12]), springConfig)
  const translateY = useSpring(useTransform(mouseY, [-1, 1], [-12, 12]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Calculate cursor offset normalized from -1 to 1 on X and Y axes
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    mouseX.set(Math.max(-1, Math.min(1, x)))
    mouseY.set(Math.max(-1, Math.min(1, y)))
  }

  const handleMouseLeave = () => {
    if (!canHover) return
    // Smoothly animate back to neutral resting position on mouse exit
    mouseX.set(0)
    mouseY.set(0)
  }

  const activeHotspot = BOTTLE_HOTSPOTS.find((h) => h.id === activeHotspotId)

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setActiveHotspotId(null)}
      style={{ perspective: 1000 }}
      className="relative w-full h-[520px] sm:h-[660px] lg:h-[720px] flex items-center justify-center select-none cursor-default overflow-hidden sm:overflow-visible"
    >
      {/* Subtle Soft Ambient Light Radial Glow */}
      <div className="absolute w-[340px] h-[520px] sm:w-[480px] sm:h-[660px] bg-gradient-to-b from-[#0064D0]/12 via-[#0064D0]/4 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Subtle Idle Floating/Bobbing Animation Wrapper */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative flex items-center justify-center"
      >
        {/* 2. Desktop 3D Cursor-Follow Parallax Wrapper (Unified Bottle Group: Cap + Neck + Body) */}
        <motion.div
          style={{
            rotateX: canHover ? rotateX : 0,
            rotateY: canHover ? rotateY : 0,
            x: canHover ? translateX : 0,
            y: canHover ? translateY : 0,
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 50%',
          }}
          className="relative w-[280px] h-[450px] sm:w-[400px] sm:h-[630px] lg:w-[440px] lg:h-[680px] flex justify-center items-center max-w-full"
        >
          {/* Complete Bottle Image (Body, Neck, Cap/Top contained together as a single unified 3D object) */}
          <div className="relative w-full h-full mix-blend-multiply dark:mix-blend-normal">
            <Image
              src="/waterbottle.png"
              alt="Watlys Premier Water Bottle"
              fill
              priority
              className="object-contain filter drop-shadow-[0_20px_45px_rgba(0,100,208,0.15)]"
            />
          </div>

          {/* 3–4 Small, Subtly Pulsing Dot Markers */}
          {BOTTLE_HOTSPOTS.map((spot) => {
            const isActive = activeHotspotId === spot.id
            return (
              <div
                key={spot.id}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveHotspotId(isActive ? null : spot.id)
                  }}
                  className="relative group focus:outline-none cursor-pointer p-2.5 flex items-center justify-center"
                  aria-label={`Toggle ${spot.title} spec`}
                >
                  {/* Soft Pulse Ring */}
                  <span
                    className={`absolute w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0064D0] transition-all duration-300 ${
                      isActive
                        ? 'animate-ping opacity-75'
                        : 'opacity-25 group-hover:opacity-65 animate-pulse'
                    }`}
                  />

                  {/* Center Hotspot Dot */}
                  <span
                    className={`relative block rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-4 h-4 bg-[#0064D0] border-2 border-white scale-110 shadow-[0_0_15px_#0064D0] opacity-100'
                        : 'w-3 h-3 bg-white border border-[#0064D0]/70 opacity-75 group-hover:opacity-100 group-hover:scale-125 shadow-[0_0_8px_rgba(0,100,208,0.5)]'
                    }`}
                  />
                </button>
              </div>
            )
          })}

          {/* Thin Animated Connecting Leader Line (Desktop) */}
          {canHover && activeHotspot && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
              <motion.line
                x1={`${activeHotspot.x}%`}
                y1={`${activeHotspot.y}%`}
                x2={
                  activeHotspot.cardPosition.includes('right')
                    ? `${activeHotspot.x + 22}%`
                    : `${activeHotspot.x - 22}%`
                }
                y2={`${activeHotspot.y}%`}
                stroke="#0064D0"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </svg>
          )}

          {/* Floating Spec Card Reveal */}
          <AnimatePresence mode="wait">
            {activeHotspot && (
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, scale: 0.94, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className={`absolute z-40 pointer-events-auto ${
                  !canHover
                    ? 'bottom-[-40px] left-1/2 -translate-x-1/2 w-[88%] max-w-[260px]'
                    : getDesktopCardPosition(activeHotspot.cardPosition)
                }`}
              >
                <div className="bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 shadow-[0_12px_35px_rgba(0,0,0,0.14)] rounded-xl p-3.5 text-left relative min-w-[200px]">
                  <button
                    onClick={() => setActiveHotspotId(null)}
                    className="absolute top-2.5 right-2.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors p-1 cursor-pointer"
                    aria-label="Close card"
                  >
                    <X size={13} />
                  </button>

                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 rounded-md bg-[#0064D0]/10 flex items-center justify-center text-[#0064D0]">
                      <activeHotspot.icon size={13} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 font-sans">
                      {activeHotspot.title}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white font-sans pl-8">
                    {activeHotspot.title} — {activeHotspot.value}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

function getDesktopCardPosition(pos: Hotspot['cardPosition']) {
  switch (pos) {
    case 'top-right':
      return 'top-[2%] left-[86%] sm:left-[90%]'
    case 'top-left':
      return 'top-[18%] right-[86%] sm:right-[90%]'
    case 'bottom-right':
      return 'top-[50%] left-[86%] sm:left-[90%]'
    case 'bottom-left':
      return 'top-[75%] right-[86%] sm:right-[90%]'
    default:
      return 'top-1/2 left-full ml-4 -translate-y-1/2'
  }
}
