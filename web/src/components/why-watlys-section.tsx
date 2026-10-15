'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
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
import SectionHeader from '@/components/section-header'
import { useLanguage } from '@/context/language'

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

/**
 * Builds the feature card data from `t.whyCards` (see src/messages/en.json).
 * Icons stay hard-coded in source since they aren't localized content.
 * Note: `whyCards.*` has no dedicated long-form description key, so
 * `fullDesc` currently reuses `shortDesc` as a fallback (see missing-keys note).
 */
function buildFeatureCards(whyCards: {
  pureHygienic: { title: string; shortDesc: string; badge: string; highlights: string[]; specs: { label: string; value: string }[] }
  reliableDelivery: { title: string; shortDesc: string; badge: string; highlights: string[]; specs: { label: string; value: string }[] }
  flexiblePlans: { title: string; shortDesc: string; badge: string; highlights: string[]; specs: { label: string; value: string }[] }
  modernLiving: { title: string; shortDesc: string; badge: string; highlights: string[]; specs: { label: string; value: string }[] }
}): FeatureCard[] {
  return [
    { id: 'pure-hygienic', icon: ShieldCheck, fullDesc: whyCards.pureHygienic.shortDesc, ...whyCards.pureHygienic },
    { id: 'reliable-delivery', icon: Truck, fullDesc: whyCards.reliableDelivery.shortDesc, ...whyCards.reliableDelivery },
    { id: 'flexible-plans', icon: Calendar, fullDesc: whyCards.flexiblePlans.shortDesc, ...whyCards.flexiblePlans },
    { id: 'modern-living', icon: Sparkles, fullDesc: whyCards.modernLiving.shortDesc, ...whyCards.modernLiving },
  ]
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function FeatureCardView({
  item,
  index,
  isActive,
  isRecessed,
  isFar,
  onActivate,
  onDeactivate,
  onOpen,
}: {
  item: FeatureCard
  index: number
  isActive: boolean
  isRecessed: boolean
  isFar: boolean
  onActivate: () => void
  onDeactivate: () => void
  onOpen: () => void
}) {
  const Icon = item.icon
  const [isPressed, setIsPressed] = useState(false)
  const reduceMotion = useReducedMotion()

  const lift =
    isActive || isPressed
      ? 'translate3d(0,-4px,0) scale(1.01)'
      : 'translate3d(0,0,0) scale(1)'

  return (
    <motion.button
      type="button"
      layout={false}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onPointerDown={() => {
        setIsPressed(true)
        onActivate()
      }}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      onClick={onOpen}
      aria-label={`${item.title} — explore specs`}
      className={`glass-feature-card group w-[min(84vw,280px)] sm:w-[300px] shrink-0 p-4 sm:p-5 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
        isActive ? 'is-active' : ''
      } ${isPressed ? 'is-pressed' : ''} ${isFar ? 'is-far' : isRecessed ? 'is-recessed' : ''}`}
      style={{
        transform: reduceMotion ? undefined : lift,
        zIndex: isActive || isPressed ? 2 : 1,
      }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <div className="relative z-[1] flex flex-col h-full min-h-[200px] sm:min-h-[220px]">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div
            className={`icon-orb ${index % 2 === 0 ? 'icon-orb-pulse' : ''}`}
            style={{ animationDelay: `${index * 0.35}s` }}
          >
            <Icon size={18} strokeWidth={1.75} />
          </div>
          <span className="feature-badge mt-0.5">{item.badge}</span>
        </div>

        <h3 className="feature-title font-display text-[1.15rem] sm:text-[1.25rem] font-medium tracking-[-0.02em] leading-snug mb-2">
          {item.title}
        </h3>
        <p className="feature-desc text-[13px] leading-relaxed flex-1">{item.shortDesc}</p>

        <div className="feature-divider mt-4 pt-3 border-t flex items-center justify-between">
          <span className="cta-explore">
            Explore Specs
            <ArrowUpRight className="cta-arrow" size={13} strokeWidth={2.25} />
          </span>
          <span className="feature-tap text-[9px] uppercase tracking-[0.16em] font-semibold">
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
  const { t, isRtl } = useLanguage()
  const reduceMotion = useReducedMotion()
  const sectionRef = React.useRef<HTMLElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [selectedCard, setSelectedCard] = useState<FeatureCard | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [portalReady, setPortalReady] = useState(false)

  const FEATURE_CARDS = React.useMemo(() => buildFeatureCards(t.whyCards), [t])
  const [mobileFeaturedId, setMobileFeaturedId] = useState<string | null>(null)

  useEffect(() => {
    setMobileFeaturedId(FEATURE_CARDS[0]?.id ?? null)
  }, [FEATURE_CARDS])

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

  useEffect(() => {
    if (selectedCard) return
    setFocusedId(null)
  }, [selectedCard])

  const marqueeItems = [...FEATURE_CARDS, ...FEATURE_CARDS, ...FEATURE_CARDS]
  const hasFocus = focusedId !== null
  const focusedOrder = focusedId
    ? FEATURE_CARDS.findIndex((c) => c.id === focusedId)
    : -1

  const openCard = (item: FeatureCard) => {
    setIsPaused(true)
    setFocusedId(item.id)
    setSelectedCard(item)
  }

  const neighbourDistance = (itemId: string) => {
    if (focusedOrder < 0) return 0
    const order = FEATURE_CARDS.findIndex((c) => c.id === itemId)
    if (order < 0) return 0
    const n = FEATURE_CARDS.length
    return Math.min(Math.abs(order - focusedOrder), n - Math.abs(order - focusedOrder))
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="trust-story relative section-padding w-full overflow-x-clip select-none"
      >
        <div className="relative z-10 container-custom">
          <SectionHeader
            eyebrow={t.home.why.eyebrow}
            title={t.home.why.title}
            lead={t.home.why.lead}
          />
        </div>

        {isDesktop ? (
          <div
            className="relative z-10 w-full marquee-mask pb-2"
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
                  : { x: isRtl ? ['-33.333%', '0%'] : ['0%', '-33.333%'] }
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
              {marqueeItems.map((item, index) => {
                const dist = neighbourDistance(item.id)
                return (
                  <FeatureCardView
                    key={`${item.id}-${index}`}
                    item={item}
                    index={index}
                    isActive={focusedId === item.id}
                    isRecessed={hasFocus && focusedId !== item.id && dist === 1}
                    isFar={hasFocus && focusedId !== item.id && dist > 1}
                    onActivate={() => setFocusedId(item.id)}
                    onDeactivate={() => {
                      if (!selectedCard) setFocusedId(null)
                    }}
                    onOpen={() => openCard(item)}
                  />
                )
              })}
            </motion.div>
          </div>
        ) : (
          <div
            className="relative z-10 w-full marquee-mask px-4 pb-2"
            role="region"
            aria-label="Why choose Watlys features"
          >
            <div
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onScroll={(e) => {
                const el = e.currentTarget
                const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-feature-id]'))
                if (!cards.length) return
                const mid = el.scrollLeft + el.clientWidth / 2
                let bestId = cards[0]?.dataset.featureId ?? null
                let bestDist = Infinity
                for (const card of cards) {
                  const center = card.offsetLeft + card.offsetWidth / 2
                  const dist = Math.abs(center - mid)
                  if (dist < bestDist) {
                    bestDist = dist
                    bestId = card.dataset.featureId ?? null
                  }
                }
                if (bestId) setMobileFeaturedId(bestId)
              }}
            >
              {FEATURE_CARDS.map((item, index) => {
                const activeId = focusedId ?? mobileFeaturedId
                const activeIdx = FEATURE_CARDS.findIndex((c) => c.id === activeId)
                const d = Math.min(
                  Math.abs(index - activeIdx),
                  FEATURE_CARDS.length - Math.abs(index - activeIdx)
                )
                const featured = item.id === activeId
                return (
                  <div
                    key={item.id}
                    data-feature-id={item.id}
                    className="snap-center shrink-0 first:ml-2 last:mr-2"
                  >
                    <FeatureCardView
                      item={item}
                      index={index}
                      isActive={featured}
                      isRecessed={!featured && d === 1}
                      isFar={!featured && d > 1}
                      onActivate={() => setFocusedId(item.id)}
                      onDeactivate={() => {
                        if (!selectedCard) setFocusedId(null)
                      }}
                      onOpen={() => openCard(item)}
                    />
                  </div>
                )
              })}
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
        {/* Decorative wave sits in bottom padding — no extra band between sections */}
        <WaterWaveDivider />
      </section>
    </>
  )
}
