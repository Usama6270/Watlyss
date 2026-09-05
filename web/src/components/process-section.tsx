'use client'

import React, { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/language'
import ProcessScrollCanvas from '@/components/ProcessScrollCanvas'
import { Droplet } from 'lucide-react'

export default function ProcessSection() {
  const { t, isRtl } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  // 3D Card Hover Tilt Motion
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
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
    <section id="process" ref={sectionRef} className="relative w-full py-16 sm:py-24 lg:py-28 px-4 bg-gradient-to-b from-slate-50 via-white to-sky-50/30 dark:from-[#0a1128] dark:via-[#0a1128] dark:to-[#0a1128] transition-colors duration-300 z-10 border-t border-slate-200/50 dark:border-slate-800/60 overflow-hidden font-sans">

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#0064D0]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center space-y-6 sm:space-y-10 text-center relative z-10">

        {/* TOP HEADING HEADER (Positioned spacious below navbar with zero overlap) */}
        <div className="space-y-3 sm:space-y-4">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-[#0064D0] inline-flex items-center gap-1.5 bg-[#0064D0]/10 px-4 py-1.5 rounded-full border border-[#0064D0]/20 shadow-sm">
            <Droplet size={14} />
            <span>{isRtl ? 'ہماری تیاری کا عمل' : 'OUR PURIFICATION PROCESS'}</span>
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-white tracking-wide leading-tight pt-1">
            5-Stage Subterranean Process
          </h2>

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
                <span className="text-xs sm:text-base font-bold uppercase tracking-wider text-[#0064D0]">
                  0{activeStep + 1} / 0{steps.length} — {steps[activeStep]?.title}
                </span>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-slate-300 font-light max-w-lg mx-auto line-clamp-2 leading-relaxed">
                  {steps[activeStep]?.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="flex justify-center items-center space-x-2.5 pt-1">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${activeStep === idx ? 'w-10 bg-[#0064D0] shadow-md shadow-[#0064D0]/40' : 'w-2.5 bg-zinc-200 dark:bg-slate-800 hover:bg-zinc-400'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* 3D INTERACTIVE TILT VIEWPORT CARD */}
        <div style={{ perspective: 1000 }} className="w-full max-w-3xl">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateY,
              rotateX,
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative aspect-video sm:aspect-[16/9] h-[280px] sm:h-[400px] md:h-[480px] w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl shadow-[#0064D0]/20 border-2 border-[#0064D0]/40 hover:border-[#0064D0] transition-all duration-300 group"
          >
            {/* High-DPI HD Sharp 3D Canvas */}
            <div style={{ transform: 'translateZ(20px)' }} className="w-full h-full">
              <ProcessScrollCanvas onStepChange={(step) => setActiveStep(step)} />
            </div>

            {/* Specular Light Reflection Overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/20 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
