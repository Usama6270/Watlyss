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

// Smooth Slow Motion Floating Canvas Specs (Premium balanced layout — no edge cuts)
const BUBBLE_LAYOUT_SPECS = [
  {
    sizeDesktop: 260,
    sizeMobile: 135,
    posStyle: { top: '2%', left: '9%' },
    duration: 8.5,
  },
  {
    sizeDesktop: 200,
    sizeMobile: 115,
    posStyle: { top: '4%', right: '10%' },
    duration: 9.8,
  },
  {
    sizeDesktop: 130,
    sizeMobile: 90,
    posStyle: { top: '28%', left: '22%' },
    duration: 10.5,
  },
  {
    sizeDesktop: 300,
    sizeMobile: 155,
    posStyle: { top: '34%', right: '12%' },
    duration: 11.5,
  },
  {
    sizeDesktop: 170,
    sizeMobile: 110,
    posStyle: { top: '60%', left: '40%' },
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
      <div className="relative max-w-7xl mx-auto min-h-[620px] sm:min-h-[720px] lg:min-h-[840px] xl:min-h-[880px] px-4 flex items-center justify-center">
        {/* ====== 4K PREMIUM DEPTH LAYERS ====== */}
        {/* Layer 1: Deep abyss violet-blue ambient base glow (clipped to section so it never overflows cut) */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none opacity-90"
          style={{
            background: 'radial-gradient(ellipse 60% 55% at 50% 55%, rgba(56,189,248,0.22) 0%, rgba(59,130,246,0.12) 38%, rgba(99,102,241,0.05) 70%, transparent 92%)',
          }}
        />
        {/* Layer 2: Off-center rim light for asymmetrical depth */}
        <div
          className="absolute -z-10 top-[14%] left-[8%] w-[52%] h-[52%] rounded-full pointer-events-none opacity-75"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(125,211,252,0.35) 0%, rgba(56,189,248,0.09) 50%, transparent 80%)',
            filter: 'blur(55px)',
          }}
        />
        {/* Layer 3: Warm bottom-right counter-glow for cinematic balance */}
        <div
          className="absolute -z-10 bottom-[10%] right-[6%] w-[46%] h-[46%] rounded-full pointer-events-none opacity-42"
          style={{
            background: 'radial-gradient(circle at 70% 70%, rgba(196,181,253,0.23) 0%, rgba(167,139,250,0.05) 50%, transparent 80%)',
            filter: 'blur(65px)',
          }}
        />
        {/* Layer 4: Moving underwater caustic light streaks */}
        <div
          className="absolute -z-5 inset-0 pointer-events-none opacity-[0.15]"
          style={{
            background: `
              radial-gradient(ellipse 20% 40% at 20% 30%, rgba(255,255,255,0.9) 0%, transparent 70%),
              radial-gradient(ellipse 15% 35% at 80% 60%, rgba(186,230,253,0.9) 0%, transparent 70%),
              radial-gradient(ellipse 10% 25% at 50% 85%, rgba(255,255,255,0.8) 0%, transparent 70%)
            `,
            animation: 'causticShift 14s ease-in-out infinite',
          }}
        />
        {/* Layer 5: Fine particulate shimmer / floating dust motes */}
        <div
          className="absolute -z-5 inset-0 pointer-events-none opacity-[0.32]"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 25%, rgba(224,242,254,0.9) 0.8px, transparent 1.5px),
                              radial-gradient(circle at 75% 45%, rgba(186,230,253,0.8) 0.7px, transparent 1.4px),
                              radial-gradient(circle at 35% 75%, rgba(255,255,255,0.9) 0.6px, transparent 1.2px),
                              radial-gradient(circle at 85% 82%, rgba(224,242,254,0.8) 0.7px, transparent 1.4px),
                              radial-gradient(circle at 50% 15%, rgba(255,255,255,0.7) 0.5px, transparent 1.1px)`,
            backgroundSize: '60% 80%, 55% 70%, 50% 65%, 65% 75%, 45% 55%',
            animation: 'motesFloat 22s linear infinite',
          }}
        />

        {/* Left Arrow Button */}
        <button
          onClick={handlePrevSet}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/85 dark:bg-slate-900/75 hover:bg-[#0064D0] dark:hover:bg-sky-500 border border-white/60 dark:border-white/15 text-slate-800 dark:text-white hover:text-white flex items-center justify-center backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,102,255,0.25)] hover:shadow-[0_20px_50px_rgba(0,102,255,0.45)] hover:scale-110 active:scale-95 transition-all duration-500 ease-out cursor-pointer group"
          aria-label="Previous Bubble Set"
        >
          <ChevronLeft size={26} className={`transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover:translate-x-0.5' : 'group-hover:-translate-x-1'}`} />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNextSet}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/85 dark:bg-slate-900/75 hover:bg-[#0064D0] dark:hover:bg-sky-500 border border-white/60 dark:border-white/15 text-slate-800 dark:text-white hover:text-white flex items-center justify-center backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,102,255,0.25)] hover:shadow-[0_20px_50px_rgba(0,102,255,0.45)] hover:scale-110 active:scale-95 transition-all duration-500 ease-out cursor-pointer group"
          aria-label="Next Bubble Set"
        >
          <ChevronRight size={26} className={`transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-1'}`} />
        </button>

        {/* SCATTERED BUBBLES CANVAS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSetIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(12px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[600px] sm:h-[690px] lg:h-[810px] xl:h-[840px] flex items-center justify-center z-10"
          >
            {/* Desktop Scattered Positions Across Full Canvas */}
            <div className="w-full h-full relative hidden sm:block">
              {currentBubbles.map((item, index) => {
                const layout = BUBBLE_LAYOUT_SPECS[index % BUBBLE_LAYOUT_SPECS.length]
                const size = layout.sizeDesktop
                const isSmall = size < 160
                const isMedium = size >= 160 && size < 260

                // Premium luxury hover scaling — modest + elegant (no overflow cut)
                const hoverScale = isSmall ? 1.75 : isMedium ? 1.32 : 1.14
                const hoverGlowBlur = isSmall ? 50 : isMedium ? 60 : 65
                const hoverLift = isSmall ? -18 : isMedium ? -15 : -10

                return (
                  <motion.div
                    key={item.id}
                    initial={{ y: 780, opacity: 0, scale: 0.65, filter: 'blur(18px)' }}
                    animate={isInView ? {
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      filter: 'blur(0px)',
                    } : {
                      y: 780,
                      opacity: 0,
                      scale: 0.65,
                      filter: 'blur(18px)',
                    }}
                    transition={{
                      duration: 7.5,
                      ease: [0.16, 0.9, 0.2, 1],
                      delay: index * 0.85,
                    }}
                    style={{
                      position: 'absolute',
                      ...layout.posStyle,
                      width: `${size}px`,
                      height: `${size}px`,
                    }}
                    className={`relative group cursor-pointer ${isSmall ? 'hover:z-[70]' : 'hover:z-50'} transition-[z-index] duration-300`}
                  >
                    {/* ====== OUTER HALO / CAUSTIC GLOW (scales before bubble itself) ====== */}
                    <motion.div
                      aria-hidden
                      className="absolute inset-0 rounded-full pointer-events-none"
                      initial={{ opacity: 0.55 }}
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${item.glowColor.replace('0.4', '0.55')} 0%, ${item.glowColor.replace('0.4', '0.15')} 45%, transparent 75%)`,
                        filter: `blur(${hoverGlowBlur * 0.55}px)`,
                        transform: 'scale(1.45)',
                      }}
                      whileHover={{
                        scale: [1.45, 2.6, 2.3],
                        opacity: [0.55, 0.95, 0.85],
                        transition: {
                          scale: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 1.15 },
                        },
                      }}
                    />

                    {/* ====== DEEP SOFT SHADOW LAYER (under bubble) ====== */}
                    <motion.div
                      aria-hidden
                      className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                      style={{
                        bottom: `-${size * 0.18}px`,
                        width: `${size * 0.75}px`,
                        height: `${size * 0.18}px`,
                        background: `${item.glowColor.replace('0.4', '0.35')}`,
                        filter: 'blur(18px)',
                      }}
                      whileHover={{
                        scale: 1.5,
                        opacity: 1.4,
                        filter: 'blur(28px)',
                        y: 10,
                        transition: { duration: 0.9, ease: 'easeOut' },
                      }}
                    />

                    {/* ====== MAIN BUBBLE ORB: slow morph + hover breathe ====== */}
                    <motion.div
                      animate={{
                        y: [-14, 14, -14],
                        x: [-6, 6, -6],
                        borderRadius: [
                          "50% 50% 50% 50% / 55% 55% 45% 45%",
                          "54% 46% 52% 48% / 48% 52% 46% 54%",
                          "46% 54% 48% 52% / 54% 46% 52% 48%",
                          "50% 50% 50% 50% / 55% 55% 45% 45%",
                        ],
                      }}
                      transition={{
                        duration: 9.5 + index * 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      onMouseEnter={() => playWaterBubblePop(1.5, 0.12, soundMuted)}
                      onClick={(e) => handleBubbleClick(item, e)}
                      style={{ transformOrigin: 'center center', willChange: 'transform, box-shadow' }}
                      className="relative overflow-hidden p-[2.5px] bg-gradient-to-br from-white/95 via-sky-200/80 to-cyan-400/70 dark:from-white/90 dark:via-sky-100/70 dark:to-cyan-300/60 shadow-[0_30px_80px_rgba(0,120,255,0.35),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-md w-full h-full cursor-pointer flex flex-col items-center justify-center text-center select-none rounded-[inherit]"
                      whileHover={{
                        // SLOW PROGRESSIVE GROWTH — 6 keyframes over 2.2s (feels like emerging from screen)
                        scale: [1, 1.12, 1.28, 1.42, hoverScale * 1.05, hoverScale],
                        y: [0, hoverLift * 0.18, hoverLift * 0.42, hoverLift * 0.7, hoverLift * 1.08, hoverLift],
                        boxShadow: [
                          '0 30px 80px rgba(0,120,255,0.35), 0 0 0 1px rgba(255,255,255,0.5) inset',
                          '0 40px 100px rgba(0,130,255,0.42), 0 0 0 1.2px rgba(255,255,255,0.65) inset',
                          '0 52px 130px ' + item.glowColor.replace('0.4', '0.52') + ', 0 0 0 1.3px rgba(255,255,255,0.75) inset',
                          '0 62px 150px ' + item.glowColor.replace('0.4', '0.6') + ', 0 0 0 1.4px rgba(255,255,255,0.82) inset',
                          '0 70px 165px ' + item.glowColor.replace('0.4', '0.68') + ', 0 0 0 1.5px rgba(255,255,255,0.88) inset',
                          '0 58px 140px ' + item.glowColor.replace('0.4', '0.58') + ', 0 0 0 1.5px rgba(255,255,255,0.85) inset',
                        ],
                        transition: {
                          scale: {
                            // Slow deliberate growth — premium water drop emergence feel
                            duration: 2.2,
                            ease: [0.22, 1, 0.36, 1],
                            times: [0, 0.22, 0.44, 0.66, 0.86, 1],
                          },
                          y: {
                            duration: 2.1,
                            ease: [0.22, 1, 0.36, 1],
                            times: [0, 0.2, 0.42, 0.66, 0.86, 1],
                          },
                          boxShadow: {
                            duration: 2.2,
                            ease: [0.22, 1, 0.36, 1],
                            times: [0, 0.22, 0.44, 0.66, 0.86, 1],
                          },
                        },
                      }}
                      whileTap={{
                        scale: hoverScale * 0.94,
                        transition: { duration: 0.22, ease: 'easeOut' },
                      }}
                    >
                      {/* Top-Left Specular Crescent Glare — soft glass highlight */}
                      <div className="absolute top-2.5 left-3.5 w-1/2 h-[38%] bg-gradient-to-br from-white via-white/60 to-transparent rounded-[50%] blur-[0.5px] pointer-events-none z-20 opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
                      {/* Secondary soft sub-glare */}
                      <div className="absolute top-6 right-6 w-[22%] h-[22%] bg-gradient-to-bl from-white/70 to-transparent rounded-full blur-[1px] pointer-events-none z-20 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                      {/* Top Rim Curved Light Streak */}
                      <div className="absolute top-[3px] inset-x-5 h-[2.5px] bg-gradient-to-r from-transparent via-white to-transparent blur-[0.3px] rounded-full pointer-events-none z-20 opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
                      {/* Inner vertical light sheen */}
                      <div className="absolute top-[12%] bottom-[15%] left-[14%] w-[2px] bg-gradient-to-b from-white/90 via-white/30 to-transparent blur-[0.4px] rounded-full pointer-events-none z-20 opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                      {/* Bottom Liquid Curved Refraction Shadow — lighter so image shines through */}
                      <div className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 transition-all duration-[1200ms] ease-out" style={{ boxShadow: 'inset 0 -18px 40px rgba(0,70,180,0.28), inset 0 14px 32px rgba(255,255,255,0.18), inset -14px -4px 28px rgba(120,190,255,0.12)' }} />
                      {/* Rim boundary refraction */}
                      <div className="absolute inset-0 rounded-[inherit] pointer-events-none z-20" style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.55) inset, 0 0 0 3px rgba(186,230,253,0.25) inset' }} />

                      {/* Image Container with Inner Blur Clip */}
                      <div className="w-full h-full rounded-[inherit] overflow-hidden relative">
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="w-full h-full object-cover scale-100 group-hover:scale-125 transition-transform duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none transition-[filter,opacity] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[filter:blur(0px)_saturate(1.3)_contrast(1.22)_brightness(1.12)_drop-shadow(0_8px_24px_rgba(0,0,0,0.35))] group-hover:opacity-100"
                          style={{
                            filter: 'blur(1.2px) saturate(0.95) contrast(1.0) brightness(0.98)',
                            opacity: 0.9,
                          }}
                        />
                        {/* Chromatic color wash — very soft, fades away on hover to reveal image */}
                        <motion.div
                          className="absolute inset-0 rounded-[inherit] mix-blend-soft-light pointer-events-none z-4 opacity-40"
                          style={{
                            background: `linear-gradient(135deg, ${item.glowColor.replace('0.4', '0.4')} 0%, transparent 50%, rgba(99,102,241,0.12) 100%)`,
                          }}
                          whileHover={{
                            opacity: 0.12,
                            transition: { duration: 1.2 },
                          }}
                        />

                        {/* Gradient Overlay for Text Contrast — LIGHTER default, FADES on hover for 4K reveal */}
                        <div
                          className="absolute inset-0 rounded-[inherit] pointer-events-none z-5 transition-all duration-[1200ms] ease-out opacity-100 group-hover:opacity-25"
                          style={{
                            background: 'radial-gradient(ellipse 70% 45% at 50% 90%, rgba(2,6,23,0.72) 0%, rgba(2,6,23,0.35) 50%, rgba(2,6,23,0.08) 78%, transparent 92%)',
                          }}
                        />

                        {/* ====== HOVER TEXT CONTENT — ONLY HEADING VISIBLE ON HOVER ====== */}
                        <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center w-full pointer-events-none select-none transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] opacity-0 group-hover:opacity-100 scale-88 group-hover:scale-100 ${isSmall ? 'px-3.5 py-3' : isMedium ? 'px-5 py-4' : 'px-6 py-4.5'}`}>
                          {/* MINIMAL soft tint halo — ONLY behind heading, leaves rest of image crystal clear */}
                          <div
                            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none -z-0 transition-all duration-700 opacity-0 group-hover:opacity-100 rounded-[50%]"
                            style={{
                              width: isSmall ? '220px' : isMedium ? '290px' : '370px',
                              height: isSmall ? '90px' : isMedium ? '115px' : '150px',
                              background: 'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(2,6,23,0.78) 0%, rgba(2,6,23,0.38) 45%, rgba(2,6,23,0.08) 75%, transparent 92%)',
                              filter: 'blur(6px)',
                            }}
                          />

                          {/* Title — ONLY ELEMENT VISIBLE ON HOVER */}
                          <h3 className={`relative font-serif font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_14px_rgba(0,0,0,0.98)] ${isSmall ? 'text-[18px] w-[240px] max-w-[96%]' : isMedium ? 'text-[24px] w-[310px] max-w-[96%]' : 'text-[32px] w-[400px] max-w-[96%]'}`}>
                            {item.title}
                          </h3>
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

                      {/* Bottom Liquid Curved Refraction Shadow — lighter */}
                      <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_-6px_14px_rgba(0,102,255,0.22)] pointer-events-none z-20 transition-all duration-500" />

                      {/* Image Container with Inner Blur Clip */}
                      <div className="w-full h-full rounded-[inherit] overflow-hidden relative">
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 pointer-events-none transition-[filter,opacity] duration-700 ease-out group-hover:[filter:blur(0px)_saturate(1.25)_contrast(1.18)_brightness(1.08)_drop-shadow(0_3px_12px_rgba(0,0,0,0.3))] group-hover:opacity-100"
                          style={{
                            filter: 'blur(1px) saturate(0.95) contrast(1.0) brightness(0.98)',
                            opacity: 0.92,
                          }}
                        />
                        <div className="absolute inset-0 rounded-[inherit] bg-slate-950/35 group-hover:bg-slate-950/15 transition-colors duration-700 z-5" />

                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-2 text-center">
                          <h3 className="font-serif font-extrabold text-[15px] text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.98)]">{item.title}</h3>
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

      {/* EXPANDED BUBBLE MODAL - BUBBLE-TO-MODAL SLOW LIQUID EMERGENCE */}
      <AnimatePresence mode="wait">
        {activeModalBubble && (
          <>
            {/* ====== BACKDROP: emerges radially from clicked bubble point ====== */}
            <motion.div
              key="modal-backdrop"
              initial={{
                opacity: 0,
                background: `radial-gradient(circle at ${
                  clickOrigin ? `${clickOrigin.x}px ${clickOrigin.y}px` : '50% 50%'
                }, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.4) 40%, transparent 80%)`,
                backdropFilter: 'blur(0px)',
              }}
              animate={{
                opacity: 1,
                background: `radial-gradient(circle at ${
                  clickOrigin ? `${clickOrigin.x}px ${clickOrigin.y}px` : '50% 50%'
                }, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.72) 55%, rgba(2,6,23,0.9) 100%)`,
                backdropFilter: 'blur(14px)',
              }}
              exit={{
                opacity: 0,
                background: `radial-gradient(circle at ${
                  clickOrigin ? `${clickOrigin.x}px ${clickOrigin.y}px` : '50% 50%'
                }, rgba(2,6,23,0.9) 0%, rgba(2,6,23,0.4) 40%, transparent 80%)`,
                backdropFilter: 'blur(0px)',
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveModalBubble(null)}
              className="fixed inset-0 z-[60] overflow-hidden cursor-pointer"
            >
              {/* Subtle underwater caustic shimmer */}
              <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 25% 50% at 25% 30%, rgba(186,230,253,0.9) 0%, transparent 70%),
                               radial-gradient(ellipse 20% 45% at 75% 70%, rgba(125,211,252,0.9) 0%, transparent 70%)`,
                  animation: 'causticShift 11s ease-in-out infinite',
                }}
              />
            </motion.div>

            {/* ====== HALO BURST from bubble point ====== */}
            <motion.div
              key="modal-halo"
              className="fixed z-[65] pointer-events-none"
              initial={{
                left: clickOrigin?.x ?? '50%',
                top: clickOrigin?.y ?? '50%',
                x: '-50%',
                y: '-50%',
                width: '20px',
                height: '20px',
                borderRadius: '9999px',
                opacity: 0.9,
                background: `radial-gradient(circle, ${activeModalBubble.glowColor.replace('0.4', '0.95')} 0%, ${activeModalBubble.glowColor.replace('0.4', '0.45')} 45%, transparent 80%)`,
                filter: 'blur(8px)',
                scale: 1,
              }}
              animate={{
                width: ['20px', '1400px'],
                height: ['20px', '1400px'],
                opacity: [0.95, 0],
                filter: ['blur(8px)', 'blur(40px)'],
                transition: {
                  duration: 1.15,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            />

            {/* ====== MAIN MODAL CARD: slow emergence from bubble center with liquid morph ====== */}
            <motion.div
              key="modal-card-wrap"
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
            >
              <motion.div
                key="modal-card"
                // Liquid emergence: starts perfectly circular at bubble size → morphs to card
                initial={{
                  x: clickOrigin && typeof window !== 'undefined' ? clickOrigin.x - window.innerWidth / 2 : 0,
                  y: clickOrigin && typeof window !== 'undefined' ? clickOrigin.y - window.innerHeight / 2 : 0,
                  scale: 0.12,
                  opacity: 0,
                  borderRadius: '50%',
                  filter: 'blur(10px)',
                  rotate: -8,
                }}
                animate={{
                  x: [
                    clickOrigin && typeof window !== 'undefined' ? clickOrigin.x - window.innerWidth / 2 : 0,
                    (clickOrigin && typeof window !== 'undefined' ? clickOrigin.x - window.innerWidth / 2 : 0) * 0.4,
                    0,
                  ],
                  y: [
                    clickOrigin && typeof window !== 'undefined' ? clickOrigin.y - window.innerHeight / 2 : 0,
                    (clickOrigin && typeof window !== 'undefined' ? clickOrigin.y - window.innerHeight / 2 : 0) * 0.35,
                    0,
                  ],
                  scale: [0.12, 0.85, 1],
                  opacity: [0, 1, 1],
                  borderRadius: ['50%', '44% 56% 52% 48% / 48% 52% 46% 54%', '28px'],
                  filter: ['blur(10px)', 'blur(2px)', 'blur(0px)'],
                  rotate: [-8, 2, 0],
                  boxShadow: [
                    `0 0 0 rgba(0,0,0,0)`,
                    `0 40px 120px ${activeModalBubble.glowColor.replace('0.4', '0.55')}, 0 0 0 2px rgba(255,255,255,0.7) inset`,
                    `0 60px 160px ${activeModalBubble.glowColor.replace('0.4', '0.5')}, 0 0 0 1.5px rgba(255,255,255,0.65) inset, 0 0 0 6px rgba(2,132,199,0.12)`,
                  ],
                }}
                exit={{
                  x: clickOrigin && typeof window !== 'undefined' ? clickOrigin.x - window.innerWidth / 2 : 0,
                  y: clickOrigin && typeof window !== 'undefined' ? clickOrigin.y - window.innerHeight / 2 : 0,
                  scale: 0.12,
                  opacity: 0,
                  borderRadius: '50%',
                  filter: 'blur(12px)',
                  rotate: 6,
                  transition: {
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                transition={{
                  duration: 1.25,
                  ease: [0.16, 1, 0.3, 1],
                  x: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
                  borderRadius: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.55 },
                  filter: { duration: 0.95 },
                  rotate: { duration: 1.25 },
                  boxShadow: { duration: 1.25 },
                }}
                onClick={(e) => e.stopPropagation()}
                className={`relative overflow-hidden pointer-events-auto
                  bg-gradient-to-br from-white/96 via-white to-sky-50/95
                  dark:from-slate-900/96 dark:via-slate-900 dark:to-slate-950/95
                  backdrop-blur-3xl
                  border border-sky-100 dark:border-sky-900/60
                  p-7 sm:p-9 max-w-xl w-[93%] sm:w-[88%] ${isRtl ? 'text-right' : 'text-left'} font-sans`}
              >
                {/* Ambient water tint wash */}
                <div
                  className="absolute -top-20 -right-20 w-[380px] h-[380px] rounded-full pointer-events-none opacity-60"
                  style={{
                    background: `radial-gradient(circle at 60% 40%, ${activeModalBubble.glowColor.replace('0.4', '0.38')} 0%, transparent 65%)`,
                    filter: 'blur(30px)',
                  }}
                />
                <div
                  className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none opacity-50"
                  style={{
                    background: `radial-gradient(circle at 40% 60%, rgba(99,102,241,0.18) 0%, transparent 70%)`,
                    filter: 'blur(35px)',
                  }}
                />

                {/* Top rim glass reflection */}
                <div className="absolute top-[2px] inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-sky-300/80 to-transparent rounded-full pointer-events-none opacity-90" />
                {/* Side sheen */}
                <div className="absolute top-8 bottom-10 left-4 w-[2px] bg-gradient-to-b from-sky-200/80 via-sky-100/20 to-transparent rounded-full pointer-events-none opacity-70" />

                {/* Modal Close Button */}
                <button
                  onClick={() => setActiveModalBubble(null)}
                  className={`absolute top-5 ${isRtl ? 'left-5' : 'right-5'} p-2 rounded-full bg-slate-100/90 hover:bg-sky-100 text-slate-500 hover:text-sky-700 transition-all z-30 cursor-pointer border border-slate-200/70 hover:border-sky-200 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 duration-300`}
                  aria-label="Close modal"
                >
                  <X size={18} strokeWidth={2.4} />
                </button>

                {/* Bubble category badge chip (matching bubble's pill) */}
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.75, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative mb-5"
                >
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-900/40 dark:to-indigo-900/40 border border-sky-200/70 dark:border-sky-700/40 text-sky-700 dark:text-sky-300 text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm">
                    <Sparkles size={12} className="text-sky-500" />
                    {activeModalBubble.category}
                  </span>
                  <span className="ml-2 inline-block px-2.5 py-0.5 rounded-full bg-slate-900/85 text-sky-100 text-[10px] font-black uppercase tracking-widest">
                    {activeModalBubble.badge}
                  </span>
                </motion.div>

                {/* ====== STAGGERED INNER TEXT CONTENT: cascades AFTER bubble morphs to card ====== */}
                <div className="relative z-10">
                  {/* Issue / date / read-time meta row */}
                  <motion.div
                    initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.85, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex ${isRtl ? 'justify-end' : 'justify-start'} items-center gap-3 flex-wrap mb-3`}
                  >
                    <span className="text-[10.5px] font-black text-sky-600 dark:text-sky-400 tracking-widest uppercase border border-sky-200/70 dark:border-sky-700/40 px-2.5 py-0.5 rounded-full">
                      {activeModalBubble.issueNo}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {activeModalBubble.date}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      ✦ {activeModalBubble.readTime}
                    </span>
                  </motion.div>

                  {/* Main Heading */}
                  <motion.h3
                    initial={{ opacity: 0, y: 22, filter: 'blur(6px)', letterSpacing: '0.08em' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '-0.01em' }}
                    transition={{ delay: 1.0, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-slate-900 dark:text-white text-[26px] md:text-[34px] font-black tracking-[-0.015em] leading-[1.1] mb-4 ${isRtl ? 'text-right' : 'text-left'}`}
                  >
                    {activeModalBubble.headline}
                  </motion.h3>

                  {/* Gradient divider line */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[2px] w-20 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 mb-5"
                  />

                  {/* Description Paragraph */}
                  <motion.p
                    initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 1.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-slate-600 dark:text-slate-300 text-[14.5px] leading-relaxed mb-6 ${isRtl ? 'text-right leading-[2.2]' : 'text-left'}`}
                  >
                    {activeModalBubble.excerpt}
                  </motion.p>

                  {/* Highlights Box */}
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.35, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative rounded-3xl p-5 mb-7 border border-sky-100/80 dark:border-sky-900/50 overflow-hidden ${isRtl ? 'text-right' : 'text-left'} space-y-2.5 text-slate-700 dark:text-slate-200 text-[14px] font-medium`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(240,249,255,0.85) 0%, rgba(238,242,255,0.75) 100%)',
                    }}
                  >
                    <div
                      className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-70"
                      style={{
                        background: `radial-gradient(circle, ${activeModalBubble.glowColor.replace('0.4', '0.35')} 0%, transparent 70%)`,
                        filter: 'blur(20px)',
                      }}
                    />
                    <span className="text-[10.5px] font-black uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300 block mb-1">
                      ✦ {t.bubbleModal?.keyHighlights || (isRtl ? 'اہم تحقیقی نکات' : 'Key Research Highlights')}
                    </span>
                    {activeModalBubble.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.45 + i * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className={`relative flex items-start ${isRtl ? 'flex-row-reverse' : ''} gap-2.5`}
                      >
                        <span className="mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-md">
                          <CheckCircle2 size={13} strokeWidth={3} />
                        </span>
                        <span className="flex-1">{h}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Form & Interactive CTA */}
                  <motion.form
                    onSubmit={handleSubscribeSubmit}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.75, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full"
                  >
                    <div className="relative flex-1 w-full group">
                      <Mail size={17} className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors`} />
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder={t.bubbleModal?.pdfPlaceholder || t.newsletter.emailPlaceholder}
                        className={`w-full bg-white/95 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-2xl ${isRtl ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'} py-3.5 text-slate-800 dark:text-slate-100 text-[14px] font-medium focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/15 shadow-sm hover:shadow-md transition-all duration-300 placeholder:text-slate-400`}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                      className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-[#0064D0] via-[#007AFF] to-[#0099FF] text-white font-bold rounded-2xl px-6 py-3.5 shadow-[0_14px_40px_rgba(0,100,208,0.45)] hover:shadow-[0_20px_55px_rgba(0,100,208,0.6)] transition-all text-[14px] shrink-0 cursor-pointer tracking-wide"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
                      <span className="relative inline-flex items-center gap-2">
                        {t.bubbleModal?.getBriefing || t.newsletter.button}
                        <ArrowRight size={15} className={isRtl ? 'rotate-180' : ''} />
                      </span>
                    </motion.button>
                  </motion.form>

                  {subscribed && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className={`mt-4 text-[12.5px] font-bold text-emerald-800 dark:text-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40 px-4 py-3 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 shadow-sm flex items-center gap-2 ${isRtl ? 'text-right flex-row-reverse' : 'text-left'}`}
                    >
                      <CheckCircle2 size={17} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{t.bubbleModal?.subscribed || (isRtl ? '✓ سبسکرائب ہو گیا! مکمل بریفنگ PDF آپ کی ای میل پر بھیج دی گئی ہے۔' : '✓ Subscribed! Full PDF Briefing has been sent to your email.')}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
