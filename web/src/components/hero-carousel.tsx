'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/language'

export interface BannerSlide {
  _id: string
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  imageUrl: string
}

export default function HeroCarousel({ banners }: { banners?: BannerSlide[] }) {
  const { t, isRtl } = useLanguage()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Localized slides definitions
  const slides = [
    {
      _id: 'b1',
      title: t.hero.tagline,
      subtitle: t.hero.subtitle,
      buttonText: t.hero.ctaShop,
      buttonLink: '/shop',
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
    },
    {
      _id: 'b2',
      title: t.hero.tagline,
      subtitle: t.hero.subtitle,
      buttonText: t.hero.ctaStory,
      buttonLink: '/about',
      imageUrl: 'https://images.unsplash.com/photo-1548839134-6fd5e60885a3?auto=format&fit=crop&w=1200&q=80',
    },
  ]

  // Auto-advance slide helper
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(timer)
  }, [currentIdx, isHovered])

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIdx((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const currentSlide = slides[currentIdx]

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir < 0 ? 30 : -30,
    }),
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[650px] sm:h-[750px] overflow-hidden bg-[#FAF9F6] dark:bg-[#0a1128] border border-slate-200/40 dark:border-slate-800/60"
    >
      {/* Delicate background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_var(--tw-gradient-stops))] from-brand-blue/5 via-transparent to-transparent pointer-events-none" />

      {/* Slide Content */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIdx}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-8 sm:px-20"
        >
          {/* Banner Details (span 7) */}
          <div className={`lg:col-span-7 space-y-6 text-left relative z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
            <span className="inline-block text-[9px] font-bold uppercase tracking-[0.3em] text-brand-blue border-b border-brand-blue/30 pb-1">
              WATLYS PREMIER
            </span>
            <h1 className="text-4xl sm:text-7xl font-serif font-light tracking-wide text-zinc-900 dark:text-white leading-[1.08] max-w-2xl">
              {currentSlide.title}
            </h1>
            <p
              className="text-sm sm:text-base max-w-lg leading-relaxed font-light !text-[#666666]"
              style={{ color: '#666666' }}
            >
              {currentSlide.subtitle}
            </p>
            <div className="pt-6">
              <Link
                href={currentSlide.buttonLink}
                className="inline-block px-10 py-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-brand-blue dark:hover:bg-brand-blue hover:text-white dark:hover:text-white transition-colors duration-300 text-xs font-bold uppercase tracking-[0.25em]"
              >
                {currentSlide.buttonText}
              </Link>
            </div>
          </div>

          {/* Banner Graphic/Image (span 5) */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-full">
            <div className="relative w-[280px] h-[360px] sm:w-[350px] sm:h-[450px] bg-transparent">
              <Image
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                fill
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_20px_40px_rgba(255,255,255,0.02)]"
                priority
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Arrow Controls (Minimalist layout) */}
      <div className={`absolute bottom-8 z-20 flex items-center space-x-4 ${isRtl ? 'left-8' : 'right-8'}`}>
        <button
          onClick={handlePrev}
          className="p-3 border border-zinc-200 dark:border-slate-800 text-zinc-650 hover:text-zinc-950 dark:text-slate-200 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer"
          aria-label="Previous slide"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={handleNext}
          className="p-3 border border-zinc-200 dark:border-slate-800 text-zinc-650 hover:text-zinc-950 dark:text-slate-200 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer"
          aria-label="Next slide"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Manual Dot Indicators */}
      <div className={`absolute bottom-10 z-20 flex space-x-2.5 ${isRtl ? 'right-8' : 'left-8'}`}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`h-1.5 transition-all duration-500 cursor-pointer ${
              currentIdx === idx ? 'w-8 bg-brand-blue' : 'w-2 bg-zinc-300 dark:bg-zinc-850 hover:bg-zinc-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
