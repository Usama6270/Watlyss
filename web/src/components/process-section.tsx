'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/language'

export default function ProcessSection() {
  const { t, isRtl } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      ...t.process.step1,
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    },
    {
      ...t.process.step2,
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80',
    },
    {
      ...t.process.step3,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    },
    {
      ...t.process.step4,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
    },
    {
      ...t.process.step5,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const pin = pinRef.current
    const section = sectionRef.current
    if (!pin || !section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: pin,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress
        const stepIndex = Math.min(
          Math.floor(progress * steps.length),
          steps.length - 1
        )
        setActiveStep(stepIndex)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [steps.length])

  return (
    <div id="process" ref={sectionRef} className="relative w-full h-[350vh] bg-white dark:bg-[#0A0A0A]">
      {/* Pinned Sticky Box */}
      <div ref={pinRef} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-20 items-center w-full">

          {/* Frame Image Column (span 6) */}
          <div className="lg:col-span-6 relative aspect-square sm:h-[480px] w-full bg-zinc-50 dark:bg-[#111111] overflow-hidden border border-zinc-200/20 dark:border-zinc-800/30">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeStep === idx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
                  }`}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover grayscale"
                  sizes="(max-w-1024px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>

          {/* Description Caption Column (span 6) */}
          <div className={`lg:col-span-6 flex flex-col justify-center min-h-[250px] relative ${isRtl ? 'text-right' : 'text-left'}`}>
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-400 block mb-4">
              0{activeStep + 1} / 0{steps.length} — {isRtl ? 'عمل' : 'PROCESS'}
            </span>

            {/* Stepper details */}
            <div className="relative w-full">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-700 absolute top-0 left-0 right-0 ${activeStep === idx
                      ? 'opacity-100 translate-y-0 relative z-10'
                      : 'opacity-0 translate-y-6 pointer-events-none absolute z-0'
                    }`}
                >
                  <h3 className="text-3xl sm:text-5xl font-sans font-light tracking-wide text-zinc-900 dark:text-[#FAFAFA] mb-6">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-[#AAAAAA] font-light leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Stepper Progress Indicator (Muted grey bars) */}
            <div className="flex space-x-3 mt-16 z-20 relative">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-0.5 rounded-full transition-all duration-500 ${activeStep === idx ? 'w-10 bg-zinc-950 dark:bg-white' : 'w-2 bg-zinc-200 dark:bg-zinc-800'
                    }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
