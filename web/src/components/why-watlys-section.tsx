'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Truck, Calendar, Sparkles, CheckCircle2, X, ArrowUpRight } from 'lucide-react'

interface FeatureCard {
  id: string
  title: string
  shortDesc: string
  fullDesc: string
  icon: React.ElementType
  badge: string
  highlights: string[]
  specs: { label: string; value: string }[]
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'pure-hygienic',
    title: 'PURE & HYGIENIC',
    shortDesc: 'Quality-focused water and pharmaceutical bottle handling.',
    fullDesc: 'Watlys implements a 9-stage multi-barrier purification system combined with dual-pass 254nm UV-C lamps and activated ozone infusion. Every 19L carboy undergoes automated high-pressure hydro-thermal washing to eliminate biofilm and microscopic impurities.',
    icon: ShieldCheck,
    badge: '9-Stage Purity Standard',
    highlights: [
      'Dual UV-C & Ozone Sterilization Process',
      'Automated High-Pressure CIP Carboy Washing',
      'Zero Microbiological & E. Coli Contaminants'
    ],
    specs: [
      { label: 'pH Balance', value: '7.8 - 8.2 (Mildly Alkaline)' },
      { label: 'TDS Level', value: '140 - 180 mg/L (WHO Benchmark)' },
      { label: 'Bottle Material', value: 'BPA-Free Medical Grade Polycarbonate' }
    ]
  },
  {
    id: 'reliable-delivery',
    title: 'RELIABLE DELIVERY',
    shortDesc: 'Water delivered according to your exact schedule.',
    fullDesc: 'Our scheduled logistics network ensures your home or business never runs dry. Smart automated routing and dedicated concierges deliver replacement bottles right to your doorstep at your selected preferred time slots.',
    icon: Truck,
    badge: 'On-Time Guarantee',
    highlights: [
      'Scheduled Recurring Delivery Slot',
      'Dedicated Delivery Concierge in Your Area',
      'Live Order Tracking & Refill Reminders'
    ],
    specs: [
      { label: 'Delivery Windows', value: 'Morning (8am-12pm) & Evening (4pm-8pm)' },
      { label: 'Service Cities', value: 'Lahore, Karachi, Islamabad & Rawalpindi' },
      { label: 'Refill Speed', value: 'Same-Day / 24-Hour Express' }
    ]
  },
  {
    id: 'flexible-plans',
    title: 'FLEXIBLE PLANS',
    shortDesc: 'Weekly, monthly, or custom configurable options.',
    fullDesc: 'Customized hydration packages tailored for individuals, growing households, and large corporate floors. Easily pause, skip, or modify bottle quantities anytime with zero penalty or locked contracts.',
    icon: Calendar,
    badge: 'Zero Contract Lock-in',
    highlights: [
      'Weekly, Monthly & Annual Subscriptions',
      'Instant Bottle Count Adjustments via App',
      'Free Pause & Vacation Mode'
    ],
    specs: [
      { label: 'Subscription Discount', value: 'Up to 20% Off Retail Rates' },
      { label: 'Minimum Order', value: '1 Bottle (No Strict Minimums)' },
      { label: 'Billing Terms', value: 'Pay per delivery or monthly invoice' }
    ]
  },
  {
    id: 'modern-living',
    title: 'MADE FOR MODERN LIVING',
    shortDesc: 'Simple recurring water delivery for homes and businesses.',
    fullDesc: 'Designed to elevate your everyday living. From touchless smart coolers with auto-dispense technology to sleek glass carboy options, Watlys merges modern aesthetics with health-first mineral hydration.',
    icon: Sparkles,
    badge: 'Smart Hydration Tech',
    highlights: [
      'Compatible with Touchless IoT Coolers',
      'Sleek Eco-Friendly Recyclable Packaging',
      'Automated Monthly Billing & Invoicing'
    ],
    specs: [
      { label: 'Dispenser Support', value: 'Free Installation & Maintenance' },
      { label: 'Corporate Perks', value: 'Dedicated Account Manager' },
      { label: 'Customer Care', value: '24/7 WhatsApp Concierge Support' }
    ]
  }
]

export default function WhyWatlysSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedCard, setSelectedCard] = useState<FeatureCard | null>(null)

  // Cursor position tracking for outer-hover pattern spotlight
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 })
  const [isOutsideHovered, setIsOutsideHovered] = useState(false)

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Duplicate cards for seamless 100% infinite marquee loop
  const marqueeItems = [...FEATURE_CARDS, ...FEATURE_CARDS, ...FEATURE_CARDS]

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseEnter={() => setIsOutsideHovered(true)}
      onMouseLeave={() => setIsOutsideHovered(false)}
      className="relative py-12 sm:py-20 max-w-7xl mx-auto w-full border-t border-slate-200/80 dark:border-slate-800/60 bg-[#FAF9F6] dark:bg-[#0a1128] transition-colors duration-300 font-sans overflow-hidden select-none"
    >
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
          className="absolute w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/15 dark:bg-[#0066FF]/25 blur-2xl pointer-events-none"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />
      </div>

      {/* Editorial Header (Removes pattern spotlight on hover) */}
      <div
        onMouseEnter={(e) => {
          e.stopPropagation()
          setIsOutsideHovered(false)
        }}
        onMouseLeave={() => setIsOutsideHovered(true)}
        className="relative z-10 text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14 px-4 sm:px-8 lg:px-12"
      >
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-[#0064D0]">
          THE WATLYS ADVANTAGE
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-wide leading-tight">
          Why Choose WATLYS?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 font-light max-w-lg mx-auto">
          Hover to pause scrolling track. Click any card to explore detailed specifications & highlights.
        </p>
      </div>

      {/* INFINITE MARQUEE CAROUSEL TRACK */}
      <div 
        className="relative z-10 w-full overflow-hidden py-4"
        onMouseEnter={(e) => {
          e.stopPropagation()
          setIsPaused(true)
          setIsOutsideHovered(false)
        }}
        onMouseLeave={() => {
          setIsPaused(false)
          setIsOutsideHovered(true)
        }}
      >
        {/* Left Edge Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF9F6] dark:from-[#0a1128] to-transparent z-10 pointer-events-none" />

        {/* Right Edge Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF9F6] dark:from-[#0a1128] to-transparent z-10 pointer-events-none" />

        {/* Marquee Motion Container */}
        <motion.div
          className="flex gap-6 w-max"
          animate={isPaused ? { x: undefined } : { x: ['0%', '-33.333%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 28,
              ease: 'linear',
            },
          }}
        >
          {marqueeItems.map((item, index) => {
            const IconComp = item.icon
            return (
              <motion.div
                key={`${item.id}-${index}`}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setIsPaused(true)
                  setSelectedCard(item)
                }}
                className="w-[280px] sm:w-[320px] shrink-0 p-6 sm:p-7 bg-white dark:bg-[#131c38]/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg shadow-black/5 rounded-3xl space-y-4 hover:border-[#0064D0] dark:hover:border-[#0064D0] cursor-pointer group transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="inline-flex p-3 rounded-2xl bg-sky-50 dark:bg-[#0a1128] border border-sky-100 dark:border-slate-800 text-[#0064D0] group-hover:scale-105 transition-transform">
                    <IconComp size={22} />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-serif font-bold tracking-wide text-slate-900 dark:text-white uppercase group-hover:text-[#0064D0] dark:group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-serif font-light leading-relaxed line-clamp-2">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-[#0064D0] dark:text-sky-400 group-hover:underline">
                  <span>Explore Specs</span>
                  <ArrowUpRight size={13} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* INTERACTIVE MODAL POP-UP ON CLICK */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto"
          >
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={() => setSelectedCard(null)} />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-xl bg-white dark:bg-[#131c38] text-slate-900 dark:text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden select-text"
            >
              {/* Close Button (X) */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 z-20"
                aria-label="Close Feature Modal"
              >
                <X size={18} />
              </button>

              {/* Modal Content */}
              <div className="space-y-6 text-left">
                {/* Header Badge & Title */}
                <div className="space-y-2 pr-8">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-[#0064D0]/10 text-[#0064D0] dark:text-sky-400 border border-[#0064D0]/20">
                      {selectedCard.badge}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 pt-1">
                    <div className="p-3 rounded-2xl bg-sky-50 dark:bg-[#0a1128] border border-sky-100 dark:border-slate-800 text-[#0064D0]">
                      <selectedCard.icon size={24} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-wide">
                      {selectedCard.title}
                    </h3>
                  </div>
                </div>

                {/* Left-Aligned Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed font-sans">
                  {selectedCard.fullDesc}
                </p>

                {/* Key Specs / Highlights List */}
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0064D0] dark:text-sky-400">
                    Key Advantages & Features
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                    {selectedCard.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Specifications Grid */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0a1128] border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Technical Standards & Specs
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {selectedCard.specs.map((spec, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 block">{spec.label}</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
