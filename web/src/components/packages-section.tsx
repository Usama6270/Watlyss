'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Star, Sparkles, Droplets, ChevronLeft, ChevronRight, Calculator, Grid } from 'lucide-react'

import PricingCard3D from '@/components/PricingCard3D'
import PackageCalculator from '@/components/package-calculator'
import { useAuth } from '@/context/auth'

export default function PackagesSection() {
  const router = useRouter()
  const { user, openAuthModal } = useAuth()
  const [frequency, setFrequency] = useState<'weekly' | 'monthly' | 'annual'>('monthly')
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

  // Pricing calculations
  const studentPrice = frequency === 'weekly' ? 'PKR 350' : frequency === 'monthly' ? 'PKR 1,200' : 'PKR 12,000'
  const familyPrice = frequency === 'weekly' ? 'PKR 750' : frequency === 'monthly' ? 'PKR 2,800' : 'PKR 27,000'
  const corporatePrice = frequency === 'weekly' ? 'PKR 1,500' : frequency === 'monthly' ? 'PKR 5,500' : 'PKR 54,000'

  const freqLabel = frequency === 'weekly' ? '/ week' : frequency === 'monthly' ? '/ month' : '/ year'

  const packagesData = [
    {
      id: 'student',
      num: '01 / INDIVIDUALS',
      Icon: Droplets,
      title: 'STUDENT',
      desc: 'For individuals and students.',
      price: studentPrice,
      freq: freqLabel,
      bullets: [
        '1–2 bottles per delivery',
        'Flexible delivery schedule',
        'Budget friendly rates',
      ],
      link: '/order?plan=student',
      btnText: 'CHOOSE PLAN',
      isPopular: false,
      btnStyle: 'bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground',
      priceStyle: 'text-xl sm:text-2xl font-medium font-serif text-foreground tracking-tight',
    },
    {
      id: 'family',
      num: '02 / HOUSEHOLDS',
      Icon: Sparkles,
      title: 'FAMILY',
      desc: 'For regular household water needs.',
      price: familyPrice,
      freq: freqLabel,
      bullets: [
        'Multiple 19L bottles',
        'Scheduled recurring delivery',
        'Priority convenience & refills',
      ],
      link: '/order?plan=family',
      btnText: 'CHOOSE PLAN',
      isPopular: true,
      badge: 'MOST POPULAR',
      btnStyle: 'bg-primary hover:bg-primary-hover text-primary-foreground shadow-md shadow-primary/20',
      priceStyle: 'text-xl sm:text-2xl font-medium font-serif text-primary tracking-tight',
    },
    {
      id: 'corporate',
      num: '03 / BUSINESSES',
      Icon: Droplets,
      title: 'CORPORATE',
      desc: 'For offices and businesses.',
      price: corporatePrice,
      freq: freqLabel,
      bullets: [
        'Bulk requirements supply',
        'Scheduled deliveries',
        'Reliable recurring service',
      ],
      link: '/order?plan=corporate',
      btnText: 'CHOOSE PLAN',
      isPopular: false,
      btnStyle: 'bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground',
      priceStyle: 'text-xl sm:text-2xl font-medium font-serif text-foreground tracking-tight',
    },
    {
      id: 'custom',
      num: '04 / TAILORED',
      Icon: Droplets,
      title: 'CUSTOM',
      desc: 'Build a plan according to your exact requirements.',
      price: 'Configurable Pricing',
      freq: 'Calculated in real time',
      bullets: [
        'Choose exact bottle count',
        'Flexible delivery dates',
        'Instant calculator breakdown',
      ],
      link: '#calculator',
      btnText: 'BUILD YOUR PLAN',
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
            {user || pkg.id === 'custom' ? pkg.btnText : 'SUBSCRIBE PLAN'}
          </button>
        </div>

      </div>
    )
  }

  return (
    <section id="packages" className="scroll-mt-24 sm:scroll-mt-28 w-full border-t border-border/50 transition-colors duration-300 font-sans overflow-x-clip">
      <div className="container-custom section-padding">
      <div className="text-center mb-7 sm:mb-9">
        <span className="eyebrow">Curated Hydration Plans</span>
        <h2 className="section-title mt-2.5 sm:mt-3">Water Plans Made For You.</h2>
        <p className="section-lead mx-auto mt-2.5">
          Choose a standard delivery plan or build a custom plan with our interactive calculator.
        </p>

        {/* VIEW TOGGLE SEGMENTED CONTROL */}
        <div className="pt-6 flex justify-center items-center">
          <div className="segmented-control">
            <button
              type="button"
              onClick={() => setIsCustomActive(false)}
              data-active={!isCustomActive}
              className="flex items-center gap-2"
            >
              <Grid size={15} />
              <span>Standard Plans</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCustomActive(true)}
              data-active={isCustomActive}
              className="flex items-center gap-2"
            >
              <Calculator size={15} />
              <span>Custom Configurator</span>
            </button>
          </div>
        </div>

        {/* PACKAGE FREQUENCY SELECTOR — Visible in Standard Cards View */}
        {!isCustomActive && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-5 flex flex-col items-center space-y-3"
          >
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              How often do you need water?
            </span>
            <div className="segmented-control flex-wrap justify-center max-w-full">
              {[
                { id: 'weekly', label: 'WEEKLY' },
                { id: 'monthly', label: 'MONTHLY' },
                { id: 'annual', label: 'ANNUAL (SAVE 20%)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFrequency(tab.id as any)}
                  data-active={frequency === tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* PRICING CONTAINER WITH EDGE NAVIGATION ARROWS AND FRAMER MOTION SLIDING VIEWS */}
      <div className="relative w-full">
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
            /* VIEW 1: STANDARD PRICING CARDS */
            <motion.div
              key="standard-cards-view"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* MOBILE SLIDER (< md) */}
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

              {/* DESKTOP GRID (>= md) */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch overflow-visible">
                {packagesData.map((pkg) => (
                  <PricingCard3D key={pkg.id} isPopular={pkg.isPopular} onClick={() => handlePlanClick(pkg)}>
                    {renderCardContent(pkg)}
                  </PricingCard3D>
                ))}
              </div>
            </motion.div>
          ) : (
            /* VIEW 2: CUSTOM CONFIGURATOR / CALCULATOR */
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
