'use client'

import React, { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/language'
import ProcessScrollCanvas from '@/components/ProcessScrollCanvas'
import SectionHeader from '@/components/section-header'

export default function ProcessSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  // Cursor position tracking for interactive pattern spotlight
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 })
  const [isOutsideHovered, setIsOutsideHovered] = useState(false)

  // 3D Card Hover Tilt Motion
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg'])

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleCardMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsOutsideHovered(true)
  }

  const steps = [
    { ...t.process.step1 },
    { ...t.process.step2 },
    { ...t.process.step3 },
    { ...t.process.step4 },
    { ...t.process.step5 },
  ]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const stepIndex = Math.min(4, Math.max(0, Math.floor(latest * 5)))
    setActiveStep(stepIndex)
  })

  return (
    <section
      id="process"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseEnter={() => setIsOutsideHovered(true)}
      onMouseLeave={() => setIsOutsideHovered(false)}
      className="relative z-10 w-full select-none overflow-x-hidden border-t border-border bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-sky-50/20 section-padding font-sans transition-colors duration-300 dark:bg-background dark:bg-none"
    >

      {/* Background Ambient Glow — light only */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px] dark:hidden sm:h-[800px] sm:w-[800px]" />

      {/* COMPACT CURSOR-FOLLOWING LIGHT PATTERN SPOTLIGHT (ACTIVE ONLY OUTSIDE CONTENT) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out z-0 ${
          isOutsideHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          maskImage: `radial-gradient(220px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)`,
          WebkitMaskImage: `radial-gradient(220px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)`,
        }}
      >
        {/* Subtle Light Pattern Layer */}
        <div
          className="w-full h-full opacity-20 dark:opacity-30"
          style={{
            backgroundImage: `url('/patterns/pattern-01.svg')`,
            backgroundRepeat: 'repeat',
            backgroundSize: '240px 240px',
          }}
        />
        
        {/* Soft Compact Light Glow Sphere at Cursor */}
        <div
          className="absolute w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 dark:bg-primary/25 blur-2xl pointer-events-none"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />
      </div>

      <div className="container-custom relative z-10 flex w-full flex-col items-center justify-center gap-[var(--section-header-gap)] text-center">

        {/* TOP HEADING HEADER (REMOVES PATTERN SPOTLIGHT ON HOVER) */}
        <div
          onMouseEnter={(e) => {
            e.stopPropagation()
            setIsOutsideHovered(false)
          }}
          onMouseLeave={() => setIsOutsideHovered(true)}
          className="w-full"
        >
          <SectionHeader
            eyebrow={t.home.process.eyebrow}
            title={t.home.process.title}
          />

          {/* Dynamic Animated Step Title & Description */}
          <div className="relative h-16 sm:h-20 flex items-center justify-center overflow-hidden max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute inset-0 flex flex-col items-center justify-center space-y-1"
              >
                <span className="text-xs sm:text-base font-bold uppercase tracking-wider text-primary">
                  0{activeStep + 1} / 0{steps.length} — {steps[activeStep]?.title}
                </span>
                <p className="section-lead mx-auto line-clamp-2 !text-sm">
                  {steps[activeStep]?.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="flex justify-center items-center space-x-2.5 pt-3">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeStep === idx ? 'w-10 bg-primary shadow-md shadow-primary/40' : 'w-2.5 bg-zinc-200 dark:bg-slate-800 hover:bg-zinc-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3D INTERACTIVE TILT VIEWPORT CARD (REMOVES PATTERN SPOTLIGHT ON HOVER) */}
        <div
          style={{ perspective: 1000 }}
          className="w-full max-w-3xl"
          onMouseEnter={(e) => {
            e.stopPropagation()
            setIsOutsideHovered(false)
          }}
          onMouseLeave={() => setIsOutsideHovered(true)}
        >
          <motion.div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              rotateY,
              rotateX,
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative aspect-video sm:aspect-[16/9] h-[280px] sm:h-[400px] md:h-[480px] w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-primary/40 hover:border-primary transition-all duration-300 group"
          >
            {/* High-DPI HD Sharp 3D Canvas */}
            <div style={{ transform: 'translateZ(20px)' }} className="w-full h-full">
              <ProcessScrollCanvas onStepChange={(step) => setActiveStep(step)} />
            </div>

            {/* Specular Light Reflection Overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/20 bg-gradient-to-tr from-transparent via-white/5 to-white/15 dark:border-[var(--border)] dark:bg-transparent dark:bg-none" />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
