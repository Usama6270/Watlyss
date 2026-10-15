'use client'

import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  animate,
  useReducedMotion,
} from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Droplets,
  SlidersHorizontal,
  Calculator,
  GraduationCap,
  Users,
  Building2,
  MapPin,
  Check,
  Lock,
} from 'lucide-react'

import OrderModal from '@/components/order-modal'
import {
  CUSTOM_PLAN_CONFIG,
  calculateCustomPlan,
  arePackagesUnlocked,
  toOrderPackageDetails,
  toOrderPricingSummary,
  type CustomerPackageId,
  type DurationId,
  type LocationId,
} from '@/lib/pricing/custom-plan'

function formatPkr(n: number) {
  return `PKR ${n.toLocaleString()}`
}

function CountUp({ value }: { value: number }) {
  const reduceMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    if (reduceMotion) {
      setDisplayValue(value)
      return
    }
    const controls = animate(displayValue, value, {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduceMotion])

  return <span>{displayValue.toLocaleString()}</span>
}

const PACKAGE_ICONS: Record<
  CustomerPackageId,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  student: GraduationCap,
  family: Users,
  corporate: Building2,
}

export default function PackageCalculator({
  embedded = false,
}: {
  embedded?: boolean
}) {
  const reduceMotion = useReducedMotion()
  const [packageId, setPackageId] = useState<CustomerPackageId>(
    CUSTOM_PLAN_CONFIG.defaults.packageId
  )
  const [bottlesPerWeek, setBottlesPerWeek] = useState<number>(
    CUSTOM_PLAN_CONFIG.defaults.bottlesPerWeek
  )
  const [durationId, setDurationId] = useState<DurationId>(
    CUSTOM_PLAN_CONFIG.defaults.durationId
  )
  const [locationId, setLocationId] = useState<LocationId>(
    CUSTOM_PLAN_CONFIG.defaults.locationId
  )
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [submitLock, setSubmitLock] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const packagesUnlocked = arePackagesUnlocked(bottlesPerWeek)

  const pricing = useMemo(
    () =>
      calculateCustomPlan({
        packageId: packagesUnlocked ? packageId : CUSTOM_PLAN_CONFIG.defaults.packageId,
        bottlesPerWeek,
        durationId,
        locationId,
      }),
    [packageId, bottlesPerWeek, durationId, locationId, packagesUnlocked]
  )

  const handleBottlesChange = useCallback(
    (next: number) => {
      const qty = Math.min(
        CUSTOM_PLAN_CONFIG.maxBottles,
        Math.max(CUSTOM_PLAN_CONFIG.minBottles, next)
      )
      setBottlesPerWeek(qty)
      if (!arePackagesUnlocked(qty)) {
        // Lock packages — reset to safe default for when they unlock again
        setPackageId(CUSTOM_PLAN_CONFIG.defaults.packageId)
      } else if (!packagesUnlocked && arePackagesUnlocked(qty)) {
        // Just unlocked — ensure Family / Individual default
        setPackageId(CUSTOM_PLAN_CONFIG.defaults.packageId)
      }
    },
    [packagesUnlocked]
  )

  const selectPackage = useCallback(
    (id: CustomerPackageId) => {
      if (!arePackagesUnlocked(bottlesPerWeek)) return
      setPackageId(id)
    },
    [bottlesPerWeek]
  )

  const handleScroll = () => {
    if (!sliderRef.current) return
    const width = sliderRef.current.clientWidth
    if (width > 0) {
      setActiveSlide(Math.round(sliderRef.current.scrollLeft / width))
    }
  }

  const scrollToSlide = (index: number) => {
    setActiveSlide(index)
    sliderRef.current?.scrollTo({
      left: index * (sliderRef.current.clientWidth || 0),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  const openOrder = () => {
    if (pricing.validationErrors.length || submitLock) return
    setSubmitLock(true)
    setIsOrderModalOpen(true)
    window.setTimeout(() => setSubmitLock(false), 600)
  }

  const motionSafe = reduceMotion
    ? { initial: false, animate: {}, exit: {}, transition: { duration: 0 } }
    : undefined

  return (
    <section
      id="calculator"
      className={`relative w-full font-sans transition-colors duration-300 ${
        embedded
          ? 'py-2'
          : 'mx-auto max-w-7xl overflow-hidden border-t border-border bg-background px-4 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20'
      }`}
    >
      {/* Soft glacier wash — restrained, not neon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_55%),radial-gradient(ellipse_at_80%_60%,color-mix(in_srgb,var(--navy)_6%,transparent),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_30%_10%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_50%)]"
      />

      <div className="relative z-10 space-y-6 sm:space-y-8">
        {!embedded && (
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.32em] text-primary sm:text-xs">
              <Calculator size={14} />
              <span>Custom Plan Builder</span>
            </span>
            <h2 className="font-serif text-2xl font-bold leading-tight tracking-wide text-foreground sm:text-4xl md:text-[2.75rem]">
              Build Your Watlys Plan
            </h2>
            <p className="text-xs font-light leading-relaxed text-muted-foreground sm:text-sm">
              Premium 19L mineral water — configure quantity, duration, and
              delivery in seconds.
            </p>
          </div>
        )}

        {/* Smart savings banner */}
        <div className="mx-auto w-full max-w-5xl" style={{ minHeight: '4.5rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${pricing.promoBanner.title}-${packagesUnlocked}-${durationId}`}
              initial={motionSafe?.initial === false ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: reduceMotion ? 0 : 0.22 }}
              className={`flex w-full flex-col items-center gap-1 rounded-2xl border px-4 py-3.5 text-center sm:px-6 sm:py-4 ${
                pricing.promoBanner.locked
                  ? 'border-amber-500/30 bg-amber-500/8 dark:border-amber-400/25 dark:bg-amber-400/10'
                  : 'border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/15 dark:via-primary/8'
              }`}
              role="status"
              aria-live="polite"
            >
              <div
                className={`flex items-center justify-center gap-2 ${
                  pricing.promoBanner.locked
                    ? 'text-amber-700 dark:text-amber-300'
                    : 'text-primary'
                }`}
              >
                {pricing.promoBanner.locked ? (
                  <Lock size={15} aria-hidden />
                ) : (
                  <Sparkles size={15} aria-hidden />
                )}
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] sm:text-xs">
                  {pricing.promoBanner.title}
                </span>
              </div>
              <p className="max-w-xl text-xs text-foreground/75 sm:text-sm">
                {pricing.promoBanner.subtitle}
              </p>
              {pricing.promoBanner.discountLabel ? (
                <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {pricing.promoBanner.discountLabel}
                </p>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile tabs */}
        <div className="mx-auto flex max-w-xs items-center justify-center gap-1.5 rounded-2xl border border-border/60 bg-muted/40 p-1.5 lg:hidden">
          <button
            type="button"
            onClick={() => scrollToSlide(0)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeSlide === 0
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <SlidersHorizontal size={13} />
            <span>Configure</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSlide(1)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeSlide === 1
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sparkles size={13} />
            <span>
              Summary · {formatPkr(pricing.totalPayable).replace('PKR ', '')}
            </span>
          </button>
        </div>

        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="scrollbar-none flex items-start gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-12 lg:gap-8 lg:overflow-visible lg:pb-0 lg:snap-none"
        >
          {/* LEFT — configure */}
          <div className="w-[88vw] shrink-0 snap-center sm:w-[85vw] lg:col-span-6 lg:w-auto lg:shrink">
            <div className="space-y-6 rounded-2xl border border-border/80 bg-card/90 p-5 shadow-xl shadow-sky-950/5 backdrop-blur-sm dark:border-slate-700/50 dark:bg-[color-mix(in_srgb,var(--card)_92%,#0A1628)] dark:shadow-black/20 sm:space-y-7 sm:p-7 lg:p-8">
              {/* 1. Customer type */}
              <fieldset className="space-y-3">
                <legend className="flex w-full items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-[11px]">
                  <span>1. Customer Type</span>
                  {!packagesUnlocked ? (
                    <span className="inline-flex items-center gap-1 normal-case tracking-normal text-amber-700 dark:text-amber-300">
                      <Lock size={11} />
                      Locked at 1 bottle
                    </span>
                  ) : null}
                </legend>

                {!packagesUnlocked ? (
                  <p className="rounded-lg border border-amber-500/25 bg-amber-500/5 px-3 py-2 text-[11px] leading-relaxed text-amber-800 dark:text-amber-200/90">
                    Subscription benefits unlock with 2 or more bottles.
                  </p>
                ) : null}

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {CUSTOM_PLAN_CONFIG.packages.map((pkg) => {
                    const Icon = PACKAGE_ICONS[pkg.id]
                    const active = packagesUnlocked && packageId === pkg.id
                    const locked = !packagesUnlocked
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        disabled={locked}
                        aria-pressed={active}
                        aria-disabled={locked}
                        onClick={() => selectPackage(pkg.id)}
                        className={`group relative rounded-xl border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          locked
                            ? 'cursor-not-allowed border-border/50 bg-muted/30 opacity-60'
                            : active
                              ? 'border-primary bg-primary/12 shadow-md shadow-primary/15 ring-1 ring-primary/40'
                              : 'border-border/80 bg-background hover:border-primary/45 hover:bg-primary/5'
                        }`}
                      >
                        {locked ? (
                          <span className="absolute right-2 top-2 text-muted-foreground">
                            <Lock size={12} aria-hidden />
                          </span>
                        ) : active ? (
                          <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check size={10} strokeWidth={3} aria-hidden />
                          </span>
                        ) : null}

                        <div className="mb-2 flex items-center gap-2 pr-5">
                          <Icon
                            size={18}
                            className={
                              active
                                ? 'text-primary'
                                : locked
                                  ? 'text-muted-foreground/70'
                                  : 'text-muted-foreground'
                            }
                          />
                          <span
                            className={`text-[10px] font-bold ${
                              active ? 'text-primary' : 'text-muted-foreground'
                            }`}
                          >
                            {Math.round(pkg.discount * 100)}% OFF
                          </span>
                        </div>
                        <p
                          className={`text-xs font-bold uppercase tracking-wider ${
                            active ? 'text-primary' : 'text-foreground'
                          }`}
                        >
                          {pkg.name}
                        </p>
                        {pkg.badge && !locked ? (
                          <span className="mt-1 inline-block text-[9px] font-semibold uppercase tracking-wide text-primary/80">
                            {pkg.badge}
                          </span>
                        ) : null}
                        <ul className="mt-2 space-y-1">
                          {pkg.benefits.slice(0, 3).map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-1 text-[10px] leading-snug text-muted-foreground"
                            >
                              <Check
                                size={10}
                                className="mt-0.5 shrink-0 text-primary/70"
                              />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              {/* 2. Bottles */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <label
                    htmlFor="bottles-per-week"
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-[11px]"
                  >
                    2. Bottles / Week
                  </label>
                  <span className="inline-flex items-center gap-1.5 font-serif text-xl font-bold text-primary sm:text-2xl">
                    <Droplets size={18} aria-hidden />
                    <span>{bottlesPerWeek} × 19L</span>
                  </span>
                </div>
                <input
                  id="bottles-per-week"
                  type="range"
                  min={CUSTOM_PLAN_CONFIG.minBottles}
                  max={CUSTOM_PLAN_CONFIG.maxBottles}
                  value={bottlesPerWeek}
                  onChange={(e) =>
                    handleBottlesChange(parseInt(e.target.value, 10))
                  }
                  className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-valuemin={CUSTOM_PLAN_CONFIG.minBottles}
                  aria-valuemax={CUSTOM_PLAN_CONFIG.maxBottles}
                  aria-valuenow={bottlesPerWeek}
                  aria-label="Bottles per week"
                />
                <div className="flex justify-between text-[10px] font-semibold text-muted-foreground/80">
                  <span>1</span>
                  <span>15</span>
                  <span>30</span>
                </div>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  {bottlesPerWeek === 1 &&
                    'Single bottle: PKR 1,800 + delivery. Subscription packages locked.'}
                  {bottlesPerWeek === 2 &&
                    'Two-bottle rule: PKR 1,500 each + refundable security deposit. Refills from PKR 280.'}
                  {bottlesPerWeek > 2 &&
                    `First delivery: PKR ${CUSTOM_PLAN_CONFIG.firstFillBulkUnit.toLocaleString()} / bottle. Refills never below PKR ${CUSTOM_PLAN_CONFIG.minRefillPrice}.`}
                </p>
              </div>

              {/* 3. Duration */}
              <div className="space-y-3">
                <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-[11px]">
                  3. Subscription Duration
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {CUSTOM_PLAN_CONFIG.durations.map((d) => {
                    const active = durationId === d.id
                    return (
                      <button
                        key={d.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setDurationId(d.id)}
                        className={`rounded-xl border px-2 py-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          active
                            ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25'
                            : 'border-border/80 bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
                        }`}
                      >
                        <span className="block text-[10px] font-bold uppercase tracking-wider sm:text-[11px]">
                          {d.name}
                        </span>
                        <span
                          className={`mt-0.5 block text-[9px] font-medium ${
                            active
                              ? 'text-primary-foreground/85'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {d.savingsLabel}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 4. Location */}
              <div className="space-y-3">
                <label
                  htmlFor="delivery-location"
                  className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-[11px]"
                >
                  4. Delivery Location
                </label>
                <div className="relative">
                  <MapPin
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                    aria-hidden
                  />
                  <select
                    id="delivery-location"
                    value={locationId}
                    onChange={(e) =>
                      setLocationId(e.target.value as LocationId)
                    }
                    className="w-full cursor-pointer rounded-xl border border-border/80 bg-background py-3.5 pl-9 pr-4 text-xs font-medium text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                  >
                    {CUSTOM_PLAN_CONFIG.locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} (PKR {loc.deliveryFee} / trip)
                      </option>
                    ))}
                  </select>
                </div>
                {packagesUnlocked && packageId === 'student' ? (
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                    Student package includes free delivery on all trips.
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* RIGHT — sticky summary */}
          <div className="w-[88vw] shrink-0 snap-center sm:w-[85vw] lg:col-span-6 lg:w-auto lg:shrink">
            <div className="lg:sticky lg:top-24">
              <div className="flex flex-col justify-between space-y-5 rounded-2xl border border-primary/40 bg-gradient-to-b from-card via-card to-primary/[0.04] p-5 shadow-xl shadow-primary/10 dark:border-primary/35 dark:from-[color-mix(in_srgb,var(--card)_95%,#0A1628)] dark:to-primary/10 dark:shadow-black/30 sm:space-y-6 sm:p-7 lg:p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                      <Sparkles size={13} aria-hidden />
                      Your Plan Summary
                    </span>
                    <span className="rounded-full border border-border/70 bg-muted/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      {pricing.packagesUnlocked
                        ? pricing.package?.shortName
                        : 'Single bottle'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="font-serif text-2xl font-bold tracking-wide text-foreground sm:text-3xl">
                      {pricing.bottlesPerWeek} × 19L / Week
                    </p>
                    <p className="text-xs font-medium text-primary sm:text-sm">
                      {pricing.duration.name} · {pricing.totalBottles} bottles
                      scheduled ({pricing.totalLiters.toLocaleString()} L) ·{' '}
                      {pricing.deliveryTrips} delivery
                      {pricing.deliveryTrips === 1 ? '' : ' trips'}
                    </p>
                    {pricing.refillBottles > 0 ? (
                      <p className="text-[11px] text-muted-foreground">
                        Refill unit after discounts:{' '}
                        <strong className="text-foreground">
                          {formatPkr(pricing.refillUnitPrice)}
                        </strong>{' '}
                        (min {formatPkr(CUSTOM_PLAN_CONFIG.minRefillPrice)})
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2.5 rounded-xl border border-border/50 bg-background/70 p-4 text-xs text-muted-foreground dark:bg-background/40 sm:p-5">
                    {pricing.lineItems.map((item) => {
                      if (item.tone === 'total') {
                        return (
                          <div
                            key={item.label}
                            className="flex items-baseline justify-between gap-3 border-t border-border/60 pt-3.5"
                          >
                            <span className="text-xs font-bold uppercase tracking-wider text-foreground sm:text-sm">
                              {item.label}
                            </span>
                            <span className="font-serif text-2xl font-bold tabular-nums text-primary sm:text-3xl">
                              PKR <CountUp value={item.amount} />
                            </span>
                          </div>
                        )
                      }
                      return (
                        <div
                          key={item.label}
                          className={`flex justify-between gap-3 ${
                            item.tone === 'discount'
                              ? 'font-medium text-emerald-600 dark:text-emerald-400'
                              : item.tone === 'muted'
                                ? 'text-muted-foreground/90'
                                : ''
                          }`}
                        >
                          <span className="min-w-0 leading-snug">
                            {item.label}
                          </span>
                          <span
                            className={`shrink-0 tabular-nums ${
                              item.tone === 'discount'
                                ? 'font-semibold'
                                : 'font-semibold text-foreground'
                            }`}
                          >
                            {item.amount < 0 ? '− ' : ''}
                            PKR <CountUp value={Math.abs(item.amount)} />
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {pricing.securityDepositNote ? (
                    <p className="text-[10px] leading-relaxed text-muted-foreground">
                      {pricing.securityDepositNote}
                    </p>
                  ) : null}

                  <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                    <div className="rounded-lg border border-border/40 bg-muted/20 px-3 py-2">
                      <span className="block text-[9px] font-bold uppercase tracking-wider">
                        Est. monthly (ex-deposit)
                      </span>
                      <strong className="font-serif text-base font-bold text-foreground">
                        PKR <CountUp value={pricing.estimatedMonthlyCost} />
                      </strong>
                    </div>
                    <div className="rounded-lg border border-border/40 bg-muted/20 px-3 py-2">
                      <span className="block text-[9px] font-bold uppercase tracking-wider">
                        Total savings
                      </span>
                      <strong className="font-serif text-base font-bold text-emerald-600 dark:text-emerald-400">
                        PKR <CountUp value={pricing.totalSavings} />
                      </strong>
                    </div>
                  </div>

                  {pricing.benefits.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {pricing.benefits.map((b) => (
                        <span
                          key={b}
                          className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[10px] font-semibold text-primary"
                        >
                          <Check size={10} aria-hidden />
                          {b}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">
                      Add a second bottle to unlock subscription benefits and
                      package discounts.
                    </p>
                  )}

                  {pricing.validationErrors.length > 0 ? (
                    <p className="text-xs font-medium text-rose-500" role="alert">
                      {pricing.validationErrors[0]}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2.5 pt-1">
                  <button
                    type="button"
                    onClick={openOrder}
                    disabled={
                      pricing.validationErrors.length > 0 || submitLock
                    }
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:py-4"
                  >
                    <span>Order This Plan</span>
                    <ArrowRight size={14} aria-hidden />
                  </button>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-border/70 bg-background/60 py-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Talk to Watlys
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-1 lg:hidden">
          <button
            type="button"
            onClick={() => scrollToSlide(0)}
            aria-label="Configure plan"
            className={`h-2 rounded-full transition-all ${
              activeSlide === 0 ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'
            }`}
          />
          <button
            type="button"
            onClick={() => scrollToSlide(1)}
            aria-label="View summary"
            className={`h-2 rounded-full transition-all ${
              activeSlide === 1 ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'
            }`}
          />
        </div>
      </div>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialPackageDetails={{
          ...toOrderPackageDetails(pricing),
          frequency: pricing.duration.name,
          customerSegment: pricing.packagesUnlocked
            ? pricing.package?.name ?? 'Single Bottle'
            : 'Single Bottle',
          months: Math.max(1, Math.ceil(pricing.weeks / 4)),
          weeks: pricing.weeks,
          pricingSnapshot: toOrderPricingSummary(pricing),
        }}
      />
    </section>
  )
}
