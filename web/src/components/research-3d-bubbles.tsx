'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, ArrowUpRight, Droplet } from 'lucide-react'
import Link from 'next/link'

export interface BubbleArticle {
  id: string
  slug: string
  num: string
  tag: string
  category: string
  title: string
  excerpt: string
  badge: string
  badgeColor: string
  imageSrc: string
  date: string
}

interface Research3DBubblesProps {
  articles: BubbleArticle[]
  activeArticleId?: string
  onSelectArticle?: (article: BubbleArticle) => void
}

export default function Research3DBubbles({
  articles,
  activeArticleId,
  onSelectArticle
}: Research3DBubblesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(activeArticleId || articles[0]?.id || '1')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Physics state for floating 3D bubbles rising from footer line
  const [bubblePositions, setBubblePositions] = useState<
    {
      id: string
      x: number
      y: number
      scale: number
      baseSize: number
      floatOffset: number
      stuck: boolean
    }[]
  >([])

  // Initialize bubbles near the bottom (footer boundary)
  useEffect(() => {
    const initialBubbles = articles.slice(0, 6).map((art, idx) => {
      // Horizontal distribution across section
      const posX = 10 + idx * 16 + (Math.random() * 4 - 2)
      // Start lower near bottom of section
      const posY = 85 + (idx % 2) * 10
      return {
        id: art.id,
        x: posX,
        y: posY,
        scale: 0.7,
        baseSize: 120 + (idx % 3) * 15, // 120px - 150px size
        floatOffset: idx * 1.5,
        stuck: false
      }
    })
    setBubblePositions(initialBubbles)
  }, [articles])

  // Physics animation loop: float up from footer to Research section and hover around there
  useEffect(() => {
    let animId: number
    let time = 0

    const updatePhysics = () => {
      time += 0.015
      setBubblePositions(prev =>
        prev.map(b => {
          let { x, y, scale, floatOffset, stuck, baseSize } = b
          // Target float height near Research Articles section header area (around 15% - 40%)
          const targetY = 20 + Math.sin(time + floatOffset) * 12

          if (!stuck) {
            y -= 0.5
            if (y <= targetY) {
              stuck = true
              y = targetY
            }
          } else {
            y = targetY + Math.sin(time * 0.8 + floatOffset) * 8
            x += Math.cos(time * 0.5 + floatOffset) * 0.12
          }

          if (x < 5) x = 5
          if (x > 88) x = 88

          // When stuck at Research section, bubbles expand ("bare ho jayei")
          const targetScale = stuck ? 1.05 : 0.7
          scale += (targetScale - scale) * 0.05

          return { ...b, x, y, scale, stuck }
        })
      )
      animId = requestAnimationFrame(updatePhysics)
    }

    animId = requestAnimationFrame(updatePhysics)
    return () => cancelAnimationFrame(animId)
  }, [])

  // Mouse move handler for 3D tilt calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[380px] sm:h-[440px] pointer-events-none select-none my-4"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#0064D0]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-sky-300/15 rounded-full blur-3xl" />
      </div>

      {/* RISING & FLOATING 3D BUBBLES */}
      <div className="absolute inset-0 pointer-events-none">
        {bubblePositions.map((b) => {
          const article = articles.find(a => a.id === b.id)
          if (!article) return null

          const isHovered = hoveredId === b.id

          let rotateX = 0
          let rotateY = 0

          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const bx = (b.x / 100) * rect.width
            const by = (b.y / 100) * rect.height
            const dx = (mousePos.x - bx) / rect.width
            const dy = (mousePos.y - by) / rect.height
            rotateX = dy * 45
            rotateY = -dx * 45
          }

          const currentSize = isHovered ? b.baseSize * 1.3 : b.baseSize * b.scale

          return (
            <motion.div
              key={b.id}
              onClick={() => {
                setHoveredId(b.id)
                if (onSelectArticle) onSelectArticle(article)
              }}
              onMouseEnter={() => {
                setHoveredId(b.id)
                if (onSelectArticle) onSelectArticle(article)
              }}
              className="absolute pointer-events-auto cursor-pointer group z-30"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${currentSize}px`,
                height: `${currentSize}px`,
                marginLeft: `-${currentSize / 2}px`,
                marginTop: `-${currentSize / 2}px`,
                perspective: 1000
              }}
              animate={{
                scale: isHovered ? 1.15 : 1,
                y: [0, -8, 0]
              }}
              transition={{
                scale: { duration: 0.25, ease: 'easeOut' },
                y: { duration: 3.5 + b.floatOffset, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              {/* 3D LIQUID GLASS SPHERE */}
              <div
                className={`relative w-full h-full rounded-full transition-all duration-300 flex items-center justify-center p-3 overflow-hidden backdrop-blur-md ${
                  isHovered
                    ? 'shadow-[inset_-12px_-12px_28px_rgba(0,100,208,0.45),0_22px_45px_rgba(0,100,208,0.5)] border-2 border-white dark:border-sky-300 ring-4 ring-[#0064D0]/40 scale-105'
                    : 'shadow-[inset_-8px_-8px_20px_rgba(0,100,208,0.25),0_12px_28px_rgba(0,100,208,0.25)] border border-white/70 dark:border-sky-400/40 hover:scale-110'
                }`}
                style={{
                  background:
                    'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.95) 0%, rgba(186, 230, 253, 0.45) 30%, rgba(0, 100, 208, 0.25) 70%, rgba(2, 44, 96, 0.5) 100%)',
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
                }}
              >
                {/* 3D Specular Highlight */}
                <div className="absolute top-2 left-3 w-1/2 h-1/3 bg-gradient-to-b from-white/90 to-transparent rounded-full transform -rotate-45 pointer-events-none opacity-85" />
                <div className="absolute bottom-2 right-3 w-1/4 h-1/4 bg-sky-200/50 rounded-full blur-xs pointer-events-none" />

                {/* INSIDE BUBBLE CONTENT */}
                <div className="relative z-10 w-full h-full rounded-full overflow-hidden flex flex-col items-center justify-center text-center p-2 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={article.imageSrc}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-65 transition-opacity duration-300 rounded-full mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-[#0064D0]/30 to-transparent rounded-full" />

                  <div className="relative z-20 space-y-1 text-white flex flex-col items-center justify-center px-1">
                    <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs ${article.badgeColor}`}>
                      {article.num} • {article.tag}
                    </span>
                    <h4 className="text-[10px] sm:text-xs font-serif font-bold line-clamp-2 leading-tight drop-shadow-md">
                      {article.title}
                    </h4>

                    {/* Interactive indicator when hovering */}
                    <div className="pt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-1 text-[9px] text-sky-200 font-sans font-bold">
                      <Eye size={10} />
                      <span>EXPLORE 3D</span>
                    </div>
                  </div>
                </div>

                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dashed border-white/80 animate-spin"
                    style={{ animationDuration: '10s' }}
                  />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
