'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Mail,
  CheckCircle2,
  ArrowRight,
  Volume2,
  VolumeX,
  X
} from 'lucide-react'

export interface BubbleItem {
  id: string
  title: string
  subtitle: string
  size: 'sm' | 'md' | 'lg'
  category: string
  issueNo: string
  date: string
  readTime: string
  headline: string
  excerpt: string
  fullArticle: string
  highlights: string[]
  badge: string
  gradient: string
  glowColor: string
  desktopPos: { left: string; top: string }
  floatOffset: number
  floatDuration: number
}

// 3 Sets of Scattered Newsletter Bubbles (5 items per set matching scattered positions)
const BUBBLE_SETS: BubbleItem[][] = [
  // Set 1: Water Quality & WHO Standards
  [
    {
      id: 'b1-1',
      title: 'WHO Standards',
      subtitle: 'Mineral Guidelines',
      size: 'lg',
      category: 'WHO SCIENCE',
      issueNo: 'GAZETTE #01',
      date: 'September 2026',
      readTime: '4 min read',
      headline: 'WHO Guidelines on Ideal Mineral Drinkability & pH Balance',
      excerpt: 'Comprehensive analysis of essential dissolved minerals, calcium-magnesium ratios, and physiological hydration benefits of pure alkaline sources.',
      fullArticle: 'World Health Organization guidelines emphasize that drinking water should maintain an optimal Total Dissolved Solids (TDS) range between 100 to 250 mg/L alongside an alkaline pH of 7.5 to 8.5. Watlys Natural Mineral Water is carefully calibrated through natural sandstone filtration to ensure optimal cellular absorption, supporting daily vitality without excessive sodium content.',
      highlights: [
        'Optimal TDS Range: 120 - 180 mg/L',
        'Natural Electrolyte & Silica Enrichment',
        'Certified Zero Microbiological Contaminants'
      ],
      badge: 'WHO Benchmark',
      gradient: 'from-sky-400/50 via-blue-500/40 to-indigo-600/60',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      desktopPos: { left: '8%', top: '15%' },
      floatOffset: 12,
      floatDuration: 5.5
    },
    {
      id: 'b1-2',
      title: 'Skin Hydration',
      subtitle: 'Cellular Science',
      size: 'md',
      category: 'BEAUTY SCIENCE',
      issueNo: 'GAZETTE #02',
      date: 'August 2026',
      readTime: '3 min read',
      headline: 'How Trace Silica & Alkaline Hydration Improves Dermal Elasticity',
      excerpt: 'Deep dive into micro-hydration dynamics: why structured mineral water rejuvenates skin cells faster than purified distilled water.',
      fullArticle: 'Trace minerals such as silica and bicarbonate ions act as vital binding elements in skin collagen synthesis. Regular consumption of mineral-rich water accelerates toxin elimination at cellular level, keeping skin firm, radiant, and hydrated against environmental pollutants.',
      highlights: [
        'Enriched with Bioavailable Silica',
        'Boosts Dermal Barrier Retention',
        'Combats Cellular Oxidative Stress'
      ],
      badge: 'Cellular Health',
      gradient: 'from-teal-400/50 via-emerald-500/40 to-cyan-700/60',
      glowColor: 'rgba(45, 212, 191, 0.4)',
      desktopPos: { left: '88%', top: '20%' },
      floatOffset: 12,
      floatDuration: 6.2
    },
    {
      id: 'b1-3',
      title: 'Pakistan Aquifer Audit',
      subtitle: 'National Policy',
      size: 'sm',
      category: 'NATIONAL REPORT',
      issueNo: 'GAZETTE #03',
      date: 'August 2026',
      readTime: '5 min read',
      headline: 'Pakistan Water Quality & Aquifer Safety National Report',
      excerpt: 'An independent review of municipal water standards, deep spring protection, and sustainable extraction thresholds across Pakistan.',
      fullArticle: 'With growing industrial urban expansion, safeguarding natural underground springs is critical. Watlys operates state-of-the-art deep aquifer tapping under strict eco-governance, ensuring zero groundwater depletion and 100% solar-assisted bottling processes.',
      highlights: [
        'Protected Mountain Spring Tapping',
        'Solar Hydro-Extraction Tech',
        'Zero Environmental Chemical Runoff'
      ],
      badge: 'Policy Briefing',
      gradient: 'from-blue-500/50 via-cyan-600/40 to-slate-800/60',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      desktopPos: { left: '20%', top: '45%' },
      floatOffset: 10,
      floatDuration: 7.0
    },
    {
      id: 'b1-4',
      title: 'Volcanic Springs',
      subtitle: 'Geological Filter',
      size: 'lg',
      category: 'GEOLOGY',
      issueNo: 'GAZETTE #04',
      date: 'July 2026',
      readTime: '2 min read',
      headline: 'Multi-Decade Filtration Through Volcanic Stone Stratum',
      excerpt: 'How rainwater trickling through subterranean stone layers naturally enriches with calcium and magnesium.',
      fullArticle: 'Geological filtration is nature’s most effective purification system. Over decades, water passes through porous volcanic basalt, capturing essential balance before reaching untouched sealed reservoirs.',
      highlights: [
        'Naturally Filtered Over 30 Years',
        'Rich in Native Electrolytes',
        'Zero Synthetic Mineral Additives'
      ],
      badge: 'Natural Origin',
      gradient: 'from-indigo-400/50 via-sky-500/40 to-blue-800/60',
      glowColor: 'rgba(129, 140, 248, 0.4)',
      desktopPos: { left: '82%', top: '85%' },
      floatOffset: 14,
      floatDuration: 7.8
    },
    {
      id: 'b1-5',
      title: 'Microplastics Audit',
      subtitle: 'Zero Plastic Tech',
      size: 'md',
      category: 'PURITY AUDIT',
      issueNo: 'GAZETTE #05',
      date: 'July 2026',
      readTime: '4 min read',
      headline: 'Zero Microplastics Guarantee: Glass & BPA-Free Packaging',
      excerpt: 'Why standard PET bottles leach micro-particles and how Watlys sealed glass carboys preserve pristine liquid purity.',
      fullArticle: 'Testing revealed over 90% of commercial bottled water contains synthetic polymer residues. Watlys utilizes pharmaceutical-grade borosilicate glass bottles and non-leaching caps to ensure total chemical purity from spring to glass.',
      highlights: [
        '100% Microplastic-Free Certified',
        'BPA, BPS & Phthalate-Free',
        'Sterilized UV-C Glass Bottling'
      ],
      badge: 'Purity Guarantee',
      gradient: 'from-cyan-400/50 via-sky-500/40 to-blue-700/60',
      glowColor: 'rgba(34, 211, 238, 0.4)',
      desktopPos: { left: '42%', top: '90%' },
      floatOffset: 12,
      floatDuration: 6.6
    }
  ],

  // Set 2: Eco Delivery & Innovation
  [
    {
      id: 'b2-1',
      title: 'Glass Bottling',
      subtitle: 'Eco Glass Standards',
      size: 'lg',
      category: 'SUSTAINABILITY',
      issueNo: 'ECO ISSUE #01',
      date: 'June 2026',
      readTime: '4 min read',
      headline: 'The Return to Heavyweight Recyclable Glass Bottles',
      excerpt: 'Eliminating single-use plastics across major cities through sanitized reusable glass carboys.',
      fullArticle: 'Our zero-waste circular loop system allows households and offices to enjoy pure water delivered in reusable glass carboys that undergo 7-stage thermal sterilization before each refill.',
      highlights: [
        '100+ Reuse Cycle Lifetime',
        '7-Stage Hydro-Thermal Washing',
        'Zero Single-Use Waste Footprint'
      ],
      badge: 'Circular Loop',
      gradient: 'from-cyan-400/50 via-blue-500/40 to-indigo-800/60',
      glowColor: 'rgba(34, 211, 238, 0.4)',
      desktopPos: { left: '8%', top: '15%' },
      floatOffset: 12,
      floatDuration: 5.5
    },
    {
      id: 'b2-2',
      title: 'Solar Bottling',
      subtitle: 'Zero Carbon',
      size: 'md',
      category: 'CLEAN TECH',
      issueNo: 'ECO ISSUE #02',
      date: 'May 2026',
      readTime: '3 min read',
      headline: 'Solar Powered Hydro-Filtration & Bottling Plant',
      excerpt: 'How 100% renewable energy powers our entire purification, ozone treatment, and packaging process.',
      fullArticle: 'Watlys facility generates 1.2MW of rooftop solar energy, neutralizing manufacturing emissions and setting a new green standard for beverage producers across South Asia.',
      highlights: [
        '100% On-Site Solar Power',
        'Zero Industrial Effluent Waste',
        'Carbon-Neutral Certification'
      ],
      badge: 'Clean Energy',
      gradient: 'from-amber-400/40 via-sky-500/40 to-blue-800/60',
      glowColor: 'rgba(251, 191, 36, 0.4)',
      desktopPos: { left: '88%', top: '20%' },
      floatOffset: 12,
      floatDuration: 6.2
    },
    {
      id: 'b2-3',
      title: 'Smart Dispenser',
      subtitle: 'IoT Hydration',
      size: 'sm',
      category: 'INNOVATION',
      issueNo: 'TECH ISSUE #03',
      date: 'May 2026',
      readTime: '5 min read',
      headline: 'Touchless IoT Water Coolers with Auto-UV Sterilization',
      excerpt: 'Smart sensors track daily water consumption, auto-order refills, and sterilize tap nozzles hourly.',
      fullArticle: 'Our smart dispensers feature built-in UV-C LEDs that eliminate 99.99% of surface bacteria around dispensing taps, paired with an app that alerts when bottle levels run low.',
      highlights: [
        'Automated Hourly UV-C Purification',
        'Smart App Refill Triggers',
        'Instant Hot, Cold & Ambient Temp'
      ],
      badge: 'Smart Tech',
      gradient: 'from-indigo-400/50 via-purple-500/40 to-slate-800/60',
      glowColor: 'rgba(167, 139, 250, 0.4)',
      desktopPos: { left: '20%', top: '45%' },
      floatOffset: 10,
      floatDuration: 7.0
    },
    {
      id: 'b2-4',
      title: 'Low Sodium',
      subtitle: 'Hypertension Safe',
      size: 'lg',
      category: 'CARDIOLOGY',
      issueNo: 'HEALTH #04',
      date: 'April 2026',
      readTime: '3 min read',
      headline: 'Why Low Sodium Mineral Water Matters for Blood Pressure',
      excerpt: 'Medical insights into dietary sodium reduction and maintaining healthy cardiovascular pressure.',
      fullArticle: 'High sodium in tap or mineral water can elevate fluid retention. Watlys retains sodium below 8 mg/L, making it completely safe for hypertension management and infant formula prep.',
      highlights: [
        'Ultra Low Sodium (<8mg/L)',
        'Recommended for Heart Health',
        'Infant Safe Formula Water'
      ],
      badge: 'Cardio Safe',
      gradient: 'from-rose-400/40 via-sky-500/40 to-blue-800/60',
      glowColor: 'rgba(251, 113, 133, 0.4)',
      desktopPos: { left: '82%', top: '85%' },
      floatOffset: 14,
      floatDuration: 7.8
    },
    {
      id: 'b2-5',
      title: 'Office Wellness',
      subtitle: 'Corporate Plans',
      size: 'md',
      category: 'CORPORATE',
      issueNo: 'BUSINESS #05',
      date: 'April 2026',
      readTime: '3 min read',
      headline: 'Boosting Workplace Productivity with Premium Mineral Hydration',
      excerpt: 'Studies reveal even 1% dehydration lowers cognitive performance and focus by 12%.',
      fullArticle: 'Providing staff with crisp, chilled mineral water improves daily alertness, reduces fatigue, and aligns corporate offices with modern green sustainability goals.',
      highlights: [
        'Flexible Corporate Monthly Plans',
        'Dedicated Delivery Concierge',
        'Custom Branded Glass Bottles'
      ],
      badge: 'Workplace',
      gradient: 'from-sky-400/50 via-teal-500/40 to-slate-800/60',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      desktopPos: { left: '42%', top: '90%' },
      floatOffset: 12,
      floatDuration: 6.6
    }
  ],

  // Set 3: Safety Standards & Certification
  [
    {
      id: 'b3-1',
      title: 'TDS Balance',
      subtitle: 'Perfect Ratio',
      size: 'lg',
      category: 'LAB REPORT',
      issueNo: 'LAB #01',
      date: 'March 2026',
      readTime: '4 min read',
      headline: 'Optimal Total Dissolved Solids: Why Zero TDS Reverse Osmosis is Flawed',
      excerpt: 'Demystifying mineral stripping: why pure spring mineral water outperforms demineralized RO water.',
      fullArticle: 'Demineralized RO water can leech minerals from human teeth and bones over long-term use. Watlys maintains natural balanced TDS containing vital calcium, magnesium, potassium, and silica.',
      highlights: [
        'Balanced Mineral Spectrum',
        'Protects Bone Density & Teeth',
        'Crisp Natural Mountain Taste'
      ],
      badge: 'Lab Certified',
      gradient: 'from-sky-400/50 via-indigo-500/40 to-slate-800/60',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      desktopPos: { left: '8%', top: '15%' },
      floatOffset: 12,
      floatDuration: 5.5
    },
    {
      id: 'b3-2',
      title: 'Heavy Metal Free',
      subtitle: 'ICP-MS Testing',
      size: 'md',
      category: 'SAFETY AUDIT',
      issueNo: 'LAB #02',
      date: 'March 2026',
      readTime: '3 min read',
      headline: 'Triple ICP-MS Spectrometry Testing for Lead & Arsenic Safeguards',
      excerpt: 'Zero tolerance testing protocols ensuring complete immunity from heavy metal industrial runoff.',
      fullArticle: 'Every batch undergoes ICP-MS laboratory mass spectrometry testing down to parts-per-trillion levels, guaranteeing absolute freedom from lead, arsenic, mercury, or cadmium.',
      highlights: [
        'Parts-Per-Trillion Detection Limit',
        'Zero Heavy Metals Certified',
        'Batch Quality Code on Every Cap'
      ],
      badge: 'Safety First',
      gradient: 'from-teal-400/50 via-cyan-500/40 to-blue-800/60',
      glowColor: 'rgba(45, 212, 191, 0.4)',
      desktopPos: { left: '88%', top: '20%' },
      floatOffset: 12,
      floatDuration: 6.2
    },
    {
      id: 'b3-3',
      title: 'Infant Safe',
      subtitle: 'Pediatric Standard',
      size: 'sm',
      category: 'PEDIATRICS',
      issueNo: 'LAB #03',
      date: 'February 2026',
      readTime: '4 min read',
      headline: 'Pediatric Hydration & Safe Baby Formula Preparation Guidelines',
      excerpt: 'Why pristine low-nitrate water is critical during early child growth and digestive health.',
      fullArticle: 'Infants have sensitive renal systems that cannot process elevated nitrate or sodium levels. Watlys guarantees zero nitrates and soft mineral levels perfectly suited for baby feeding.',
      highlights: [
        'Zero Nitrates & Nitrites',
        'Micro-Filtered Ultra Soft Water',
        'Pediatrician Recommended'
      ],
      badge: 'Infant Safe',
      gradient: 'from-blue-400/50 via-sky-500/40 to-slate-800/60',
      glowColor: 'rgba(96, 165, 250, 0.4)',
      desktopPos: { left: '20%', top: '45%' },
      floatOffset: 10,
      floatDuration: 7.0
    },
    {
      id: 'b3-4',
      title: 'Ozone Shield',
      subtitle: 'Pure Oxidation',
      size: 'lg',
      category: 'PURIFICATION',
      issueNo: 'LAB #04',
      date: 'February 2026',
      readTime: '2 min read',
      headline: 'Residue-Free Ozone Sterilization in Sealed Bottling',
      excerpt: 'How activated oxygen sanitizes water without chlorine taste or harmful chemical byproducts.',
      fullArticle: 'Ozone (O₃) naturally oxidizes any potential airborne micro-organisms in bottles and converts back into pure oxygen gas (O₂) within hours, leaving zero chemical residue.',
      highlights: [
        'Chlorine-Free Sterilization',
        'Converts into Pure Oxygen',
        'Preserves Natural Crisp Springs'
      ],
      badge: 'Ozone Pure',
      gradient: 'from-indigo-400/50 via-cyan-500/40 to-slate-800/60',
      glowColor: 'rgba(129, 140, 248, 0.4)',
      desktopPos: { left: '82%', top: '85%' },
      floatOffset: 14,
      floatDuration: 7.8
    },
    {
      id: 'b3-5',
      title: 'Monthly Gazette',
      subtitle: 'Print & Digital',
      size: 'md',
      category: 'PUBLICATIONS',
      issueNo: 'LAB #05',
      date: 'January 2026',
      readTime: '5 min read',
      headline: 'Subscribe to Receive Watlys Monthly Printed & PDF Hydration Gazette',
      excerpt: 'Join over 25,000 households receiving our monthly research updates and spring water delivery perks.',
      fullArticle: 'Subscribers get exclusive early access to water safety reports, discount vouchers on 19L glass carboy subscriptions, and free home dispenser servicing every 6 months.',
      highlights: [
        'Monthly Free PDF Briefings',
        'Exclusive Subscriber Discounts',
        'Bi-Annual Free Cooler Servicing'
      ],
      badge: 'VIP Club',
      gradient: 'from-emerald-400/50 via-sky-500/40 to-blue-800/60',
      glowColor: 'rgba(52, 211, 153, 0.4)',
      desktopPos: { left: '42%', top: '90%' },
      floatOffset: 12,
      floatDuration: 6.6
    }
  ]
]

// Absolute Coordinate Layout Specs for Scattered Canvas
// Bubble 1 (Large 300px): Top-Left (top: 15%, left: 8%)
// Bubble 2 (Medium 180px): Top-Right (top: 20%, right: 12%)
// Bubble 3 (Small 100px): Center-Left (top: 45%, left: 20%)
// Bubble 4 (X-Large 340px): Bottom-Right (bottom: 15%, right: 18%)
// Bubble 5 (Medium 160px): Bottom-Center (bottom: 10%, left: 42%)
const BUBBLE_LAYOUT_SPECS = [
  {
    sizeDesktop: 300,
    sizeMobile: 130,
    posStyle: { top: '15%', left: '8%' },
    duration: 5.5,
  },
  {
    sizeDesktop: 180,
    sizeMobile: 110,
    posStyle: { top: '20%', right: '12%' },
    duration: 6.2,
  },
  {
    sizeDesktop: 100,
    sizeMobile: 85,
    posStyle: { top: '45%', left: '20%' },
    duration: 7.0,
  },
  {
    sizeDesktop: 340,
    sizeMobile: 150,
    posStyle: { bottom: '15%', right: '18%' },
    duration: 7.8,
  },
  {
    sizeDesktop: 160,
    sizeMobile: 105,
    posStyle: { bottom: '10%', left: '42%' },
    duration: 6.6,
  }
]

// Single shared Web Audio Context for non-blocking fast performance
let sharedAudioCtx: AudioContext | null = null

const playWaterBubblePop = (pitchOffset = 0, volume = 0.12, isMuted = false) => {
  if (isMuted || typeof window === 'undefined') return
  try {
    if (!sharedAudioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtxClass) return
      sharedAudioCtx = new AudioCtxClass()
    }
    const ctx = sharedAudioCtx
    if (!ctx) return

    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const startFreq = 400 + pitchOffset * 130

    osc.type = 'sine'
    osc.frequency.setValueAtTime(startFreq, now)
    osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, now + 0.06)

    gain.gain.setValueAtTime(volume, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.08)
  } catch (e) {
    // Non-blocking fallback
  }
}

export default function NewsletterBubbleUniverse() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })

  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [activeHoverBubble, setActiveHoverBubble] = useState<BubbleItem | null>(null)
  const [emailInput, setEmailInput] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [soundMuted, setSoundMuted] = useState(false)

  // Play subtle entrance pops once on scroll
  useEffect(() => {
    if (isInView && !soundMuted) {
      [0, 100, 200, 300].forEach((delay, idx) => {
        setTimeout(() => {
          playWaterBubblePop(idx * 0.7, 0.1, soundMuted)
        }, delay)
      })
    }
  }, [isInView, soundMuted])

  const handleNextSet = () => {
    playWaterBubblePop(2, 0.15, soundMuted)
    setCurrentSetIndex((prev) => (prev + 1) % BUBBLE_SETS.length)
  }

  const handlePrevSet = () => {
    playWaterBubblePop(0.5, 0.15, soundMuted)
    setCurrentSetIndex((prev) => (prev - 1 + BUBBLE_SETS.length) % BUBBLE_SETS.length)
  }

  const handleBubbleHover = (item: BubbleItem) => {
    playWaterBubblePop(1.5, 0.12, soundMuted)
    setActiveHoverBubble(item)
  }

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput) return
    playWaterBubblePop(3, 0.2, soundMuted)
    setSubscribed(true)
    setTimeout(() => {
      setEmailInput('')
      setSubscribed(false)
    }, 4000)
  }

  const currentBubbles = BUBBLE_SETS[currentSetIndex]

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-16 md:pt-20 pb-12 sm:pb-16 bg-transparent text-slate-900 dark:text-white overflow-hidden select-none font-sans"
    >
      {/* Header Banner */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mb-6 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-500/20 border border-sky-400/30 text-[#0064D0] dark:text-sky-300 text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-3 shadow-xs"
        >
          <Sparkles size={13} className="text-amber-400 animate-pulse" />
          <span>WATLYS INTERACTIVE NEWSLETTER UNIVERSE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-wide leading-tight mb-3"
        >
          Explore Pure Hydration Intelligence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-xs sm:text-sm text-slate-600 dark:text-sky-200/80 max-w-2xl mx-auto font-sans leading-relaxed"
        >
          Hover over any floating mineral bubble below to unlock detailed water research briefings & subscribe directly to our monthly Gazette.
        </motion.p>

        {/* Audio Toggle */}
        <button
          onClick={() => setSoundMuted(!soundMuted)}
          className="mt-3 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200 dark:border-white/15 text-[10px] sm:text-[11px] font-medium text-slate-700 dark:text-sky-200 transition-all cursor-pointer shadow-xs"
          title={soundMuted ? 'Unmute water pop sound effects' : 'Mute water pop sound effects'}
        >
          {soundMuted ? <VolumeX size={13} className="text-rose-500" /> : <Volume2 size={13} className="text-emerald-500" />}
          <span>{soundMuted ? 'Sound Muted' : 'Water Pop Audio On'}</span>
        </button>
      </div>

      {/* MAIN BUBBLE UNIVERSE CANVAS */}
      <div className="relative max-w-7xl mx-auto min-h-[600px] sm:min-h-[680px] lg:min-h-[720px] px-4 flex items-center justify-center">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrevSet}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white/90 dark:bg-slate-900/80 hover:bg-[#0064D0] dark:hover:bg-sky-500 border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white hover:text-white flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
          aria-label="Previous Bubble Set"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNextSet}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white/90 dark:bg-slate-900/80 hover:bg-[#0064D0] dark:hover:bg-sky-500 border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white hover:text-white flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
          aria-label="Next Bubble Set"
        >
          <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* SCATTERED BUBBLES CANVAS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSetIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full h-[580px] sm:h-[650px] lg:h-[700px] flex items-center justify-center"
          >
            {/* Desktop Scattered Positions Across Full Canvas */}
            <div className="w-full h-full relative hidden sm:block">
              {currentBubbles.map((item, index) => {
                const layout = BUBBLE_LAYOUT_SPECS[index % BUBBLE_LAYOUT_SPECS.length]
                const size = layout.sizeDesktop

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={
                      isInView
                        ? {
                            y: [-12, 12, -12],
                            x: [-6, 6, -6],
                            rotate: [-2, 2, -2],
                            opacity: 1,
                            scale: 1
                          }
                        : {}
                    }
                    transition={{
                      y: {
                        duration: layout.duration,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: index * 0.12
                      },
                      x: {
                        duration: layout.duration * 1.25,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: index * 0.08
                      },
                      rotate: {
                        duration: layout.duration * 1.1,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: index * 0.05
                      },
                      opacity: { duration: 0.4, delay: index * 0.05 },
                      scale: { duration: 0.4, delay: index * 0.05 }
                    }}
                    style={{
                      position: 'absolute',
                      ...layout.posStyle,
                      width: `${size}px`,
                      height: `${size}px`,
                      boxShadow:
                        'inset 6px 6px 18px rgba(255, 255, 255, 0.7), inset -6px -6px 20px rgba(0, 102, 255, 0.35), 0 0 50px rgba(0, 102, 255, 0.4)'
                    }}
                    onMouseEnter={() => handleBubbleHover(item)}
                    className={`absolute cursor-pointer rounded-full group z-10 bg-gradient-to-br ${item.gradient} backdrop-blur-md border border-white/60 dark:border-sky-300/50 shadow-[0_0_50px_rgba(0,102,255,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_70px_rgba(0,102,255,0.6)] flex flex-col items-center justify-center p-5 text-center select-none overflow-hidden`}
                  >
                    {/* Top-Left Glossy 3D Arc Glare */}
                    <div className="absolute top-2.5 left-5 w-2/5 h-1/4 bg-gradient-to-b from-white/70 via-white/30 to-transparent rounded-full -rotate-45 pointer-events-none blur-[0.5px]" />

                    {/* Bottom-Right Deep Reflection */}
                    <div className="absolute bottom-2.5 right-5 w-1/3 h-1/4 bg-gradient-to-t from-sky-400/30 to-transparent rounded-full pointer-events-none blur-sm" />

                    {/* Badge */}
                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-950/70 text-sky-200 backdrop-blur-xs mb-1.5 border border-white/30 shadow-xs">
                      {item.badge}
                    </span>

                    {/* Proportional Layout for Each Bubble Size */}
                    {size >= 340 ? (
                      <>
                        <span className="text-[11px] font-bold text-sky-200/90 tracking-wider mb-1">
                          {item.category} • {item.issueNo}
                        </span>
                        <h3 className="font-serif font-extrabold text-xl lg:text-2xl text-white tracking-wide leading-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#E0F2FE] font-medium leading-relaxed max-w-[260px] line-clamp-2 mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                          {item.excerpt}
                        </p>
                        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#0064D0] group-hover:bg-sky-500 text-white text-xs font-bold shadow-md transition-transform group-hover:scale-105">
                          <span>Read Gazette Issue</span>
                          <ArrowRight size={12} />
                        </div>
                      </>
                    ) : size >= 300 ? (
                      <>
                        <h3 className="font-serif font-extrabold text-lg lg:text-xl text-white tracking-wide leading-tight mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#E0F2FE] font-bold tracking-wide max-w-[220px] line-clamp-2 mb-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                          {item.subtitle}
                        </p>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#0064D0] text-white text-[10px] font-bold shadow-xs">
                          <span>Hover to Read</span>
                          <ArrowRight size={10} />
                        </div>
                      </>
                    ) : size >= 180 ? (
                      <>
                        <h3 className="font-serif font-extrabold text-sm lg:text-base text-white tracking-wide leading-tight mb-0.5 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-[#E0F2FE] font-bold tracking-wider line-clamp-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                          {item.subtitle}
                        </p>
                        <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[9px] font-bold text-white uppercase tracking-wider bg-[#0064D0] px-2 py-0.5 rounded-full shadow-xs">
                          Read Brief
                        </div>
                      </>
                    ) : size >= 160 ? (
                      <>
                        <h3 className="font-serif font-extrabold text-xs lg:text-sm text-white tracking-wide leading-tight mb-0.5 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                          {item.title}
                        </h3>
                        <p className="text-[10px] text-[#E0F2FE] font-bold tracking-wider line-clamp-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                          {item.subtitle}
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="font-serif font-extrabold text-[11px] text-white tracking-wide leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                          {item.title}
                        </h3>
                        <p className="text-[8px] text-[#E0F2FE] font-bold tracking-tight line-clamp-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                          {item.subtitle}
                        </p>
                      </>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Mobile Responsive Grid Layout */}
            <div className="w-full grid grid-cols-2 gap-3 sm:hidden px-4">
              {currentBubbles.map((item, index) => {
                const layout = BUBBLE_LAYOUT_SPECS[index % BUBBLE_LAYOUT_SPECS.length]
                const pixelSize = layout.sizeMobile

                return (
                  <motion.div
                    key={item.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleBubbleHover(item)}
                    className="flex flex-col items-center justify-center cursor-pointer py-1"
                  >
                    <div
                      style={{
                        width: `${pixelSize}px`,
                        height: `${pixelSize}px`,
                        boxShadow:
                          'inset 4px 4px 12px rgba(255, 255, 255, 0.6), inset -4px -4px 14px rgba(0, 102, 255, 0.3), 0 0 30px rgba(0, 102, 255, 0.3)'
                      }}
                      className={`rounded-full bg-gradient-to-br ${item.gradient} backdrop-blur-md border border-white/50 flex flex-col items-center justify-center p-3 text-center relative overflow-hidden active:scale-95 transition-transform`}
                    >
                      <div className="absolute top-1 left-2 w-1/2 h-1/3 bg-white/40 rounded-full -rotate-45 pointer-events-none" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-sky-200 mb-0.5">{item.badge}</span>
                      <h3 className="font-serif font-extrabold text-xs text-white leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">{item.title}</h3>
                      <p className="text-[9px] text-[#E0F2FE] font-bold mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">{item.subtitle}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Set Indicator Dots */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-2">
          {BUBBLE_SETS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                playWaterBubblePop(idx, 0.12, soundMuted)
                setCurrentSetIndex(idx)
              }}
              className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                currentSetIndex === idx ? 'w-7 bg-[#0064D0] dark:bg-sky-400 shadow-xs' : 'w-2 bg-slate-300 dark:bg-white/30 hover:bg-slate-400'
              }`}
              aria-label={`Go to bubble set ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* POPUP CARD MODAL */}
      <AnimatePresence>
        {activeHoverBubble && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseLeave={() => setActiveHoverBubble(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
          >
            <div className="absolute inset-0" onClick={() => setActiveHoverBubble(null)} />

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/30 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveHoverBubble(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-rose-500 hover:text-white text-slate-600 dark:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-200 dark:border-white/20 z-20"
                aria-label="Close Newsletter Card"
              >
                <X size={18} />
              </button>

              {/* POPUP CONTENT */}
              <div className="relative z-10 text-left font-sans space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#0064D0]/10 dark:bg-sky-500/20 text-[#0064D0] dark:text-sky-300 border border-[#0064D0]/20 dark:border-sky-400/30">
                    {activeHoverBubble.category}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">• {activeHoverBubble.issueNo}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">• {activeHoverBubble.date}</span>
                  <span className="text-xs text-amber-600 dark:text-amber-300 font-bold ml-auto">{activeHoverBubble.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-wide leading-tight">
                  {activeHoverBubble.headline}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-sky-100/90 leading-relaxed font-sans">
                  {activeHoverBubble.excerpt}
                </p>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p className="font-serif italic">"{activeHoverBubble.fullArticle}"</p>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#0064D0] dark:text-sky-300">Issue Highlights:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeHoverBubble.highlights.map((h, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SUBSCRIBE FORM */}
                <div className="pt-3 border-t border-slate-200 dark:border-white/15">
                  <div className="mb-2">
                    <h4 className="text-xs font-serif font-bold text-slate-900 dark:text-white">Subscribe to receive this edition & future briefings</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Get monthly mineral research delivered directly to your inbox.</p>
                  </div>

                  <form onSubmit={handleSubscribeSubmit} className="flex flex-col sm:flex-row items-center gap-2.5">
                    <div className="relative w-full sm:flex-1">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0064D0] dark:text-sky-300" />
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 focus:border-[#0064D0] dark:focus:border-sky-400 rounded-full text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0064D0]/30 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#0064D0] hover:bg-[#0052ad] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1.5 shrink-0"
                    >
                      <span>Subscribe</span>
                      <ArrowRight size={13} />
                    </button>
                  </form>

                  {subscribed && (
                    <motion.div
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2.5 p-2.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold text-center border border-emerald-400/40 flex items-center justify-center space-x-2"
                    >
                      <CheckCircle2 size={15} />
                      <span>Subscribed! Check your inbox for the full PDF briefing.</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
