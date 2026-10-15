'use client'

import React, { useState, useEffect, useMemo, Suspense, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import {
  MessageCircle,
  ArrowRight,
  Lock,
  Check,
  GraduationCap,
  Users,
  Building2,
} from 'lucide-react'
import { useAuth } from '@/context/auth'
import OrderModal from '@/components/order-modal'
import {
  CUSTOM_PLAN_CONFIG,
  STANDARD_PLANS,
  calculateCustomPlan,
  arePackagesUnlocked,
  quoteStandardPlan,
  toOrderPackageDetails,
  toOrderPricingSummary,
  type CustomerPackageId,
  type DurationId,
  type LocationId,
  type StandardFrequency,
} from '@/lib/pricing/custom-plan'

function formatPkr(n: number) {
  return `PKR ${n.toLocaleString()}`
}

const PACKAGE_ICONS = {
  student: GraduationCap,
  family: Users,
  corporate: Building2,
} as const

function mapCityToLocationId(city: string): LocationId {
  const c = city.toLowerCase()
  if (c.includes('sialkot')) return 'sialkot'
  if (c.includes('rawalpindi') && !c.includes('islamabad')) return 'rawalpindi'
  if (c.includes('islamabad') || c.includes('rawalpindi')) return 'islamabad'
  if (c.includes('lahore')) return 'lahore'
  return 'other'
}

function OrderWaterContent() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get('plan')
  const bottlesParam = searchParams.get('bottles')
  const freqParam = searchParams.get('freq')
  const cityParam = searchParams.get('city')
  const durationParam = searchParams.get('duration')

  const { user, openAuthModal, updateSubscription } = useAuth()

  const [packageId, setPackageId] = useState<CustomerPackageId>(
    CUSTOM_PLAN_CONFIG.defaults.packageId
  )
  const [bottlesPerWeek, setBottlesPerWeek] = useState<number>(
    CUSTOM_PLAN_CONFIG.defaults.bottlesPerWeek
  )
  const [frequency, setFrequency] = useState<StandardFrequency>('weekly')
  const [locationId, setLocationId] = useState<LocationId>(
    CUSTOM_PLAN_CONFIG.defaults.locationId
  )
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [submitLock, setSubmitLock] = useState(false)

  // Sync URL → state (standard package links from homepage)
  useEffect(() => {
    if (planParam === 'student' || planParam === 'family' || planParam === 'corporate') {
      setPackageId(planParam)
      const def = STANDARD_PLANS[planParam]
      setBottlesPerWeek(def.bottlesPerWeek)
    }

    if (bottlesParam) {
      const b = parseInt(bottlesParam, 10)
      if (!isNaN(b) && b >= 1) {
        setBottlesPerWeek(
          Math.min(CUSTOM_PLAN_CONFIG.maxBottles, Math.max(CUSTOM_PLAN_CONFIG.minBottles, b))
        )
      }
    }

    if (freqParam) {
      const f = freqParam.toLowerCase()
      if (f === 'weekly' || f === '1w' || f === '1week') setFrequency('weekly')
      else if (f === 'monthly' || f === '1m' || f === 'month') setFrequency('monthly')
    }

    if (durationParam === '1w') setFrequency('weekly')
    if (durationParam === '1m') setFrequency('monthly')

    if (cityParam) {
      setLocationId(mapCityToLocationId(cityParam))
    }
  }, [planParam, bottlesParam, freqParam, cityParam, durationParam])

  const packagesUnlocked = arePackagesUnlocked(bottlesPerWeek)
  const durationId: DurationId = frequency === 'weekly' ? '1w' : '1m'

  const pricing = useMemo(
    () =>
      calculateCustomPlan({
        packageId: packagesUnlocked
          ? packageId
          : CUSTOM_PLAN_CONFIG.defaults.packageId,
        bottlesPerWeek,
        durationId,
        locationId,
      }),
    [packageId, bottlesPerWeek, durationId, locationId, packagesUnlocked]
  )

  // Recurring display for weekly/monthly (ex-deposit) using standard quote when unlocked
  const recurringQuote = useMemo(() => {
    if (!packagesUnlocked) return null
    return quoteStandardPlan(packageId, frequency, locationId)
  }, [packageId, frequency, locationId, packagesUnlocked])

  const handleBottlesChange = useCallback(
    (next: number) => {
      const qty = Math.min(
        CUSTOM_PLAN_CONFIG.maxBottles,
        Math.max(CUSTOM_PLAN_CONFIG.minBottles, next)
      )
      setBottlesPerWeek(qty)
      if (!arePackagesUnlocked(qty)) {
        setPackageId(CUSTOM_PLAN_CONFIG.defaults.packageId)
      } else if (!packagesUnlocked) {
        setPackageId(CUSTOM_PLAN_CONFIG.defaults.packageId)
      }
    },
    [packagesUnlocked]
  )

  const selectPackage = (id: CustomerPackageId) => {
    if (!arePackagesUnlocked(bottlesPerWeek)) return
    setPackageId(id)
    // Align bottle count to standard plan defaults when switching type
    setBottlesPerWeek(STANDARD_PLANS[id].bottlesPerWeek)
  }

  const openOrderModal = () => {
    if (!user) {
      openAuthModal('signup')
      return
    }
    if (pricing.validationErrors.length || submitLock) return
    setSubmitLock(true)
    setIsOrderModalOpen(true)
    window.setTimeout(() => setSubmitLock(false), 600)
  }

  const handleWhatsAppFallback = () => {
    updateSubscription({
      packageType: pricing.packagesUnlocked
        ? `${pricing.package?.name ?? 'Family'} Plan (19L)`
        : 'Single Bottle (19L)',
      frequency: frequency === 'weekly' ? 'weekly' : 'monthly',
      bottleQty: bottlesPerWeek,
      status: 'active',
    })
  }

  const whatsappMessage = encodeURIComponent(
    `Hi Watlys Pakistan! I want to order 19L drinking water.\n\n` +
      `Package: ${pricing.packagesUnlocked ? pricing.package?.name ?? 'Family' : 'Single Bottle'}\n` +
      `Bottles / week: ${bottlesPerWeek} × 19L\n` +
      `Duration: ${pricing.duration.name}\n` +
      `Location: ${pricing.location.name}\n` +
      `Payable today: ${formatPkr(pricing.totalPayable)}\n` +
      `Est. monthly (ex-deposit): ${formatPkr(pricing.estimatedMonthlyCost)}\n` +
      (pricing.securityDeposit > 0
        ? `Refundable security: ${formatPkr(pricing.securityDeposit)}\n`
        : '') +
      `First-fill unit: ${formatPkr(pricing.firstFillUnitPrice)} · Refill unit: ${formatPkr(pricing.refillUnitPrice)} (min PKR ${CUSTOM_PLAN_CONFIG.minRefillPrice})`
  )

  return (
    <div className="page-atmosphere flex min-h-screen flex-col bg-background pt-24 text-foreground transition-colors duration-300">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-12 px-4 py-12 sm:px-8 lg:px-16">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-muted-foreground">Order 19L Water Plan</span>
        </div>

        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <span className="eyebrow rounded-full border border-primary/20 bg-primary-muted px-3.5 py-1.5">
            19L Water Configurator
          </span>
          <h1 className="page-title">Build Your 19L Water Delivery Plan</h1>
          <p className="section-lead mx-auto">
            Same pricing as Custom Plan — first bottles, refundable security, and
            refills never below PKR {CUSTOM_PLAN_CONFIG.minRefillPrice}.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left — controls */}
          <div className="surface-card space-y-7 p-5 sm:p-6 lg:col-span-7">
            {/* 1. Package */}
            <fieldset className="space-y-3">
              <legend className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground">
                <span>1. Customer Type</span>
                {!packagesUnlocked ? (
                  <span className="inline-flex items-center gap-1 normal-case tracking-normal text-amber-700 dark:text-amber-300">
                    <Lock size={11} /> Locked at 1 bottle
                  </span>
                ) : null}
              </legend>
              {!packagesUnlocked ? (
                <p className="rounded-lg border border-amber-500/25 bg-amber-500/5 px-3 py-2 text-[11px] text-amber-800 dark:text-amber-200/90">
                  Subscription benefits unlock with 2 or more bottles.
                </p>
              ) : null}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {CUSTOM_PLAN_CONFIG.packages.map((pkg) => {
                  const Icon = PACKAGE_ICONS[pkg.id]
                  const locked = !packagesUnlocked
                  const active = packagesUnlocked && packageId === pkg.id
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      disabled={locked}
                      aria-pressed={active}
                      onClick={() => selectPackage(pkg.id)}
                      className={`relative rounded-xl border p-3 text-left text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        locked
                          ? 'cursor-not-allowed border-border/50 bg-muted/30 opacity-60'
                          : active
                            ? 'border-primary bg-primary/12 text-primary ring-1 ring-primary/40'
                            : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                      }`}
                    >
                      {locked ? (
                        <Lock
                          size={12}
                          className="absolute right-2 top-2 text-muted-foreground"
                        />
                      ) : active ? (
                        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check size={10} strokeWidth={3} />
                        </span>
                      ) : null}
                      <Icon size={16} className="mb-1.5" />
                      <p className="font-bold uppercase tracking-wide">{pkg.shortName}</p>
                      <p className="mt-0.5 text-[10px] font-semibold text-primary">
                        {Math.round(pkg.discount * 100)}% OFF
                      </p>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            {/* 2. Bottles / week */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground">
                <span>2. Bottles / Week</span>
                <span className="font-serif text-lg text-primary">
                  {bottlesPerWeek} × 19L
                </span>
              </div>
              <input
                type="range"
                min={CUSTOM_PLAN_CONFIG.minBottles}
                max={CUSTOM_PLAN_CONFIG.maxBottles}
                value={bottlesPerWeek}
                onChange={(e) =>
                  handleBottlesChange(parseInt(e.target.value, 10))
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 accent-primary dark:bg-zinc-800"
                aria-label="Bottles per week"
              />
              <div className="flex justify-between text-[10px] font-semibold text-muted-foreground">
                <span>1</span>
                <span>15</span>
                <span>30</span>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                {bottlesPerWeek === 1 &&
                  `First bottle: PKR 1,800 + delivery. Packages locked. Refills from PKR ${CUSTOM_PLAN_CONFIG.minRefillPrice}.`}
                {bottlesPerWeek === 2 &&
                  `Two-bottle rule: PKR 1,500 each + refundable security (PKR ${CUSTOM_PLAN_CONFIG.securityDepositPerBottle} × 2). Refills from PKR ${CUSTOM_PLAN_CONFIG.minRefillPrice}.`}
                {bottlesPerWeek > 2 &&
                  `First delivery: PKR ${CUSTOM_PLAN_CONFIG.firstFillBulkUnit.toLocaleString()} / bottle. Refills never below PKR ${CUSTOM_PLAN_CONFIG.minRefillPrice}.`}
              </p>
            </div>

            {/* 3. Weekly / Monthly only */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                3. Delivery Frequency
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { id: 'weekly' as const, label: 'Weekly', hint: '1 week plan' },
                    { id: 'monthly' as const, label: 'Monthly', hint: '4 weeks · max duration rate' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFrequency(item.id)}
                    className={`rounded-xl border px-3 py-3 text-center text-xs font-semibold transition-all ${
                      frequency === item.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="block uppercase tracking-wide">{item.label}</span>
                    <span className="mt-0.5 block text-[10px] font-medium normal-case opacity-80">
                      {item.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Location */}
            <div className="space-y-3">
              <label
                htmlFor="order-city"
                className="block text-xs font-bold uppercase tracking-wider text-foreground"
              >
                4. Delivery Location
              </label>
              <select
                id="order-city"
                value={locationId}
                onChange={(e) => setLocationId(e.target.value as LocationId)}
                className="w-full rounded-xl border border-border bg-zinc-50 px-4 py-3 text-xs font-semibold text-foreground focus:border-primary focus:outline-none dark:bg-background"
              >
                {CUSTOM_PLAN_CONFIG.locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} (PKR {loc.deliveryFee} / trip)
                  </option>
                ))}
              </select>
              {packagesUnlocked && packageId === 'student' ? (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  Student package includes free delivery.
                </p>
              ) : null}
            </div>
          </div>

          {/* Right — summary */}
          <div className="sticky top-28 space-y-5 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:col-span-5">
            <h3 className="font-serif text-2xl font-light text-foreground">
              Order Summary
            </h3>

            <div className="space-y-2.5 border-y border-border py-5 text-xs">
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Package</span>
                <span className="font-semibold uppercase text-foreground">
                  {pricing.packagesUnlocked
                    ? pricing.package?.shortName
                    : 'Single bottle'}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Bottles / week</span>
                <span className="font-semibold text-primary">
                  {pricing.bottlesPerWeek} × 19L
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold text-foreground">
                  {pricing.duration.name}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Scheduled bottles</span>
                <span className="font-semibold text-foreground">
                  {pricing.totalBottles} × 19L
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Location</span>
                <span className="font-semibold text-foreground">
                  {pricing.location.name}
                </span>
              </div>

              <div className="space-y-2 border-t border-border pt-3 text-[11px]">
                {pricing.lineItems
                  .filter((i) => i.tone !== 'total')
                  .map((item) => (
                    <div
                      key={item.label}
                      className={`flex justify-between gap-2 ${
                        item.tone === 'discount'
                          ? 'font-medium text-emerald-600 dark:text-emerald-400'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <span className="min-w-0 leading-snug">{item.label}</span>
                      <span className="shrink-0 font-semibold text-foreground">
                        {item.amount < 0 ? '− ' : ''}
                        {formatPkr(Math.abs(item.amount))}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Amount payable today
              </span>
              <p className="font-serif text-3xl font-bold text-primary">
                {formatPkr(pricing.totalPayable)}
              </p>
              <div className="mt-2 flex justify-between border-t border-border pt-2 text-[11px] text-muted-foreground">
                <span>Est. monthly (ex-deposit)</span>
                <span className="font-bold text-foreground">
                  {formatPkr(
                    recurringQuote?.recurringTotal && frequency === 'monthly'
                      ? recurringQuote.recurringTotal
                      : pricing.estimatedMonthlyCost
                  )}
                </span>
              </div>
              {pricing.totalSavings > 0 ? (
                <div className="flex justify-between text-[11px] text-emerald-600 dark:text-emerald-400">
                  <span>Total savings</span>
                  <span className="font-bold">
                    {formatPkr(pricing.totalSavings)}
                  </span>
                </div>
              ) : null}
              {pricing.securityDeposit > 0 ? (
                <p className="pt-1 text-[10px] leading-relaxed text-muted-foreground">
                  {pricing.securityDepositNote}
                </p>
              ) : null}
            </div>

            {pricing.benefits.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {pricing.benefits.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[10px] font-semibold text-primary"
                  >
                    <Check size={10} />
                    {b}
                  </span>
                ))}
              </div>
            ) : null}

            {pricing.validationErrors.length > 0 ? (
              <p className="text-xs font-medium text-rose-500" role="alert">
                {pricing.validationErrors[0]}
              </p>
            ) : null}

            <div className="space-y-3 pt-1">
              <a
                href={`https://wa.me/923001234567?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppFallback}
                className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-xl bg-[#25D366] py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all hover:bg-[#20ba5a]"
              >
                <MessageCircle size={18} />
                <span>Order via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={openOrderModal}
                disabled={pricing.validationErrors.length > 0 || submitLock}
                className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-xl bg-primary py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-md transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>Confirm & Place Order</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <p className="pt-1 text-center text-[10px] font-light text-muted-foreground">
              * First-bottle &amp; security deposit charged once. Refills never
              below PKR {CUSTOM_PLAN_CONFIG.minRefillPrice}. Deposits are
              refundable and not discounted.
            </p>
          </div>
        </div>
      </main>

      <FooterSection />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialPackageDetails={{
          ...toOrderPackageDetails(pricing),
          frequency: pricing.duration.name,
          customerSegment: pricing.packagesUnlocked
            ? pricing.package?.name ?? 'Family / Individual'
            : 'Single Bottle',
          months: frequency === 'monthly' ? 1 : 1,
          weeks: pricing.weeks,
          pricingSnapshot: toOrderPricingSummary(pricing),
        }}
      />
    </div>
  )
}

export default function OrderWaterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-primary" />
        </div>
      }
    >
      <OrderWaterContent />
    </Suspense>
  )
}
