'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/language'
import {
  Sparkles,
  Mail,
  CheckCircle2,
  ArrowRight,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'

/** Premium underwater easing — soft ease-out for hover inflate */
const EASE_HOVER: [number, number, number, number] = [0.16, 1, 0.3, 1]
/** Deliberate ease-in-out for morph open/close */
const EASE_MORPH: [number, number, number, number] = [0.45, 0.05, 0.55, 0.95]
/** Slow brand hover — inflate / glow / lift (seconds) */
const HOVER_DURATION = 0.85
const HOVER_CAPTION_DELAY = 0.38
const HOVER_CAPTION_DURATION = 0.5
const HOVER_SCALE = 1.2
const HOVER_LIFT = -14

export type BubbleOrigin = { x: number; y: number; w: number; h: number }

type Depth = 'near' | 'mid' | 'far'
type Breakpoint = 'mobile' | 'tablet' | 'desktop'

export interface BubbleItem {
  id: string
  title: string
  subtitle: string
  category: string
  issueNo: string
  date: string
  readTime: string
  headline: string
  excerpt: string
  fullArticle: string
  highlights: string[]
  badge: string
  glowColor: string
  imageSrc: string
  depth: Depth
  /** Horizontal lane 0–100 (%) */
  lane: number
  /** Rise duration in seconds */
  duration: number
  /** Negative delay so bubbles start mid-flight */
  delay: number
  wobbleA: number
  wobbleB: number
  wobbleC: number
  wobbleD: number
  /** Show on these breakpoints */
  show: Breakpoint[]
}

const IMAGE = {
  audit: '/gazette/gazette_audit.webp',
  mountain: '/gazette/gazette_mountain_spring.webp',
  solar: '/gazette/gazette_policy_solar.webp',
  glass: '/gazette/gazette_glass_bottle.webp',
  tds: '/gazette/gazette_tds_meter.webp',
  bottle: '/bottle-19l.webp',
  about: '/Waterabout.webp',
} as const

const BUBBLES: BubbleItem[] = [
  {
    id: 'who',
    title: 'WHO Standards',
    subtitle: 'Mineral Guidelines',
    category: 'WHO SCIENCE',
    issueNo: 'GAZETTE #01',
    date: 'September 2026',
    readTime: '4 min read',
    headline: 'WHO Guidelines on Ideal Mineral Drinkability & pH Balance',
    excerpt:
      'Comprehensive analysis of essential dissolved minerals, calcium-magnesium ratios, and physiological hydration benefits of pure alkaline sources.',
    fullArticle:
      'World Health Organization guidelines emphasize that drinking water should maintain an optimal Total Dissolved Solids (TDS) range between 100 to 250 mg/L alongside an alkaline pH of 7.5 to 8.5.',
    highlights: [
      'Optimal TDS Range: 120 - 180 mg/L',
      'Natural Electrolyte & Silica Enrichment',
      'Certified Zero Microbiological Contaminants',
    ],
    badge: 'WHO Benchmark',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    imageSrc: IMAGE.audit,
    depth: 'near',
    lane: 14,
    duration: 16,
    delay: 0,
    wobbleA: 14,
    wobbleB: -18,
    wobbleC: 10,
    wobbleD: -12,
    show: ['mobile', 'tablet', 'desktop'],
  },
  {
    id: 'skin',
    title: 'Skin Hydration',
    subtitle: 'Cellular Science',
    category: 'BEAUTY SCIENCE',
    issueNo: 'GAZETTE #02',
    date: 'August 2026',
    readTime: '3 min read',
    headline: 'How Trace Silica & Alkaline Hydration Improves Dermal Elasticity',
    excerpt:
      'Deep dive into micro-hydration dynamics: why structured mineral water rejuvenates skin cells faster than purified distilled water.',
    fullArticle:
      'Trace minerals such as silica and bicarbonate ions act as vital binding elements in skin collagen synthesis.',
    highlights: [
      'Enriched with Bioavailable Silica',
      'Boosts Dermal Barrier Retention',
      'Combats Cellular Oxidative Stress',
    ],
    badge: 'Cellular Health',
    glowColor: 'rgba(45, 212, 191, 0.45)',
    imageSrc: IMAGE.mountain,
    depth: 'mid',
    lane: 50,
    duration: 16,
    delay: 0,
    wobbleA: -12,
    wobbleB: 16,
    wobbleC: -8,
    wobbleD: 14,
    show: ['mobile', 'tablet', 'desktop'],
  },
  {
    id: 'aquifer',
    title: 'Aquifer Audit',
    subtitle: 'National Policy',
    category: 'NATIONAL REPORT',
    issueNo: 'GAZETTE #03',
    date: 'August 2026',
    readTime: '5 min read',
    headline: 'Pakistan Water Quality & Aquifer Safety National Report',
    excerpt:
      'An independent review of municipal water standards, deep spring protection, and sustainable extraction thresholds across Pakistan.',
    fullArticle:
      'With growing industrial urban expansion, safeguarding natural underground springs is critical.',
    highlights: [
      'Protected Mountain Spring Tapping',
      'Solar Hydro-Extraction Tech',
      'Zero Environmental Chemical Runoff',
    ],
    badge: 'Policy Briefing',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    imageSrc: IMAGE.solar,
    depth: 'far',
    lane: 32,
    duration: 16,
    delay: 0,
    wobbleA: 8,
    wobbleB: -10,
    wobbleC: 12,
    wobbleD: -6,
    show: ['mobile', 'tablet', 'desktop'],
  },
  {
    id: 'volcanic',
    title: 'Volcanic Springs',
    subtitle: 'Geological Filter',
    category: 'GEOLOGY',
    issueNo: 'GAZETTE #04',
    date: 'July 2026',
    readTime: '2 min read',
    headline: 'Multi-Decade Filtration Through Volcanic Stone Stratum',
    excerpt:
      'How rainwater trickling through subterranean stone layers naturally enriches with calcium and magnesium.',
    fullArticle:
      'Geological filtration is nature’s most effective purification system.',
    highlights: [
      'Naturally Filtered Over 30 Years',
      'Rich in Native Electrolytes',
      'Zero Synthetic Mineral Additives',
    ],
    badge: 'Natural Origin',
    glowColor: 'rgba(129, 140, 248, 0.45)',
    imageSrc: IMAGE.mountain,
    depth: 'near',
    lane: 70,
    duration: 16,
    delay: 0,
    wobbleA: -16,
    wobbleB: 12,
    wobbleC: -14,
    wobbleD: 8,
    show: ['mobile', 'tablet', 'desktop'],
  },
  {
    id: 'microplastics',
    title: 'Microplastics',
    subtitle: 'Zero Plastic Tech',
    category: 'PURITY AUDIT',
    issueNo: 'GAZETTE #05',
    date: 'July 2026',
    readTime: '4 min read',
    headline: 'Zero Microplastics Guarantee: Glass & BPA-Free Packaging',
    excerpt:
      'Why standard PET bottles leach micro-particles and how Watlys sealed glass carboys preserve pristine liquid purity.',
    fullArticle:
      'Testing revealed over 90% of commercial bottled water contains synthetic polymer residues.',
    highlights: [
      '100% Microplastic-Free Certified',
      'BPA, BPS & Phthalate-Free',
      'Sterilized UV-C Glass Bottling',
    ],
    badge: 'Purity Guarantee',
    glowColor: 'rgba(34, 211, 238, 0.45)',
    imageSrc: IMAGE.glass,
    depth: 'mid',
    lane: 82,
    duration: 16,
    delay: 0,
    wobbleA: 10,
    wobbleB: -14,
    wobbleC: 16,
    wobbleD: -10,
    show: ['mobile', 'tablet', 'desktop'],
  },
  {
    id: 'glass',
    title: 'Glass Bottling',
    subtitle: 'Eco Glass Standards',
    category: 'SUSTAINABILITY',
    issueNo: 'ECO ISSUE #01',
    date: 'June 2026',
    readTime: '4 min read',
    headline: 'The Return to Heavyweight Recyclable Glass Bottles',
    excerpt:
      'Eliminating single-use plastics across major cities through sanitized reusable glass carboys.',
    fullArticle:
      'Our zero-waste circular loop system allows households and offices to enjoy pure water delivered in reusable glass carboys.',
    highlights: [
      '100+ Reuse Cycle Lifetime',
      '7-Stage Hydro-Thermal Washing',
      'Zero Single-Use Waste Footprint',
    ],
    badge: 'Circular Loop',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    imageSrc: IMAGE.glass,
    depth: 'mid',
    lane: 40,
    duration: 16,
    delay: 0,
    wobbleA: -9,
    wobbleB: 13,
    wobbleC: -15,
    wobbleD: 7,
    show: ['mobile', 'tablet', 'desktop'],
  },
  {
    id: 'solar',
    title: 'Solar Bottling',
    subtitle: 'Zero Carbon',
    category: 'CLEAN TECH',
    issueNo: 'ECO ISSUE #02',
    date: 'May 2026',
    readTime: '3 min read',
    headline: 'Solar Powered Hydro-Filtration & Bottling Plant',
    excerpt:
      'How 100% renewable energy powers our entire purification, ozone treatment, and packaging process.',
    fullArticle:
      'Watlys facility generates 1.2MW of rooftop solar energy, neutralizing manufacturing emissions.',
    highlights: [
      '100% On-Site Solar Power',
      'Zero Industrial Effluent Waste',
      'Carbon-Neutral Certification',
    ],
    badge: 'Clean Energy',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    imageSrc: IMAGE.solar,
    depth: 'far',
    lane: 58,
    duration: 16,
    delay: 0,
    wobbleA: 6,
    wobbleB: -8,
    wobbleC: 10,
    wobbleD: -5,
    show: ['tablet', 'desktop'],
  },
  {
    id: 'tds',
    title: 'TDS Balance',
    subtitle: 'Perfect Ratio',
    category: 'LAB REPORT',
    issueNo: 'LAB #01',
    date: 'March 2026',
    readTime: '4 min read',
    headline: 'Optimal Total Dissolved Solids: Why Zero TDS RO is Flawed',
    excerpt:
      'Demystifying mineral stripping: why pure spring mineral water outperforms demineralized RO water.',
    fullArticle:
      'Demineralized RO water can leech minerals from human teeth and bones over long-term use.',
    highlights: [
      'Balanced Mineral Spectrum',
      'Protects Bone Density & Teeth',
      'Crisp Natural Mountain Taste',
    ],
    badge: 'Lab Certified',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    imageSrc: IMAGE.tds,
    depth: 'near',
    lane: 24,
    duration: 16,
    delay: 0,
    wobbleA: 12,
    wobbleB: -10,
    wobbleC: 15,
    wobbleD: -13,
    show: ['mobile', 'tablet', 'desktop'],
  },
  {
    id: 'metals',
    title: 'Heavy Metal Free',
    subtitle: 'ICP-MS Testing',
    category: 'SAFETY AUDIT',
    issueNo: 'LAB #02',
    date: 'March 2026',
    readTime: '3 min read',
    headline: 'Triple ICP-MS Spectrometry Testing for Lead & Arsenic Safeguards',
    excerpt:
      'Zero tolerance testing protocols ensuring complete immunity from heavy metal industrial runoff.',
    fullArticle:
      'Every batch undergoes ICP-MS laboratory mass spectrometry testing down to parts-per-trillion levels.',
    highlights: [
      'Parts-Per-Trillion Detection Limit',
      'Zero Heavy Metals Certified',
      'Batch Quality Code on Every Cap',
    ],
    badge: 'Safety First',
    glowColor: 'rgba(45, 212, 191, 0.4)',
    imageSrc: IMAGE.audit,
    depth: 'mid',
    lane: 64,
    duration: 16,
    delay: 0,
    wobbleA: -11,
    wobbleB: 9,
    wobbleC: -13,
    wobbleD: 11,
    show: ['tablet', 'desktop'],
  },
  {
    id: 'ozone',
    title: 'Ozone Shield',
    subtitle: 'Pure Oxidation',
    category: 'PURIFICATION',
    issueNo: 'LAB #04',
    date: 'February 2026',
    readTime: '2 min read',
    headline: 'Residue-Free Ozone Sterilization in Sealed Bottling',
    excerpt:
      'How activated oxygen sanitizes water without chlorine taste or harmful chemical byproducts.',
    fullArticle:
      'Ozone (O₃) naturally oxidizes any potential airborne micro-organisms and converts back into pure oxygen.',
    highlights: [
      'Chlorine-Free Sterilization',
      'Converts into Pure Oxygen',
      'Preserves Natural Crisp Springs',
    ],
    badge: 'Ozone Pure',
    glowColor: 'rgba(129, 140, 248, 0.4)',
    imageSrc: IMAGE.bottle,
    depth: 'far',
    lane: 8,
    duration: 16,
    delay: 0,
    wobbleA: 7,
    wobbleB: -11,
    wobbleC: 5,
    wobbleD: -9,
    show: ['desktop'],
  },
  {
    id: 'office',
    title: 'Office Wellness',
    subtitle: 'Corporate Plans',
    category: 'CORPORATE',
    issueNo: 'BUSINESS #05',
    date: 'April 2026',
    readTime: '3 min read',
    headline: 'Boosting Workplace Productivity with Premium Mineral Hydration',
    excerpt:
      'Studies reveal even 1% dehydration lowers cognitive performance and focus by 12%.',
    fullArticle:
      'Providing staff with crisp, chilled mineral water improves daily alertness and reduces fatigue.',
    highlights: [
      'Flexible Corporate Monthly Plans',
      'Dedicated Delivery Concierge',
      'Custom Branded Glass Bottles',
    ],
    badge: 'Workplace',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    imageSrc: IMAGE.about,
    depth: 'mid',
    lane: 78,
    duration: 16,
    delay: 0,
    wobbleA: -14,
    wobbleB: 11,
    wobbleC: -7,
    wobbleD: 15,
    show: ['tablet', 'desktop'],
  },
  {
    id: 'gazette',
    title: 'Monthly Gazette',
    subtitle: 'Print & Digital',
    category: 'PUBLICATIONS',
    issueNo: 'LAB #05',
    date: 'January 2026',
    readTime: '5 min read',
    headline: 'Subscribe to Watlys Monthly Hydration Gazette',
    excerpt:
      'Join over 25,000 households receiving our monthly research updates and spring water delivery perks.',
    fullArticle:
      'Subscribers get exclusive early access to water safety reports and discount vouchers on 19L glass carboy subscriptions.',
    highlights: [
      'Monthly Free PDF Briefings',
      'Exclusive Subscriber Discounts',
      'Bi-Annual Free Cooler Servicing',
    ],
    badge: 'VIP Club',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    imageSrc: IMAGE.solar,
    depth: 'near',
    lane: 46,
    duration: 16,
    delay: 0,
    wobbleA: 13,
    wobbleB: -15,
    wobbleC: 9,
    wobbleD: -11,
    show: ['mobile', 'tablet', 'desktop'],
  },
]

const DEPTH_STYLE: Record<
  Depth,
  { size: { mobile: number; tablet: number; desktop: number }; opacity: number; blur: number; z: number }
> = {
  near: {
    size: { mobile: 104, tablet: 142, desktop: 176 },
    opacity: 1,
    blur: 0,
    z: 30,
  },
  mid: {
    size: { mobile: 78, tablet: 108, desktop: 132 },
    opacity: 0.9,
    blur: 0.5,
    z: 20,
  },
  far: {
    size: { mobile: 56, tablet: 74, desktop: 92 },
    opacity: 0.68,
    blur: 1.4,
    z: 10,
  },
}

let sharedAudioCtx: AudioContext | null = null

function playWaterBubblePop(pitchOffset = 0, volume = 0.12, isMuted = false) {
  if (isMuted || typeof window === 'undefined') return
  try {
    if (!sharedAudioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtxClass) return
      sharedAudioCtx = new AudioCtxClass()
    }
    const ctx = sharedAudioCtx
    if (ctx.state === 'suspended') void ctx.resume()

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
  } catch {
    /* non-blocking */
  }
}

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>('desktop')

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 768) setBp('mobile')
      else if (w < 1024) setBp('tablet')
      else setBp('desktop')
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return bp
}

function FloatingBubble({
  item,
  breakpoint,
  fieldHeight,
  riseDuration,
  riseDelay,
  isActive,
  onActivate,
}: {
  item: BubbleItem
  breakpoint: Breakpoint
  fieldHeight: number
  riseDuration: number
  riseDelay: number
  isActive: boolean
  onActivate: (item: BubbleItem, origin: BubbleOrigin) => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)
  /** Keep float paused until hover scale-down finishes (no snap resume) */
  const [holdPause, setHoldPause] = useState(false)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchOpened = useRef(false)

  const depth = DEPTH_STYLE[item.depth]
  const size = depth.size[breakpoint]
  const isTouch = breakpoint === 'mobile'
  const paused = hovered || holdPause || isActive
  const isTransparentBottle =
    item.imageSrc === IMAGE.bottle || item.imageSrc === IMAGE.glass
  const restShadow = isTransparentBottle
    ? '0 20px 45px rgba(0,102,255,0.22), 0 0 0 1px rgba(255,255,255,0.4) inset'
    : '0 16px 36px rgba(10, 110, 189, 0.22), 0 0 0 1px rgba(255,255,255,0.4) inset'

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current)
    }
  }, [])

  const triggerOpen = useCallback(() => {
    if (isActive) return
    const el = ref.current
    const rect = el?.getBoundingClientRect()
    if (!rect) return
    setHovered(false)
    setHoldPause(false)
    onActivate(item, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      w: rect.width,
      h: rect.height,
    })
  }, [isActive, item, onActivate])

  const handleClick = (e: React.MouseEvent) => {
    if (touchOpened.current) {
      touchOpened.current = false
      return
    }
    e.preventDefault()
    triggerOpen()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    touchOpened.current = true
    triggerOpen()
    window.setTimeout(() => {
      touchOpened.current = false
    }, 450)
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label={`Open ${item.title}`}
      aria-hidden={isActive}
      tabIndex={isActive ? -1 : 0}
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => {
        if (!isTouch && !isActive) {
          if (leaveTimer.current) clearTimeout(leaveTimer.current)
          setHoldPause(false)
          setHovered(true)
        }
      }}
      onMouseLeave={() => {
        if (!isTouch) {
          setHovered(false)
          setHoldPause(true)
          if (leaveTimer.current) clearTimeout(leaveTimer.current)
          leaveTimer.current = setTimeout(
            () => setHoldPause(false),
            Math.round(HOVER_DURATION * 1000)
          )
        }
      }}
      className={`bubble-rise absolute touch-manipulation cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
        paused ? 'is-paused' : ''
      }`}
      style={
        {
          left: `${item.lane}%`,
          bottom: `-${Math.round(size * 0.2)}px`,
          width: size,
          height: size,
          marginLeft: -size / 2,
          zIndex: hovered && !isActive ? 60 : depth.z,
          /* Keep bubble mounted & paused while card open — invisible placeholder so float resumes in place */
          opacity: isActive ? 0 : undefined,
          pointerEvents: isActive ? 'none' : undefined,
          animationDuration: `${riseDuration}s`,
          animationDelay: `${riseDelay}s`,
          '--rise-h': `${fieldHeight + size}px`,
          '--bubble-opacity': String(depth.opacity),
          '--wobble-a': `${item.wobbleA}px`,
          '--wobble-b': `${item.wobbleB}px`,
          '--wobble-c': `${item.wobbleC}px`,
          '--wobble-d': `${item.wobbleD}px`,
        } as React.CSSProperties
      }
    >
      {/* Soft underwater aura — intensifies slowly with hover inflate */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
        initial={false}
        animate={{
          width: size * (hovered ? 2.15 : 1.55),
          height: size * (hovered ? 2.15 : 1.55),
          x: '-50%',
          y: '-50%',
          opacity: hovered ? 1 : 0.65,
          filter: `blur(${hovered ? 28 : 16}px)`,
        }}
        transition={{ duration: HOVER_DURATION, ease: EASE_HOVER }}
        style={{ background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 68%)` }}
      />

      {/* Orb — slow inflate + lift toward viewer */}
      <motion.span
        className="relative block h-full w-full overflow-hidden rounded-full will-change-transform"
        initial={false}
        animate={{
          scale: hovered ? HOVER_SCALE : 1,
          y: hovered ? HOVER_LIFT : 0,
          filter: depth.blur
            ? `blur(${hovered ? 0 : depth.blur}px)`
            : 'blur(0px)',
        }}
        transition={{ duration: HOVER_DURATION, ease: EASE_HOVER }}
        style={{
          boxShadow: hovered
            ? `0 32px 64px ${item.glowColor}, 0 0 0 1.5px rgba(255,255,255,0.65) inset`
            : restShadow,
          transition: `box-shadow ${HOVER_DURATION}s cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-full"
          style={{
            background:
              'linear-gradient(145deg, rgba(255,255,255,0.55) 0%, transparent 42%, transparent 58%, rgba(10,110,189,0.18) 100%)',
            boxShadow:
              'inset 0 -14px 28px rgba(10,70,160,0.22), inset 0 10px 22px rgba(255,255,255,0.2)',
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-[18%] top-[12%] z-20 h-[28%] w-[38%] rounded-[50%] bg-gradient-to-br from-white/90 via-white/40 to-transparent blur-[0.5px]"
        />

        <motion.img
          src={item.imageSrc}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
          initial={false}
          animate={{
            scale: hovered ? 1.14 : 1.04,
            filter: hovered
              ? 'saturate(1.18) contrast(1.08) brightness(1.06)'
              : 'saturate(1.02) contrast(1.02) brightness(0.98)',
          }}
          transition={{ duration: HOVER_DURATION, ease: EASE_HOVER }}
        />

        {/* Caption — scale leads, then label fades in */}
        <motion.span
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center justify-end px-2.5 pb-3.5 pt-12"
          style={{
            background:
              'linear-gradient(to top, rgba(7,16,28,0.82) 0%, rgba(7,16,28,0.4) 55%, transparent 100%)',
          }}
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{
            duration: HOVER_CAPTION_DURATION,
            delay: hovered ? HOVER_CAPTION_DELAY : 0,
            ease: EASE_HOVER,
          }}
        >
          <span className="mb-1 text-[8px] font-bold uppercase tracking-[0.18em] text-sky-200/90">
            {item.badge}
          </span>
          <span
            className={`font-serif font-bold leading-tight text-white drop-shadow-md ${
              item.depth === 'near' ? 'text-[14px] sm:text-[16px]' : 'text-[12px] sm:text-[14px]'
            }`}
          >
            {item.title}
          </span>
          {item.depth !== 'far' && (
            <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-sky-100/90">
              {item.subtitle}
            </span>
          )}
        </motion.span>
      </motion.span>
    </button>
  )
}

function BubbleMorphCard({
  item,
  origin,
  soundMuted,
  isRtl,
  t,
  emailInput,
  setEmailInput,
  subscribed,
  onSubscribe,
  onCloseComplete,
}: {
  item: BubbleItem
  origin: BubbleOrigin
  soundMuted: boolean
  isRtl: boolean
  t: ReturnType<typeof useLanguage>['t']
  emailInput: string
  setEmailInput: (v: string) => void
  subscribed: boolean
  onSubscribe: (e: React.FormEvent) => void
  onCloseComplete: () => void
}) {
  const [phase, setPhase] = useState<'pregrow' | 'open' | 'closingText' | 'closingMorph'>('pregrow')
  const [mounted, setMounted] = useState(false)

  const cardW = typeof window !== 'undefined' ? Math.min(480, window.innerWidth * 0.92) : 400
  const cardH = typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.82, 620) : 520
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0

  useEffect(() => {
    setMounted(true)
  }, [])

  // pregrow → open (morph starts + pop sound at morph begin)
  useEffect(() => {
    const t1 = window.setTimeout(() => {
      playWaterBubblePop(2.2, 0.18, soundMuted)
      setPhase('open')
    }, 200)
    return () => window.clearTimeout(t1)
  }, [soundMuted])

  const requestClose = useCallback(() => {
    setPhase((p) => (p === 'closingText' || p === 'closingMorph' ? p : 'closingText'))
  }, [])

  // Text fades first, then card morphs back to circle
  useEffect(() => {
    if (phase !== 'closingText') return
    const t = window.setTimeout(() => setPhase('closingMorph'), 300)
    return () => window.clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'closingMorph') return
    const t = window.setTimeout(() => onCloseComplete(), 680)
    return () => window.clearTimeout(t)
  }, [phase, onCloseComplete])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [requestClose])

  const showContent = phase === 'open'
  const morphingClosed = phase === 'closingMorph'
  const fadingOut = phase === 'closingText' || phase === 'closingMorph'

  if (!mounted) return null

  const shell = (
    <>
      <motion.div
        className="fixed inset-0 z-[60] cursor-pointer bg-slate-950/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: morphingClosed ? 0 : fadingOut ? 0.55 : 1 }}
        transition={{ duration: 0.55, ease: EASE_MORPH }}
        style={{ backdropFilter: morphingClosed ? 'blur(0px)' : 'blur(10px)' }}
        onClick={requestClose}
      />

      <motion.div
        className="fixed z-[70] overflow-hidden will-change-[transform,opacity]"
        initial={{
          left: origin.x - origin.w / 2,
          top: origin.y - origin.h / 2,
          width: origin.w,
          height: origin.h,
          borderRadius: '50%',
          filter: 'blur(0px)',
        }}
        animate={
          phase === 'pregrow'
            ? {
                left: origin.x - (origin.w * 1.12) / 2,
                top: origin.y - (origin.h * 1.12) / 2 - 6,
                width: origin.w * 1.12,
                height: origin.h * 1.12,
                borderRadius: '50%',
                filter: 'blur(2.5px)',
              }
            : morphingClosed
              ? {
                  left: origin.x - origin.w / 2,
                  top: origin.y - origin.h / 2,
                  width: origin.w,
                  height: origin.h,
                  borderRadius: '50%',
                  filter: 'blur(0px)',
                }
              : {
                  left: centerX - cardW / 2,
                  top: centerY - cardH / 2,
                  width: cardW,
                  height: cardH,
                  borderRadius: 20,
                  filter: 'blur(0px)',
                }
        }
        transition={{ duration: 0.65, ease: EASE_MORPH }}
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 40px 100px ${item.glowColor}, 0 0 0 1px rgba(255,255,255,0.45) inset`,
          background: 'color-mix(in srgb, var(--card) 92%, transparent)',
        }}
      >
        {/* Image — fills circle, then becomes header band */}
        <motion.div
          className="absolute left-0 right-0 top-0 overflow-hidden"
          initial={false}
          animate={
            phase === 'pregrow' || morphingClosed
              ? { height: '100%', borderRadius: '50%' }
              : { height: 168, borderRadius: '20px 20px 0 0' }
          }
          transition={{ duration: 0.65, ease: EASE_MORPH }}
        >
          <img
            src={item.imageSrc}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                phase === 'open' || phase === 'closingText'
                  ? 'linear-gradient(to bottom, transparent 30%, rgba(7,16,28,0.55) 100%)'
                  : 'linear-gradient(145deg, rgba(255,255,255,0.35) 0%, transparent 45%)',
            }}
          />
        </motion.div>

        {/* Close */}
        <AnimatePresence>
          {showContent && (
            <motion.button
              type="button"
              aria-label="Close"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, delay: 0.35, ease: EASE_HOVER }}
              onClick={requestClose}
              className={`absolute top-3 z-30 cursor-pointer rounded-full border border-white/30 bg-black/35 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/50 ${
                isRtl ? 'left-3' : 'right-3'
              }`}
            >
              <X size={16} strokeWidth={2.4} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Content — rises from center with stagger */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              key="card-body"
              className={`absolute inset-x-0 bottom-0 top-[148px] overflow-y-auto px-5 pb-5 pt-4 sm:px-7 ${
                isRtl ? 'text-right' : 'text-left'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 12, transition: { duration: 0.28, ease: EASE_MORPH } }}
            >
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.45, delay: 0.28, ease: EASE_HOVER }}
                className="mb-3 flex flex-wrap items-center gap-2"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/70 bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700 dark:border-sky-700/40 dark:bg-sky-900/40 dark:text-sky-300">
                  <Sparkles size={12} />
                  {item.category}
                </span>
                <span className="rounded-full bg-foreground px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-background">
                  {item.badge}
                </span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.48, delay: 0.36, ease: EASE_HOVER }}
                className="mb-2 font-serif text-[22px] font-black leading-[1.15] tracking-tight text-foreground sm:text-[28px]"
              >
                {item.headline}
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.45, delay: 0.48, ease: EASE_HOVER }}
              >
                <div className="mb-3 h-0.5 w-14 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500" />
                <p className="mb-4 text-[14px] leading-relaxed text-muted-foreground">{item.excerpt}</p>
                <div className="mb-5 space-y-2 rounded-2xl border border-sky-100/80 bg-sky-50/70 p-3.5 dark:border-sky-900/50 dark:bg-sky-950/40">
                  <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
                    ✦ {t.bubbleModal?.keyHighlights || (isRtl ? 'اہم تحقیقی نکات' : 'Key Research Highlights')}
                  </span>
                  {item.highlights.map((h) => (
                    <div
                      key={h}
                      className={`flex items-start gap-2 text-[13px] font-medium text-foreground ${
                        isRtl ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-white">
                        <CheckCircle2 size={10} strokeWidth={3} />
                      </span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.form
                onSubmit={onSubscribe}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.45, delay: 0.6, ease: EASE_HOVER }}
                className="flex w-full flex-col items-stretch gap-2.5 sm:flex-row sm:items-center"
              >
                <div className="relative w-full flex-1">
                  <Mail
                    size={16}
                    className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${
                      isRtl ? 'right-3.5' : 'left-3.5'
                    }`}
                  />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder={t.bubbleModal?.pdfPlaceholder || t.newsletter.emailPlaceholder}
                    className={`w-full rounded-xl border-2 border-border bg-card py-3 text-[13px] font-medium text-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 ${
                      isRtl ? 'pl-3 pr-10 text-right' : 'pl-10 pr-3 text-left'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 cursor-pointer rounded-xl bg-gradient-to-r from-primary via-[#007AFF] to-[#0099FF] px-5 py-3 text-[13px] font-bold text-white shadow-[0_12px_32px_rgba(0,100,208,0.4)]"
                >
                  <span className="inline-flex items-center gap-2">
                    {t.bubbleModal?.getBriefing || t.newsletter.button}
                    <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                  </span>
                </button>
              </motion.form>

              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-[12px] font-bold text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-900/40 dark:text-emerald-300 ${
                    isRtl ? 'flex-row-reverse text-right' : ''
                  }`}
                >
                  <CheckCircle2 size={15} className="shrink-0" />
                  <span>
                    {t.bubbleModal?.subscribed ||
                      (isRtl
                        ? '✓ سبسکرائب ہو گیا!'
                        : '✓ Subscribed! Full PDF Briefing sent to your email.')}
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )

  return createPortal(shell, document.body)
}

export default function NewsletterBubbleUniverse() {
  const { t, isRtl } = useLanguage()
  const breakpoint = useBreakpoint()
  const fieldRef = useRef<HTMLDivElement>(null)
  const bubbleStageRef = useRef<HTMLDivElement>(null)
  const [fieldHeight, setFieldHeight] = useState(640)
  const [soundMuted, setSoundMuted] = useState(false)
  const [activeBubble, setActiveBubble] = useState<BubbleItem | null>(null)
  const [clickOrigin, setClickOrigin] = useState<BubbleOrigin | null>(null)
  const [emailInput, setEmailInput] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const visibleBubbles = useMemo(
    () => BUBBLES.filter((b) => b.show.includes(breakpoint)),
    [breakpoint]
  )

  // Shared duration + evenly spaced negative delays = full vertical coverage at all times
  const RISE_DURATION = breakpoint === 'mobile' ? 18 : breakpoint === 'tablet' ? 22 : 26

  useEffect(() => {
    const el = bubbleStageRef.current ?? fieldRef.current
    if (!el) return
    const measure = () => {
      const h = el.clientHeight || 640
      setFieldHeight((prev) => (Math.abs(prev - h) > 2 ? h : prev))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const handleActivate = useCallback((item: BubbleItem, origin: BubbleOrigin) => {
    setClickOrigin(origin)
    setActiveBubble(item)
  }, [])

  const handleCloseComplete = useCallback(() => {
    setActiveBubble(null)
    setClickOrigin(null)
  }, [])

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput) return
    playWaterBubblePop(3, 0.2, soundMuted)
    setSubscribed(true)
    window.setTimeout(() => {
      setEmailInput('')
      setSubscribed(false)
    }, 4000)
  }

  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-14 pb-10 sm:pt-18 sm:pb-14 md:pt-20 md:pb-16 font-sans text-foreground select-none">
      {/* Header */}
      <div className="relative z-20 mx-auto mb-2 max-w-5xl px-4 text-center sm:mb-3">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-primary shadow-xs dark:bg-sky-500/20 dark:text-sky-300 sm:text-xs">
          <Sparkles size={13} className="animate-pulse text-amber-400" />
          <span>Watlys Interactive Newsletter Universe</span>
        </div>

        <h2 className="mb-2 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Explore Pure Hydration Intelligence
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
          Hover or click any floating mineral bubble below
        </p>

        <button
          type="button"
          onClick={() => setSoundMuted((m) => !m)}
          className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-[10px] font-medium text-foreground shadow-xs backdrop-blur-sm transition-colors hover:bg-muted sm:text-[11px]"
          title={soundMuted ? 'Unmute water pop sound effects' : 'Mute water pop sound effects'}
        >
          {soundMuted ? (
            <VolumeX size={13} className="text-rose-500" />
          ) : (
            <Volume2 size={13} className="text-emerald-500" />
          )}
          <span>{soundMuted ? 'Sound Muted' : 'Water Pop Audio On'}</span>
        </button>
      </div>

      {/* Bubble field — pt-12 keeps rising bubbles clear of the audio pill */}
      <div
        ref={fieldRef}
        className="relative mx-auto w-full max-w-6xl px-2 pt-16 sm:px-4"
        style={{
          height:
            breakpoint === 'mobile' ? 460 : breakpoint === 'tablet' ? 580 : 700,
        }}
      >
        {/* Atmosphere layers */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(56,189,248,0.18) 0%, rgba(59,130,246,0.08) 45%, transparent 78%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14]"
          style={{
            background: `
              radial-gradient(ellipse 18% 36% at 22% 32%, rgba(255,255,255,0.85) 0%, transparent 70%),
              radial-gradient(ellipse 14% 30% at 78% 58%, rgba(186,230,253,0.9) 0%, transparent 70%)
            `,
            animation: 'causticShift 16s ease-in-out infinite',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 18% 28%, rgba(224,242,254,0.9) 0.7px, transparent 1.4px),
              radial-gradient(circle at 72% 48%, rgba(186,230,253,0.8) 0.6px, transparent 1.3px),
              radial-gradient(circle at 42% 78%, rgba(255,255,255,0.85) 0.5px, transparent 1.2px)`,
            backgroundSize: '55% 70%, 50% 65%, 60% 75%',
            animation: 'motesFloat 24s linear infinite',
          }}
        />

        <div
          ref={bubbleStageRef}
          className="absolute inset-x-0 bottom-0 top-16 overflow-hidden"
        >
          {visibleBubbles.map((item, index) => (
            <FloatingBubble
              key={item.id}
              item={item}
              breakpoint={breakpoint}
              fieldHeight={fieldHeight}
              riseDuration={RISE_DURATION}
              riseDelay={-((index / visibleBubbles.length) * RISE_DURATION)}
              isActive={activeBubble?.id === item.id}
              onActivate={handleActivate}
            />
          ))}
        </div>
      </div>

      {activeBubble && clickOrigin && (
        <BubbleMorphCard
          item={activeBubble}
          origin={clickOrigin}
          soundMuted={soundMuted}
          isRtl={isRtl}
          t={t}
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          subscribed={subscribed}
          onSubscribe={handleSubscribeSubmit}
          onCloseComplete={handleCloseComplete}
        />
      )}

    </section>
  )
}
