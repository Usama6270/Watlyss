'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Check, Star, Sparkles, Droplets, ChevronLeft, ChevronRight } from 'lucide-react'

import PricingCard3D from '@/components/PricingCard3D'

export default function PackagesSection() {
  const [frequency, setFrequency] = useState<'weekly' | 'monthly' | 'annual'>('monthly')
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
      btnStyle: 'bg-zinc-100 dark:bg-white dark:text-black hover:dark:bg-slate-100 text-zinc-900 group-hover:bg-[#0064D0] group-hover:text-white',
      priceStyle: 'text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white',
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
      btnStyle: 'bg-[#0064D0] hover:bg-[#0052ad] text-white shadow-xl shadow-[#0064D0]/30 hover:shadow-[#0064D0]/50',
      priceStyle: 'text-3xl sm:text-4xl font-black text-[#0064D0]',
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
      btnStyle: 'bg-zinc-100 dark:bg-white dark:text-black hover:dark:bg-slate-100 text-zinc-900 group-hover:bg-[#0064D0] group-hover:text-white',
      priceStyle: 'text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white',
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
      btnStyle: 'bg-[#0064D0] hover:bg-[#0052ad] text-white shadow-sm',
      priceStyle: 'text-lg sm:text-xl font-serif font-light text-[#0064D0]',
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
      <div className={`relative flex flex-col justify-between h-full ${pkg.id === 'custom' ? 'bg-zinc-50/80 dark:bg-[#162447]/90' : 'bg-white dark:bg-[#162447]/90'} p-5 sm:p-8 rounded-2xl shadow-lg shadow-black/10 group ${pkg.isPopular ? 'pt-7 sm:pt-8' : ''}`}>
        {pkg.isPopular && (
          <div
            className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0064D0] text-white px-3.5 py-1 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-widest flex items-center space-x-1.5 shadow-lg shadow-[#0064D0]/40 z-20 whitespace-nowrap"
            style={{ transform: 'translateZ(45px) translateX(-50%)' }}
          >
            <Star size={11} className="fill-white" />
            <span>{pkg.badge}</span>
          </div>
        )}

        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center">
            <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest ${pkg.isPopular || pkg.id === 'custom' ? 'text-[#0064D0]' : 'text-zinc-400 dark:text-slate-400'}`}>
              {pkg.num}
            </span>
            <IconComp size={16} className="text-[#0064D0] sm:w-[18px] sm:h-[18px]" />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 dark:text-white tracking-wide">
              {pkg.title}
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-slate-200 font-light leading-relaxed">
              {pkg.desc}
            </p>
          </div>

          <div className="py-3 sm:py-4 border-y border-zinc-100 dark:border-slate-700/60">
            <span className={pkg.priceStyle}>
              {pkg.price}
            </span>
            <span className="text-[9px] sm:text-[10px] text-zinc-400 dark:text-slate-400 font-light block mt-0.5 sm:mt-1">
              {pkg.freq}
            </span>
          </div>

          <ul className="space-y-2.5 sm:space-y-3 text-[11px] sm:text-xs text-zinc-600 dark:text-slate-200 font-light">
            {pkg.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-center space-x-2.5">
                <Check size={13} className="text-[#0064D0] shrink-0 sm:w-[14px] sm:h-[14px]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-5 sm:pt-8" style={{ transform: 'translateZ(20px)' }}>
          <Link
            href={pkg.link}
            className={`w-full py-3 sm:py-3.5 rounded-xl text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center transition-all duration-300 ${pkg.btnStyle}`}
          >
            {pkg.btnText}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section id="packages" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-slate-200/80 dark:border-slate-800/60 bg-[#FAF9F6] dark:bg-[#0b1329] transition-colors duration-300 font-sans">
      {/* Editorial Header */}
      <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-16">
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#0064D0]">
          CURATED HYDRATION PLANS
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-wide leading-tight">
          Water Plans Made For You.
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 font-light max-w-lg mx-auto">
          Choose a delivery plan that fits your lifestyle, family, or business.
        </p>

        {/* PACKAGE FREQUENCY SELECTOR — Premium Segmented Control */}
        <div className="pt-6 sm:pt-8 flex flex-col items-center space-y-3">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-slate-300">
            How often do you need water?
          </span>
          <div className="flex flex-wrap items-center justify-center p-1 sm:p-1.5 bg-zinc-100 dark:bg-[#131c38] border border-zinc-200/80 dark:border-slate-800 rounded-2xl gap-1 shadow-inner max-w-full">
            {[
              { id: 'weekly', label: 'WEEKLY' },
              { id: 'monthly', label: 'MONTHLY' },
              { id: 'annual', label: 'ANNUAL (SAVE 20%)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFrequency(tab.id as any)}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-bold tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
                  frequency === tab.id
                    ? 'bg-[#0064D0] text-white shadow-md'
                    : 'text-zinc-500 dark:text-slate-300 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

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
              <PricingCard3D isPopular={pkg.isPopular}>
                {renderCardContent(pkg)}
              </PricingCard3D>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Controls (Dots + Arrow Buttons) */}
        <div className="flex items-center justify-between px-4 pt-2">
          <button
            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="p-2.5 rounded-full bg-white dark:bg-[#162447] text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 disabled:opacity-30 shadow-md transition-all active:scale-95 cursor-pointer"
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
                    ? 'w-6 bg-[#0064D0]'
                    : 'w-2 bg-slate-300 dark:bg-slate-700'
                }`}
                aria-label={`Go to ${pkg.title} plan`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToCard(Math.min(packagesData.length - 1, activeIndex + 1))}
            disabled={activeIndex === packagesData.length - 1}
            className="p-2.5 rounded-full bg-white dark:bg-[#162447] text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 disabled:opacity-30 shadow-md transition-all active:scale-95 cursor-pointer"
            aria-label="Next Plan"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* DESKTOP GRID (>= md) — 100% UNCHANGED */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {packagesData.map((pkg) => (
          <PricingCard3D key={pkg.id} isPopular={pkg.isPopular}>
            {renderCardContent(pkg)}
          </PricingCard3D>
        ))}
      </div>
    </section>
  )
}

