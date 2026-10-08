'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from 'framer-motion'
import {
  ShieldCheck,
  Truck,
  Calendar,
  Sparkles,
  CheckCircle2,
  X,
  ArrowUpRight,
} from 'lucide-react'
import BrandStats from '@/components/brand-stats'

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
    title: 'Pure & Hygienic',
    shortDesc: 'Pharmaceutical-grade bottle handling with a 9-stage purity barrier.',
    fullDesc:
      'Watlys implements a 9-stage multi-barrier purification system combined with dual-pass 254nm UV-C lamps and activated ozone infusion. Every 19L carboy undergoes automated high-pressure hydro-thermal washing to eliminate biofilm and microscopic impurities.',
    icon: ShieldCheck,
    badge: '9-Stage Purity',
    highlights: [
      'Dual UV-C & Ozone Sterilization Process',
      'Automated High-Pressure CIP Carboy Washing',
      'Zero Microbiological & E. Coli Contaminants',
    ],
    specs: [
      { label: 'pH Balance', value: '7.8 – 8.2 (Mildly Alkaline)' },
      { label: 'TDS Level', value: '140 – 180 mg/L (WHO Benchmark)' },
      { label: 'Bottle Material', value: 'BPA-Free Medical Grade PC' },
    ],
  },
  {
    id: 'reliable-delivery',
    title: 'Reliable Delivery',
    shortDesc: 'Doorstep 19L refills on your schedule — never run dry.',
    fullDesc:
      'Our scheduled logistics network ensures your home or business never runs dry. Smart automated routing and dedicated concierges deliver replacement bottles right to your doorstep at your preferred time slots.',
    icon: Truck,
    badge: 'On-Time Guarantee',
    highlights: [
      'Scheduled Recurring Delivery Slot',
      'Dedicated Delivery Concierge in Your Area',
      'Live Order Tracking & Refill Reminders',
    ],
    specs: [
      { label: 'Delivery Windows', value: 'Morning & Evening slots' },
      { label: 'Service Cities', value: 'Lahore, Karachi, Islamabad' },
      { label: 'Refill Speed', value: 'Same-Day / 24-Hour Express' },
    ],
  },
  {
    id: 'flexible-plans',
    title: 'Flexible Plans',
    shortDesc: 'Weekly, monthly, or custom — pause anytime, zero lock-in.',
    fullDesc:
      'Customized hydration packages tailored for individuals, growing households, and large corporate floors. Easily pause, skip, or modify bottle quantities anytime with zero penalty or locked contracts.',
    icon: Calendar,
    badge: 'Zero Lock-in',
    highlights: [
      'Weekly, Monthly & Annual Subscriptions',
      'Instant Bottle Count Adjustments',
      'Free Pause & Vacation Mode',
    ],
    specs: [
      { label: 'Subscription Discount', value: 'Up to 20% Off Retail' },
      { label: 'Minimum Order', value: '1 Bottle — No Strict Minimums' },
      { label: 'Billing Terms', value: 'Pay per delivery or invoice' },
    ],
  },
  {
    id: 'modern-living',
    title: 'Made for Modern Living',
    shortDesc: 'Recurring hydration designed for homes and modern offices.',
    fullDesc:
      'Designed to elevate everyday living. From touchless smart coolers with auto-dispense technology to sleek glass carboy options, Watlys merges modern aesthetics with health-first mineral hydration.',
    icon: Sparkles,
    badge: 'Smart Hydration',
    highlights: [
      'Compatible with Touchless IoT Coolers',
      'Sleek Eco-Friendly Recyclable Packaging',
      'Automated Monthly Billing & Invoicing',
    ],
    specs: [
      { label: 'Dispenser Support', value: 'Free Install & Maintenance' },
      { label: 'Corporate Perks', value: 'Dedicated Account Manager' },
      { label: 'Customer Care', value: '24/7 WhatsApp Concierge' },
    ],
  },
]

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function FeatureCardView({
  item,
  index,
  isActive,
  isRecessed,
  onActivate,
  onOpen,
}: {
  item: FeatureCard
  index: number
  isActive: boolean
  isRecessed: boolean
  onActivate: () => void
  onOpen: () => void
}) {
  const Icon = item.icon
  return (
    <motion.button
      type="button"
      layout={false}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onOpen}
      aria-label={`${item.title} — explore specs`}
      className={`glass-feature-card group w-[min(84vw,280px)] sm:w-[300px] shrink-0 p-4 sm:p-5 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
        isActive ? 'is-active' : ''
      } ${isRecessed ? 'is-recessed' : ''}`}
      style={{
        transform: isActive
          ? 'translate3d(0,-6px,0) scale(1.025)'
          : isRecessed
            ? 'translate3d(0,3px,0) scale(0.96)'
            : 'translate3d(0,0,0) scale(1)',
        zIndex: isActive ? 2 : 1,
      }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div className="relative z-[1] flex flex-col h-full min-h-[200px] sm:min-h-[220px]">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className={`icon-orb ${index % 2 === 0 ? 'icon-orb-pulse' : ''}`} style={{ animationDelay: `${index * 0.35}s` }}>
            <Icon size={18} strokeWidth={1.75} />
          </div>
          <span className="mt-0.5 inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase text-primary">
            {item.badge}
          </span>
        </div>

        <h3 className="font-display text-[1.15rem] sm:text-[1.25rem] font-medium tracking-[-0.02em] text-foreground leading-snug mb-2">
          {item.title}
        </h3>
        <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">
          {item.shortDesc}
        </p>

        <div className="mt-4 pt-3 border-t border-primary/12 flex items-center justify-between">
          <span className="cta-explore">
            Explore Specs
            <ArrowUpRight className="cta-arrow" size={13} strokeWidth={2.25} />
          </span>
          <span className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground/80 font-semibold">
            Tap to open
          </span>
        </div>
      </div>
    </motion.button>
  )
}

function WaterWaveDivider() {
  return (
    <div className="water-wave-divider" aria-hidden>
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0 40 C 180 70, 360 10, 540 40 S 900 70, 1080 40 S 1260 10, 1440 40 V 80 H 0 Z"
          fill="url(#waveFillWhy)"
        />
        <path
          d="M0 48 C 200 18, 400 68, 600 42 S 1000 18, 1200 48 S 1360 68, 1440 38"
          stroke="url(#waveStrokeWhy)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.85"
        />
        <defs>
          <linearGradient id="waveFillWhy" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--primary)" stopOpacity="0.06" />
            <stop offset="0.5" stopColor="var(--primary)" stopOpacity="0.14" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="waveStrokeWhy" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--primary)" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="var(--primary)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default function WhyWatlysSection() {
  const reduceMotion = useReducedMotion()
  const sectionRef = React.useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [isPaused, setIsPaused] = useState(false)
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [selectedCard, setSelectedCard] = useState<FeatureCard | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [portalReady, setPortalReady] = useState(false)

  useEffect(() => {
    setPortalReady(true)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const apply = () => setIsDesktop(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!selectedCard) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCard(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [selectedCard])

  const marqueeItems = [...FEATURE_CARDS, ...FEATURE_CARDS, ...FEATURE_CARDS]
  const hasFocus = focusedId !== null

  const openCard = (item: FeatureCard) => {
    setIsPaused(true)
    setSelectedCard(item)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="trust-story relative section-padding w-full overflow-x-clip select-none"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative z-10 container-custom text-center mb-8 sm:mb-10"
        >
          <span className="eyebrow">The Watlys Advantage</span>
          <h2 className="section-title mt-2.5 sm:mt-3 tracking-[-0.03em]">Why Choose WATLYS?</h2>
          <p className="section-lead mx-auto mt-2.5 text-pretty">
            Crystalline purity, doorstep reliability, and plans that flex with your life — tap a card to explore the details.
          </p>
        </motion.div>

        <BrandStats />

        {isDesktop ? (
          <div
            className="relative z-10 w-full marquee-mask py-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false)
              setFocusedId(null)
            }}
          >
            <motion.div
              className="flex gap-6 sm:gap-7 w-max will-change-transform"
              animate={
                reduceMotion || isPaused || selectedCard
                  ? undefined
                  : { x: ['0%', '-33.333%'] }
              }
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 36,
                  ease: 'linear',
                },
              }}
            >
              {marqueeItems.map((item, index) => (
                <FeatureCardView
                  key={`${item.id}-${index}`}
                  item={item}
                  index={index}
                  isActive={focusedId === item.id}
                  isRecessed={hasFocus && focusedId !== item.id}
                  onActivate={() => setFocusedId(item.id)}
                  onOpen={() => openCard(item)}
                />
              ))}
            </motion.div>
          </div>
        ) : (
          <div
            className="relative z-10 w-full marquee-mask px-4"
            role="region"
            aria-label="Why choose Watlys features"
          >
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FEATURE_CARDS.map((item, index) => (
                <div key={item.id} className="snap-center shrink-0 first:ml-2 last:mr-2">
                  <FeatureCardView
                    item={item}
                    index={index}
                    isActive={focusedId === item.id || focusedId === null}
                    isRecessed={false}
                    onActivate={() => setFocusedId(item.id)}
                    onOpen={() => openCard(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {portalReady &&
          createPortal(
            <AnimatePresence>
              {selectedCard && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto overscroll-contain"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="why-watlys-modal-title"
                >
                  <div className="absolute inset-0" onClick={() => setSelectedCard(null)} />
                  <motion.div
                    initial={reduceMotion ? false : { scale: 0.92, opacity: 0, y: 28 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { scale: 0.94, opacity: 0, y: 16 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="trust-modal-shell relative z-10 w-full max-w-xl rounded-[1.75rem] p-6 sm:p-8 max-h-[92vh] overflow-y-auto select-text my-auto"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedCard(null)}
                      className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-muted/80 hover:bg-rose-500 hover:text-white text-muted-foreground flex items-center justify-center transition-colors border border-border z-20"
                      aria-label="Close details"
                    >
                      <X size={18} />
                    </button>

                    <div className="space-y-6 text-left pr-2">
                      <div className="space-y-3 pr-8">
                        <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-primary">
                          {selectedCard.badge}
                        </span>
                        <div className="flex items-center gap-3.5">
                          <div className="icon-orb shrink-0">
                            <selectedCard.icon size={24} strokeWidth={1.75} />
                          </div>
                          <h3
                            id="why-watlys-modal-title"
                            className="font-display text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-foreground"
                          >
                            {selectedCard.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {selectedCard.fullDesc}
                      </p>

                      <div className="space-y-3 pt-2 border-t border-border/80">
                        <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                          Key Advantages
                        </h4>
                        <ul className="space-y-2.5 text-sm text-foreground/90">
                          {selectedCard.highlights.map((line) => (
                            <li key={line} className="flex items-start gap-2.5">
                              <CheckCircle2 size={17} className="text-emerald-500 shrink-0 mt-0.5" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-primary-muted/50 dark:bg-primary/10 border border-primary/15 space-y-3">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          Technical Specs
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {selectedCard.specs.map((spec) => (
                            <div key={spec.label} className="space-y-1">
                              <span className="text-[11px] text-muted-foreground block">{spec.label}</span>
                              <span className="text-sm font-semibold text-foreground block leading-snug">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </section>

      <WaterWaveDivider />
    </>
  )
}
