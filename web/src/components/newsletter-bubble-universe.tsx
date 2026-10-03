'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLanguage } from '@/context/language'
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
  imageSrc: string
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
      fullArticle: 'World Health Organization guidelines emphasize that drinking water should maintain an optimal Total Dissolved Solids (TDS) range between 100 to 250 mg/L alongside an alkaline pH of 7.5 to 8.5. Watlys Natural Mineral Water is carefully calibrated through natural sandstone filtration to ensure optimal cellular absorption.',
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
      floatDuration: 9.0,
      imageSrc: '/gazette/gazette_audit.jpg'
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
      fullArticle: 'Trace minerals such as silica and bicarbonate ions act as vital binding elements in skin collagen synthesis. Regular consumption of mineral-rich water accelerates toxin elimination at cellular level, keeping skin firm and radiant.',
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
      floatDuration: 10.5,
      imageSrc: '/gazette/gazette_mountain_spring.jpg'
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
      fullArticle: 'With growing industrial urban expansion, safeguarding natural underground springs is critical. Watlys operates state-of-the-art deep aquifer tapping under strict eco-governance, ensuring zero groundwater depletion.',
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
      floatDuration: 11.5,
      imageSrc: '/gazette/gazette_policy_solar.jpg'
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
      floatDuration: 12.0,
      imageSrc: '/gazette/gazette_mountain_spring.jpg'
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
      fullArticle: 'Testing revealed over 90% of commercial bottled water contains synthetic polymer residues. Watlys utilizes pharmaceutical-grade borosilicate glass bottles and non-leaching caps to ensure total chemical purity.',
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
      floatDuration: 9.8,
      imageSrc: '/gazette/gazette_glass_bottle.jpg'
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
      floatDuration: 9.0,
      imageSrc: '/gazette/gazette_glass_bottle.jpg'
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
      floatDuration: 10.5,
      imageSrc: '/gazette/gazette_policy_solar.jpg'
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
      floatDuration: 11.5,
      imageSrc: '/gazette/gazette_tds_meter.jpg'
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
      floatDuration: 12.0,
      imageSrc: '/gazette/gazette_mountain_spring.jpg'
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
      floatDuration: 9.8,
      imageSrc: '/Waterabout.jpg'
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
      floatDuration: 9.0,
      imageSrc: '/gazette/gazette_tds_meter.jpg'
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
      floatDuration: 10.5,
      imageSrc: '/gazette/gazette_audit.jpg'
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
      floatDuration: 11.5,
      imageSrc: '/bottle-19l.jpg'
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
      floatDuration: 12.0,
      imageSrc: '/gazette/gazette_glass_bottle.jpg'
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
      floatDuration: 9.8,
      imageSrc: '/gazette/gazette_policy_solar.jpg'
    }
  ]
]

// Smooth Slow Motion Floating Canvas Specs (Positioned for Heading Proximity)
const BUBBLE_LAYOUT_SPECS = [
  {
    sizeDesktop: 290,
    sizeMobile: 135,
    posStyle: { top: '0%', left: '6%' },
    duration: 8.5,
  },
  {
    sizeDesktop: 210,
    sizeMobile: 115,
    posStyle: { top: '3%', right: '8%' },
    duration: 9.8,
  },
  {
    sizeDesktop: 140,
    sizeMobile: 90,
    posStyle: { top: '32%', left: '16%' },
    duration: 10.5,
  },
  {
    sizeDesktop: 320,
    sizeMobile: 155,
    posStyle: { top: '38%', right: '14%' },
    duration: 11.5,
  },
  {
    sizeDesktop: 180,
    sizeMobile: 110,
    posStyle: { top: '56%', left: '38%' },
    duration: 9.2,
  }
]

// Single shared Web Audio Context for water pop sound effects
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
  const { t, isRtl } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })

  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [activeModalBubble, setActiveModalBubble] = useState<BubbleItem | null>(null)
  const [clickOrigin, setClickOrigin] = useState<{ x: number; y: number } | null>(null)
  const [emailInput, setEmailInput] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [soundMuted, setSoundMuted] = useState(false)
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)

  // Play subtle entrance pops once on scroll
  useEffect(() => {
    if (isInView && !soundMuted) {
      [0, 150, 300, 450].forEach((delay, idx) => {
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

  const handleBubbleClick = (item: BubbleItem, e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined') {
      const rect = e.currentTarget.getBoundingClientRect()
      setClickOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      })
    }
    playWaterBubblePop(2.2, 0.18, soundMuted)
    setActiveModalBubble(item)
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
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => setIsHeaderHovered(false)}
      className="relative w-full pt-16 md:pt-20 pb-12 sm:pb-16 bg-transparent text-slate-900 dark:text-white overflow-hidden select-none font-sans"
    >
      {/* Header Banner */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mb-6 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-500/20 border border-sky-400/30 text-[#0064D0] dark:text-sky-300 text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-3 shadow-xs"
        >
          <Sparkles size={13} className="text-amber-400 animate-pulse" />
          <span>WATLYS INTERACTIVE NEWSLETTER UNIVERSE</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center transition-all cursor-pointer"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight font-serif mb-3">
            Explore Pure Hydration Intelligence
          </h2>
          <p className="text-slate-500 dark:text-sky-200/80 text-sm mt-2 font-sans max-w-2xl mx-auto">
            Hover or click any floating mineral bubble below
          </p>
        </motion.div>

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
        {/* Soft Cyan-Water Ambient Backdrop Glow for 4K Depth */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-r from-cyan-400/20 via-sky-400/25 to-blue-500/20 rounded-full blur-3xl pointer-events-none z-0 animate-pulse" 
          style={{ animationDuration: '8s' }} 
        />

        {/* Left Arrow Button */}
        <button
          onClick={handlePrevSet}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white/90 dark:bg-slate-900/80 hover:bg-[#0064D0] dark:hover:bg-sky-500 border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white hover:text-white flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          aria-label="Previous Bubble Set"
        >
          <ChevronLeft size={24} className={`transition-transform ${isRtl ? 'rotate-180 group-hover:translate-x-0.5' : 'group-hover:-translate-x-0.5'}`} />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNextSet}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white/90 dark:bg-slate-900/80 hover:bg-[#0064D0] dark:hover:bg-sky-500 border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white hover:text-white flex items-center justify-center backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          aria-label="Next Bubble Set"
        >
          <ChevronRight size={24} className={`transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
        </button>

        {/* SCATTERED BUBBLES CANVAS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSetIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative w-full h-[580px] sm:h-[650px] lg:h-[700px] flex items-center justify-center z-10"
          >
            {/* Desktop Scattered Positions Across Full Canvas */}
            <div className="w-full h-full relative hidden sm:block">
              {currentBubbles.map((item, index) => {
                const layout = BUBBLE_LAYOUT_SPECS[index % BUBBLE_LAYOUT_SPECS.length]
                const size = layout.sizeDesktop

                return (
                  <motion.div
                    key={item.id}
                    initial={{ y: 320, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 320, opacity: 0 }}
                    transition={{
                      duration: 4.2, // Very slow realistic underwater rise
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.3,
                    }}
                    style={{
                      position: 'absolute',
                      ...layout.posStyle,
                      width: `${size}px`,
                      height: `${size}px`
                    }}
                    className="relative group cursor-pointer"
                  >
                    {/* Inner Floating & Organic Liquid Shape Morphing */}
                    <motion.div
                      animate={{
                        y: [-10, 10, -10],
                        x: [-4, 4, -4],
                        borderRadius: [
                          "50% 50% 50% 50%",
                          "56% 44% 53% 47% / 47% 53% 47% 53%",
                          "44% 56% 46% 54% / 54% 46% 54% 46%",
                          "50% 50% 50% 50%"
                        ]
                      }}
                      transition={{
                        duration: 6 + index,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      onMouseEnter={() => playWaterBubblePop(1.5, 0.12, soundMuted)}
                      onClick={(e) => handleBubbleClick(item, e)}
                      className="relative overflow-hidden p-[2px] bg-gradient-to-tr from-cyan-300/60 via-white/90 to-blue-500/70 shadow-[0_25px_50px_rgba(0,166,255,0.28)] backdrop-blur-md group-hover:scale-108 transition-transform duration-500 w-full h-full cursor-pointer flex flex-col items-center justify-center text-center select-none"
                    >
                      {/* Top-Left Specular Light Crescent Glare */}
                      <div className="absolute top-2 left-3 w-1/2 h-1/3 bg-gradient-to-br from-white/95 via-white/40 to-transparent rounded-full blur-[1px] pointer-events-none z-20" />

                      {/* Top Rim Curved Light Streak */}
                      <div className="absolute top-1 inset-x-4 h-[2px] bg-white/80 blur-[0.5px] rounded-full pointer-events-none z-20" />

                      {/* Bottom Liquid Curved Refraction Shadow */}
                      <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_-12px_24px_rgba(0,102,255,0.38)] pointer-events-none z-20" />

                      {/* Image Container with Inner Blur Clip */}
                      <div className="w-full h-full rounded-[inherit] overflow-hidden relative">
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="w-full h-full object-cover scale-105 group-hover:scale-110 filter blur-[1.5px] group-hover:blur-none opacity-90 group-hover:opacity-100 transition-all duration-700 ease-out pointer-events-none"
                        />

                        {/* Gradient Overlay for Text Contrast */}
                        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-950/20 group-hover:from-slate-950/90 group-hover:via-slate-950/60 group-hover:to-slate-950/40 transition-colors duration-500 pointer-events-none z-5" />

                        {/* BUBBLE CONTENT OVERLAY - SHOWS ON HOVER */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center w-full px-3 pointer-events-none select-none opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 ease-out">
                          {/* Badge pill */}
                          <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-950/80 text-sky-200 backdrop-blur-md mb-1.5 border border-white/30 shadow-sm">
                            {item.badge}
                          </span>

                          {/* Main Title */}
                          <h3 className="font-serif font-extrabold text-base lg:text-xl text-white tracking-wide leading-tight mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                            {item.title}
                          </h3>

                          {/* Category / Subtitle */}
                          <p className="text-[11px] text-sky-200 font-bold tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mb-2">
                            {item.subtitle}
                          </p>

                          {/* Detailed excerpt */}
                          {size >= 290 && (
                            <p className="text-xs text-[#E0F2FE] font-medium leading-relaxed max-w-[240px] line-clamp-2 mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                              {item.excerpt}
                            </p>
                          )}

                          <div className={`inline-flex items-center space-x-1.5 ${isRtl ? 'space-x-reverse' : ''} px-3 py-1 rounded-full bg-[#0064D0] text-white text-[10px] font-bold shadow-md`}>
                            <span>{t.bubbleModal?.clickToExpand || (isRtl ? 'تفصیلات دیکھیں' : 'Click to Expand')}</span>
                            <ArrowRight size={11} className={isRtl ? 'rotate-180' : ''} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
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
                    initial={{ y: 320, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 320, opacity: 0 }}
                    transition={{
                      duration: 4.2,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.3,
                    }}
                    onClick={(e) => handleBubbleClick(item, e)}
                    className="relative group cursor-pointer flex flex-col items-center justify-center py-1"
                  >
                    {/* Inner Floating & Organic Liquid Shape Morphing */}
                    <motion.div
                      animate={{
                        y: [-8, 8, -8],
                        x: [-3, 3, -3],
                        borderRadius: [
                          "50% 50% 50% 50%",
                          "56% 44% 53% 47% / 47% 53% 47% 53%",
                          "44% 56% 46% 54% / 54% 46% 54% 46%",
                          "50% 50% 50% 50%"
                        ]
                      }}
                      transition={{
                        duration: 5 + index,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        width: `${pixelSize}px`,
                        height: `${pixelSize}px`,
                      }}
                      className="relative overflow-hidden p-[2px] bg-gradient-to-tr from-cyan-300/60 via-white/90 to-blue-500/70 shadow-[0_20px_45px_rgba(0,166,255,0.28)] backdrop-blur-md group flex flex-col items-center justify-center p-3 text-center active:scale-95 transition-transform"
                    >
                      {/* Top-Left Specular Light Crescent Glare */}
                      <div className="absolute top-1 left-2 w-1/2 h-1/3 bg-gradient-to-br from-white/95 via-white/40 to-transparent rounded-full blur-[1px] pointer-events-none z-20" />

                      {/* Top Rim Curved Light Streak */}
                      <div className="absolute top-1 inset-x-2 h-[2px] bg-white/80 blur-[0.5px] rounded-full pointer-events-none z-20" />

                      {/* Bottom Liquid Curved Refraction Shadow */}
                      <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_-8px_16px_rgba(0,102,255,0.38)] pointer-events-none z-20" />

                      {/* Image Container with Inner Blur Clip */}
                      <div className="w-full h-full rounded-[inherit] overflow-hidden relative">
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="w-full h-full object-cover scale-105 group-hover:scale-110 filter blur-[1px] group-hover:blur-none opacity-90 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                        />
                        <div className="absolute inset-0 rounded-[inherit] bg-slate-950/50 group-hover:bg-slate-950/60 transition-colors z-5" />

                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-2 text-center">
                          <span className="text-[8px] font-black uppercase tracking-widest text-sky-200 mb-0.5">{item.badge}</span>
                          <h3 className="font-serif font-extrabold text-xs text-white leading-tight drop-shadow-md">{item.title}</h3>
                          <p className="text-[9px] text-[#E0F2FE] font-bold mt-0.5 drop-shadow-xs">{item.subtitle}</p>
                        </div>
                      </div>
                    </motion.div>
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
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSetIndex === idx ? 'w-7 bg-[#0064D0] dark:bg-sky-400 shadow-xs' : 'w-2 bg-slate-300 dark:bg-white/30 hover:bg-slate-400'
              }`}
              aria-label={`Go to bubble set ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* EXPANDED BUBBLE MODAL - BUBBLE-CENTRIC SLOW ORIGIN EXPANSION & SHRINK ANIMATION */}
      <AnimatePresence>
        {activeModalBubble && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setActiveModalBubble(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md overflow-hidden"
          >
            <motion.div
              // Bubble origin expansion effect - emerges directly from clicked bubble center point
              initial={{
                x: clickOrigin && typeof window !== 'undefined' ? clickOrigin.x - window.innerWidth / 2 : 0,
                y: clickOrigin && typeof window !== 'undefined' ? clickOrigin.y - window.innerHeight / 2 : 0,
                scale: 0.08,
                opacity: 0,
                borderRadius: "100px"
              }}
              animate={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                borderRadius: "28px"
              }}
              exit={{
                x: clickOrigin && typeof window !== 'undefined' ? clickOrigin.x - window.innerWidth / 2 : 0,
                y: clickOrigin && typeof window !== 'undefined' ? clickOrigin.y - window.innerHeight / 2 : 0,
                scale: 0.08,
                opacity: 0,
                borderRadius: "100px"
              }}
              transition={{
                duration: 0.75, // Slow organic liquid expansion from bubble center
                ease: [0.16, 1, 0.3, 1], // Smooth fluid ease curve
              }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-white/95 backdrop-blur-2xl border border-blue-100 shadow-[0_30px_70px_rgba(0,102,255,0.22)] p-8 max-w-xl w-[90%] relative overflow-hidden ${isRtl ? 'text-right' : 'text-left'} z-10 font-sans`}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setActiveModalBubble(null)}
                className={`absolute top-5 ${isRtl ? 'left-5' : 'right-5'} p-2 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-all z-10 cursor-pointer`}
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Modal Inner Content - Fades in softly right as card finishes expanding */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                {/* Category Tag */}
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest rounded-full mb-3">
                  {activeModalBubble.category} • {activeModalBubble.badge}
                </span>

                {/* Main Heading */}
                <h3 className={`text-slate-900 text-2xl md:text-3xl font-bold tracking-tight mb-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {activeModalBubble.headline}
                </h3>

                {/* Description Paragraph */}
                <p className={`text-slate-600 text-sm md:text-base leading-relaxed mb-6 ${isRtl ? 'text-right leading-[2.1]' : 'text-left'}`}>
                  {activeModalBubble.excerpt}
                </p>

                {/* Highlights Box */}
                <div className={`bg-slate-50/80 rounded-2xl p-4 border border-slate-100 mb-6 ${isRtl ? 'text-right' : 'text-left'} space-y-2 text-slate-700 text-sm font-medium`}>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                    {t.bubbleModal?.keyHighlights || (isRtl ? 'اہم تحقیقی نکات' : 'Key Research Highlights')}
                  </span>
                  {activeModalBubble.highlights.map((h, i) => (
                    <div key={i} className={`flex items-center space-x-2 ${isRtl ? 'space-x-reverse' : ''}`}>
                      <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Form & Interactive CTA */}
                <form onSubmit={handleSubscribeSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <div className="relative flex-1 w-full">
                    <Mail size={16} className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder={t.bubbleModal?.pdfPlaceholder || t.newsletter.emailPlaceholder}
                      className={`w-full bg-slate-100/80 border border-slate-200 rounded-xl ${isRtl ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'} py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#0066FF] text-white font-semibold rounded-xl px-6 py-3 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all text-sm shrink-0 cursor-pointer"
                  >
                    {t.bubbleModal?.getBriefing || t.newsletter.button}
                  </button>
                </form>

                {subscribed && (
                  <div className={`mt-3 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t.bubbleModal?.subscribed || (isRtl ? '✓ سبسکرائب ہو گیا! بریفنگ آپ کی ای میل پر بھیج دی گئی ہے۔' : '✓ Subscribed! Full PDF Briefing Sent to your email.')}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
