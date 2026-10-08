'use client'

import React, {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
  useInView,
} from 'framer-motion'
import {
  Building2,
  Navigation,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react'
import { useLanguage } from '@/context/language'
import {
  WATLYS_HUBS,
  CONCIERGE_PHONE,
  DEFAULT_HUB_ID,
  type WatlysHub,
} from '@/data/watlys-hubs'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function HubInfoCard({
  hub,
  isRtl,
  className = '',
}: {
  hub: WatlysHub
  isRtl: boolean
  className?: string
}) {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${hub.lat},${hub.lng}`
  )}`
  const wa = `https://wa.me/${hub.whatsapp}?text=${encodeURIComponent(
    `Hi Watlys — I'd like delivery info for ${hub.shortName} (${hub.address}).`
  )}`

  return (
    <motion.div
      key={hub.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`pointer-events-auto w-full max-w-[320px] rounded-[var(--radius-xl)] border border-border/70 bg-card/92 p-3.5 shadow-md backdrop-blur-xl dark:bg-card/88 ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--radius-md)] bg-primary/10 text-primary">
          <Building2 size={16} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate font-serif text-[0.95rem] font-medium tracking-tight text-foreground">
            {isRtl ? hub.nameUrdu : hub.name}
          </h4>
          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
            {isRtl ? hub.addressUrdu : hub.address}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {isRtl ? hub.statusUrdu : hub.status}
            </span>
            <span className="rounded-full border border-primary/20 bg-primary/8 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
              {isRtl ? hub.deliveryPromiseUrdu : hub.deliveryPromise}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2 border-t border-border/60 pt-3">
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary group min-h-10 flex-1 !px-3 !text-[10px]"
        >
          <Navigation size={13} />
          <span>{isRtl ? 'سمت' : 'Get Directions'}</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-[var(--radius-lg)] bg-emerald-600 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-emerald-500"
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
      </div>
    </motion.div>
  )
}

export default function MapSection() {
  const { isRtl } = useLanguage()
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const listId = useId()
  const [selectedId, setSelectedId] = useState(DEFAULT_HUB_ID)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(() => setMapReady(true), 60)
    return () => window.clearTimeout(t)
  }, [inView])

  const activeHub = useMemo(
    () => WATLYS_HUBS.find((h) => h.id === selectedId) ?? WATLYS_HUBS[0]!,
    [selectedId]
  )

  const selectByIndex = (delta: number) => {
    const idx = WATLYS_HUBS.findIndex((h) => h.id === selectedId)
    const next = (idx + delta + WATLYS_HUBS.length) % WATLYS_HUBS.length
    setSelectedId(WATLYS_HUBS[next]!.id)
  }

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      selectByIndex(1)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      selectByIndex(-1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      setSelectedId(WATLYS_HUBS[0]!.id)
    } else if (e.key === 'End') {
      e.preventDefault()
      setSelectedId(WATLYS_HUBS[WATLYS_HUBS.length - 1]!.id)
    }
  }

  const hubList = (
    <LayoutGroup>
      <div
        role="listbox"
        aria-label="Watlys hubs"
        aria-activedescendant={`${listId}-${selectedId}`}
        tabIndex={0}
        onKeyDown={onListKeyDown}
        className="flex gap-2 overflow-x-auto no-scrollbar rounded-[var(--radius-md)] outline-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:flex-col lg:gap-1.5 lg:overflow-visible"
      >
        {WATLYS_HUBS.map((hub) => {
          const active = hub.id === selectedId
          return (
            <motion.button
              key={hub.id}
              id={`${listId}-${hub.id}`}
              role="option"
              aria-selected={active}
              type="button"
              onClick={() => setSelectedId(hub.id)}
              className={`relative flex min-h-11 shrink-0 items-center gap-2.5 rounded-[var(--radius-lg)] border px-3 py-2.5 text-left transition-colors lg:w-full ${
                active
                  ? 'border-primary/35 bg-primary/10 text-foreground'
                  : 'border-transparent bg-transparent text-muted-foreground hover:bg-muted/70 hover:text-foreground'
              }`}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              {active && (
                <motion.span
                  layoutId="hub-active-bar"
                  className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full bg-primary shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_50%,transparent)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius-md)] ${
                  active ? 'bg-primary text-primary-foreground' : 'bg-muted text-primary'
                }`}
              >
                <Building2 size={14} strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] font-semibold tracking-tight">
                  {isRtl ? hub.shortNameUrdu : hub.shortName}
                </span>
                <span className="mt-0.5 block truncate text-[10.5px] opacity-75">
                  {isRtl ? hub.addressUrdu : hub.address}
                </span>
              </span>
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]' : 'bg-border'
                }`}
              />
            </motion.button>
          )
        })}
      </div>
    </LayoutGroup>
  )

  return (
    <section
      ref={sectionRef}
      className="relative section-padding w-full overflow-x-clip font-sans"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />

      <div className="container-custom max-w-[1180px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-7 text-center sm:mb-8"
        >
          <span className="eyebrow inline-flex items-center gap-1.5">
            <Sparkles size={12} className="text-primary" />
            {isRtl ? 'ترسیلی نیٹ ورک' : 'Find Watlys Near You'}
          </span>
          <h2 className="section-title mt-2.5">
            {isRtl ? 'اسلام آباد فلیگ شپ ہب و نیٹ ورک' : 'Islamabad Flagship Hub & Network'}
          </h2>
          <p className="section-lead mx-auto mt-2">
            {isRtl
              ? 'ہمارے بوتلنگ مراکز اور علاقائی ایکسپریس فلфилمنٹ ہبز دریافت کریں۔'
              : 'Explore our bottling facilities and regional express fulfillment hubs.'}
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          className="overflow-hidden rounded-[1.35rem] border border-border/70 bg-card/55 shadow-md backdrop-blur-xl dark:bg-card/40"
        >
          <div className="flex flex-col lg:grid lg:grid-cols-12">
            <motion.aside
              initial={reduceMotion ? false : { opacity: 0, x: -18 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
              className="order-1 flex flex-col gap-2.5 border-b border-border/60 bg-gradient-to-b from-card/80 to-primary/[0.03] p-3 sm:p-3.5 lg:col-span-4 lg:gap-3 lg:border-b-0 lg:border-r lg:border-border/60 lg:p-4"
            >
              <div className="flex items-center justify-between gap-2 px-0.5">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Select Watlys Hub
                </span>
                <span className="rounded-full border border-primary/20 bg-primary/8 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
                  {WATLYS_HUBS.length} Active Centers
                </span>
              </div>
              <p className="hidden px-0.5 font-serif text-[0.95rem] font-medium tracking-tight text-foreground lg:block">
                Regional Delivery Network
              </p>

              {hubList}

              <div className="mt-auto hidden rounded-[var(--radius-lg)] border border-border/60 bg-muted/40 px-3 py-2.5 lg:block">
                <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary">
                  <Phone size={12} />
                  Dedicated Concierge Line
                </div>
                <a
                  href={`tel:${CONCIERGE_PHONE.replace(/\s/g, '')}`}
                  className="mt-1 inline-flex min-h-10 items-center text-[12.5px] font-semibold text-foreground hover:text-primary"
                >
                  {CONCIERGE_PHONE}
                </a>
                <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted-foreground">
                  Same-day fulfillment for homes & commercial accounts.
                </p>
              </div>
            </motion.aside>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
              className="relative order-2 lg:col-span-8"
            >
              <div className="relative">
                <div className="relative h-[300px] w-full overflow-hidden sm:h-[400px] lg:h-[480px]">
                  {!mapReady && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-primary/10 via-muted to-background" />
                  )}

                  {mapReady && (
                    <AnimatePresence mode="wait">
                      <motion.iframe
                        key={activeHub.id}
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        title={`Watlys ${activeHub.shortName} map`}
                        src={activeHub.embedUrl}
                        className="absolute inset-0 h-full w-full border-0 dark:brightness-90 dark:contrast-125"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </AnimatePresence>
                  )}

                  {/* Compact status chip — delivery promise only (no duplicate pin popup) */}
                  <div className="pointer-events-none absolute left-3 top-3 z-20">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/92 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground shadow-xs backdrop-blur-md">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      {isRtl ? activeHub.deliveryPromiseUrdu : activeHub.deliveryPromise}
                    </span>
                  </div>

                  <div className="pointer-events-none absolute right-3 top-3 z-20 hidden sm:block">
                    <span className="rounded-full border border-border/70 bg-card/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground shadow-xs backdrop-blur-md">
                      Watlys HQ Map
                    </span>
                  </div>
                </div>

                <div className="relative z-20 border-t border-border/50 bg-muted/30 p-3 sm:pointer-events-none sm:absolute sm:bottom-3 sm:left-3 sm:border-0 sm:bg-transparent sm:p-0">
                  <HubInfoCard hub={activeHub} isRtl={isRtl} className="max-w-none sm:max-w-[320px]" />
                </div>
              </div>
            </motion.div>

            <div className="order-3 border-t border-border/60 px-3 py-2.5 lg:hidden">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary">
                  <Phone size={12} />
                  Concierge
                </div>
                <a
                  href={`tel:${CONCIERGE_PHONE.replace(/\s/g, '')}`}
                  className="inline-flex min-h-11 items-center text-[12.5px] font-semibold text-foreground hover:text-primary"
                >
                  {CONCIERGE_PHONE}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
