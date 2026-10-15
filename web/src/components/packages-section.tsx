'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Star, Sparkles, Droplets, ChevronLeft, ChevronRight, Calculator, Grid } from 'lucide-react'

import PricingCard3D from '@/components/PricingCard3D'
import PackageCalculator from '@/components/package-calculator'
import SectionHeader from '@/components/section-header'
import { useAuth } from '@/context/auth'
import { useLanguage } from '@/context/language'
import {
  CUSTOM_PLAN_CONFIG,
  quoteStandardPlan,
  type StandardFrequency,
} from '@/lib/pricing/custom-plan'

function formatPkr(n: number) {
  return `PKR ${n.toLocaleString()}`
}

export default function PackagesSection() {
  const router = useRouter()
  const { t } = useLanguage()
  const { user, openAuthModal } = useAuth()
  const [frequency, setFrequency] = useState<StandardFrequency>('monthly')
  const [isCustomActive, setIsCustomActive] = useState<boolean>(false)

  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handlePlanClick = (pkg: typeof packagesData[0]) => {
    if (pkg.id === 'custom') {
      setIsCustomActive(true)
      return
    }

    if (!user) {
      openAuthModal('signup')
      return
    }

    window.location.href = pkg.link
  }

  // Live quotes from shared pricing engine (first-fill + security + refill floor)
  const studentQuote = quoteStandardPlan('student', frequency)
  const familyQuote = quoteStandardPlan('family', frequency)
  const corporateQuote = quoteStandardPlan('corporate', frequency)

  const freqLabel =
    frequency === 'weekly' ? t.common.perWeek : t.common.perMonth

  const studentBullets = [
    `${studentQuote.totalBottles} × 19L bottles ${frequency === 'weekly' ? 'this week' : 'per month'}`,
    `First bottle PKR ${studentQuote.firstFillUnitPrice.toLocaleString()} · refills from PKR ${studentQuote.refillUnitPrice.toLocaleString()}`,
    'Free doorstep delivery · Flexible pause',
  ]

  const familyBullets = [
    `${familyQuote.bottlesPerWeek} × 19L / week (${familyQuote.totalBottles} ${frequency === 'weekly' ? 'this week' : 'per month'})`,
    `First bottles PKR ${familyQuote.firstFillUnitPrice.toLocaleString()} each`,
    familyQuote.securityDeposit > 0
      ? `Refundable security PKR ${familyQuote.securityDeposit.toLocaleString()} (once)`
      : `Refills from PKR ${familyQuote.refillUnitPrice.toLocaleString()} (min PKR ${CUSTOM_PLAN_CONFIG.minRefillPrice})`,
  ]

  const corporateBullets = [
    `${corporateQuote.bottlesPerWeek}+ × 19L / week (${corporateQuote.totalBottles} ${frequency === 'weekly' ? 'this week' : 'per month'})`,
    `First bottles PKR ${corporateQuote.firstFillUnitPrice.toLocaleString()} each · refills from PKR ${corporateQuote.refillUnitPrice.toLocaleString()}`,
    'Bulk logistics · Dedicated account support',
  ]

  const packagesData = [
    {
      id: 'student',
      num: '01 / INDIVIDUALS',
      Icon: Droplets,
      title: t.packages.student.name,
      desc: t.packages.cards.student.shortDesc,
      price: formatPkr(studentQuote.recurringTotal),
      freq: `${freqLabel} · setup ${formatPkr(studentQuote.firstOrderPayable)}`,
      bullets: studentBullets,
      link: `/order?plan=student&freq=${frequency}`,
      btnText: t.packages.subscribePlan,
      isPopular: false,
      btnStyle: 'bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground',
      priceStyle: 'text-xl sm:text-2xl font-medium font-serif text-foreground tracking-tight',
    },
    {
      id: 'family',
      num: '02 / HOUSEHOLDS',
      Icon: Sparkles,
      title: t.packages.family.name,
      desc: t.packages.cards.family.shortDesc,
      price: formatPkr(familyQuote.recurringTotal),
      freq: `${freqLabel} · setup ${formatPkr(familyQuote.firstOrderPayable)}`,
      bullets: familyBullets,
      link: `/order?plan=family&freq=${frequency}`,
      btnText: t.packages.subscribePlan,
      isPopular: true,
      badge: 'MOST POPULAR',
      btnStyle: 'bg-primary hover:bg-primary-hover text-primary-foreground shadow-md shadow-primary/20',
      priceStyle: 'text-xl sm:text-2xl font-medium font-serif text-primary tracking-tight',
    },
    {
      id: 'corporate',
      num: '03 / BUSINESSES',
      Icon: Droplets,
      title: t.packages.corporate.name,
      desc: t.packages.cards.corporate.shortDesc,
      price: formatPkr(corporateQuote.recurringTotal),
      freq: `${freqLabel} · setup ${formatPkr(corporateQuote.firstOrderPayable)}`,
      bullets: corporateBullets,
      link: `/order?plan=corporate&freq=${frequency}`,
      btnText: t.packages.subscribePlan,
      isPopular: false,
      btnStyle: 'bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground',
      priceStyle: 'text-xl sm:text-2xl font-medium font-serif text-foreground tracking-tight',
    },
    {
      id: 'custom',
      num: '04 / TAILORED',
      Icon: Droplets,
      title: t.packages.custom.name,
      desc: t.packages.cards.custom.shortDesc,
      price: 'Configurable Pricing',
      freq: 'Calculated in real time',
      bullets: [
        'Choose exact bottle count',
        'First bottle + security deposit priced accurately',
        'Instant calculator breakdown',
      ],
      link: '#calculator',
      btnText: t.packages.custom.btn,
      isPopular: false,
      isCustomPrice: true,
      btnStyle: 'bg-primary hover:bg-primary-hover text-primary-foreground shadow-sm',
      priceStyle: 'text-lg sm:text-xl font-serif font-light text-primary',
    },
  ]

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const card = container.children[index] as HTMLElement
    if (card) {
      const cardLeft = card.offsetLeft
      const cardWidth = card.offsetWidth
      const containerWidth = container.offsetWidth
      container.scrollTo({
        left: cardLeft - (containerWidth - cardWidth) / 2,
        behavior: 'smooth',
      })
      setActiveIndex(index)
    }
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const scrollPosition = container.scrollLeft + container.offsetWidth / 2
    const children = Array.from(container.children) as HTMLElement[]

    let closestIndex = 0
    let minDistance = Infinity

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const distance = Math.abs(scrollPosition - childCenter)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }

  const renderCardContent = (pkg: typeof packagesData[0]) => {
    const IconComp = pkg.Icon
    return (
      <div className="relative flex flex-col justify-between h-full overflow-visible bg-card/95 p-4 sm:p-5 rounded-[var(--radius-xl)] shadow-xs group">
        {pkg.isPopular && (
          <div className="mb-3 flex justify-center">
            <div className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-[0.16em] shadow-sm whitespace-nowrap">
              <Star size={9} className="fill-current" />
              <span>{pkg.badge}</span>
            </div>
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between items-center">
            <span className={`text-[8px] font-semibold uppercase tracking-[0.16em] ${pkg.isPopular || pkg.id === 'custom' ? 'text-primary' : 'text-muted-foreground'}`}>
              {pkg.num}
            </span>
            <IconComp size={14} className="text-primary" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-serif font-medium text-foreground tracking-tight">
              {pkg.title}
            </h3>
            <p className="text-[12px] text-muted-foreground font-normal leading-relaxed">
              {pkg.desc}
            </p>
          </div>

          <div className="py-2.5 border-y border-border/70">
            <span className={pkg.priceStyle}>
              {pkg.price}
            </span>
            <span className="text-[10px] text-muted-foreground font-normal block mt-0.5">
              {pkg.freq}
            </span>
          </div>

          <ul className="space-y-2 text-[12px] text-muted-foreground font-normal">
            {pkg.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check size={12} className="text-primary shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 sm:pt-5 relative z-50 pointer-events-auto" style={{ transform: 'translateZ(25px)' }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handlePlanClick(pkg)
            }}
            className={`w-full min-h-11 py-2.5 rounded-[var(--radius-lg)] text-[10px] font-semibold uppercase tracking-[0.14em] inline-flex items-center justify-center transition-all duration-300 cursor-pointer relative z-50 pointer-events-auto ${pkg.btnStyle}`}
          >
            {user || pkg.id === 'custom' ? pkg.btnText : t.packages.subscribePlan}
          </button>
        </div>

      </div>
    )
  }

  return (
    <section
      id="packages"
      className="section-padding w-full border-t border-border/50 transition-colors duration-300 font-sans overflow-x-clip"
    >
      <div className="container-custom">
        <SectionHeader
          eyebrow={t.home.packages.eyebrow}
          title={t.home.packages.title}
          lead={t.home.packages.lead}
        />

        <div className="flex items-center justify-center">
          <div className="segmented-control">
            <button
              type="button"
              onClick={() => setIsCustomActive(false)}
              data-active={!isCustomActive}
              className="flex items-center gap-2"
            >
              <Grid size={15} />
              <span>{t.home.packages.standardPlans}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCustomActive(true)}
              data-active={isCustomActive}
              className="flex items-center gap-2"
            >
              <Calculator size={15} />
              <span>{t.home.packages.customConfigurator}</span>
            </button>
          </div>
        </div>

        {!isCustomActive && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-3 pt-5"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-[11px]">
              {t.home.packages.howOften}
            </span>
            <div className="segmented-control max-w-full flex-wrap justify-center">
              {(
                [
                  { id: 'weekly' as const, label: t.home.packages.weekly },
                  { id: 'monthly' as const, label: t.home.packages.monthly },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFrequency(tab.id)}
                  data-active={frequency === tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="relative mt-6 w-full sm:mt-8">
        {/* Left Edge Arrow Button */}
        {!isCustomActive ? (
          <button
            onClick={() => setIsCustomActive(true)}
            className="hidden md:flex absolute -left-4 lg:-left-7 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-card/95 text-primary border border-border backdrop-blur-md shadow-md hover:scale-105 active:scale-95 transition-all items-center justify-center cursor-pointer group"
            title="Switch to Custom Plan Configurator"
            aria-label="Switch to Custom Plan Configurator"
          >
            <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <button
            onClick={() => setIsCustomActive(false)}
            className="hidden md:flex absolute -left-4 lg:-left-7 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-primary text-primary-foreground border border-primary shadow-md hover:scale-105 active:scale-95 transition-all items-center justify-center cursor-pointer group"
            title="Back to Standard Cards"
            aria-label="Back to Standard Cards"
          >
            <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Right Edge Arrow Button */}
        {!isCustomActive ? (
          <button
            onClick={() => setIsCustomActive(true)}
            className="hidden md:flex absolute -right-4 lg:-right-7 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-primary text-primary-foreground border border-primary shadow-md hover:scale-105 active:scale-95 transition-all items-center justify-center cursor-pointer group"
            title="Switch to Custom Plan Configurator"
            aria-label="Switch to Custom Plan Configurator"
          >
            <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <button
            onClick={() => setIsCustomActive(false)}
            className="hidden md:flex absolute -right-4 lg:-right-7 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-card/95 text-primary border border-border backdrop-blur-md shadow-md hover:scale-105 active:scale-95 transition-all items-center justify-center cursor-pointer group"
            title="Back to Standard Cards"
            aria-label="Back to Standard Cards"
          >
            <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* AnimatePresence Sliding Views */}
        <AnimatePresence mode="wait">
          {!isCustomActive ? (
            <motion.div
              key="standard-cards-view"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* Mobile slider */}
              <div className="block md:hidden relative">
                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory gap-4 pt-6 pb-4 px-2 -mx-2 scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {packagesData.map((pkg) => (
                    <div key={pkg.id} className="w-[85vw] max-w-[310px] flex-shrink-0 snap-center py-2">
                      <PricingCard3D isPopular={pkg.isPopular} onClick={() => handlePlanClick(pkg)}>
                        {renderCardContent(pkg)}
                      </PricingCard3D>
                    </div>
                  ))}
                </div>

                {/* Mobile Navigation Controls */}
                <div className="flex items-center justify-between px-4 pt-2">
                  <button
                    onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
                    disabled={activeIndex === 0}
                    className="p-2.5 rounded-full bg-card text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 disabled:opacity-30 shadow-md transition-all active:scale-95 cursor-pointer"
                    aria-label="Previous Plan"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className="flex items-center space-x-2">
                    {packagesData.map((pkg, idx) => (
                      <button
                        key={pkg.id}
                        onClick={() => scrollToCard(idx)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          activeIndex === idx
                            ? 'w-6 bg-primary'
                            : 'w-2 bg-slate-300 dark:bg-slate-700'
                        }`}
                        aria-label={`Go to ${pkg.title} plan`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => scrollToCard(Math.min(packagesData.length - 1, activeIndex + 1))}
                    disabled={activeIndex === packagesData.length - 1}
                    className="p-2.5 rounded-full bg-card text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 disabled:opacity-30 shadow-md transition-all active:scale-95 cursor-pointer"
                    aria-label="Next Plan"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Desktop grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch overflow-visible">
                {packagesData.map((pkg) => (
                  <PricingCard3D key={pkg.id} isPopular={pkg.isPopular} onClick={() => handlePlanClick(pkg)}>
                    {renderCardContent(pkg)}
                  </PricingCard3D>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="custom-calculator-view"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <PackageCalculator embedded={true} />
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
