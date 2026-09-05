'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, Star, Sparkles, Droplets } from 'lucide-react'

export default function PackagesSection() {
  const [frequency, setFrequency] = useState<'weekly' | 'monthly' | 'annual'>('monthly')

  // Pricing calculations
  const studentPrice = frequency === 'weekly' ? 'PKR 350' : frequency === 'monthly' ? 'PKR 1,200' : 'PKR 12,000'
  const familyPrice = frequency === 'weekly' ? 'PKR 750' : frequency === 'monthly' ? 'PKR 2,800' : 'PKR 27,000'
  const corporatePrice = frequency === 'weekly' ? 'PKR 1,500' : frequency === 'monthly' ? 'PKR 5,500' : 'PKR 54,000'

  const freqLabel = frequency === 'weekly' ? '/ week' : frequency === 'monthly' ? '/ month' : '/ year'

  return (
    <section id="packages" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-zinc-200/40 dark:border-slate-800/60 bg-white dark:bg-[#0b1329] transition-colors duration-300 font-sans">

      {/* Editorial Header */}
      <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#0064D0]">
          CURATED HYDRATION PLANS
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-white tracking-wide leading-tight">
          Water Plans Made For You.
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-slate-200 font-light max-w-lg mx-auto">
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
                className={`px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-bold tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${frequency === tab.id
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

      {/* FOUR PRIMARY PACKAGE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">

        {/* 1. STUDENT PACKAGE */}
        <div className="flex flex-col justify-between bg-white dark:bg-[#162447]/90 border border-zinc-200/80 dark:border-slate-700/60 p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:border-[#0064D0] shadow-lg shadow-black/10 group">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:text-slate-400">01 / INDIVIDUALS</span>
              <Droplets size={18} className="text-[#0064D0]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white tracking-wide">STUDENT</h3>
              <p className="text-xs text-zinc-500 dark:text-slate-200 font-light">For individuals and students.</p>
            </div>

            <div className="py-4 border-y border-zinc-100 dark:border-slate-700/60">
              <span className="text-3xl font-black text-zinc-900 dark:text-white">
                {studentPrice}
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-slate-400 font-light block mt-1">{freqLabel}</span>
            </div>

            <ul className="space-y-3 text-xs text-zinc-600 dark:text-slate-200 font-light">
              <li className="flex items-center space-x-2.5"><Check size={14} className="text-[#0064D0]" /><span>1–2 bottles per delivery</span></li>
              <li className="flex items-center space-x-2.5"><Check size={14} className="text-[#0064D0]" /><span>Flexible delivery schedule</span></li>
              <li className="flex items-center space-x-2.5"><Check size={14} className="text-[#0064D0]" /><span>Budget friendly rates</span></li>
            </ul>
          </div>

          <div className="pt-8">
            <Link
              href="/order?plan=student"
              className="w-full py-3.5 bg-zinc-100 dark:bg-white dark:text-black hover:dark:bg-slate-100 text-zinc-900 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center transition-all duration-300 shadow-md"
            >
              Choose Plan
            </Link>
          </div>
        </div>

        {/* 2. FAMILY PACKAGE — FEATURED "MOST POPULAR" */}
        <div className="relative flex flex-col justify-between bg-white dark:bg-[#162447]/90 border-2 border-[#0064D0] p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 transform lg:-translate-y-2">

          {/* MOST POPULAR BADGE */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0064D0] text-white px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center space-x-1.5 shadow-md">
            <Star size={11} className="fill-white" />
            <span>MOST POPULAR</span>
          </div>

          <div className="space-y-6 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#0064D0]">02 / HOUSEHOLDS</span>
              <Sparkles size={18} className="text-[#0064D0]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white tracking-wide">FAMILY</h3>
              <p className="text-xs text-zinc-500 dark:text-slate-200 font-light">For regular household water needs.</p>
            </div>

            <div className="py-4 border-y border-zinc-100 dark:border-slate-700/60">
              <span className="text-4xl font-black text-[#0064D0]">
                {familyPrice}
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-slate-400 font-light block mt-1">{freqLabel}</span>
            </div>

            <ul className="space-y-3 text-xs text-zinc-600 dark:text-slate-200 font-light">
              <li className="flex items-center space-x-2.5"><Check size={14} className="text-[#0064D0]" /><span>Multiple 19L bottles</span></li>
              <li className="flex items-center space-x-2.5"><Check size={14} className="text-[#0064D0]" /><span>Scheduled recurring delivery</span></li>
              <li className="flex items-center space-x-2.5"><Check size={14} className="text-[#0064D0]" /><span>Priority convenience & refills</span></li>
            </ul>
          </div>

          <div className="pt-8">
            <Link
              href="/order?plan=family"
              className="w-full py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center transition-all duration-300 shadow-md"
            >
              Choose Plan
            </Link>
          </div>
        </div>

        {/* 3. CORPORATE PACKAGE */}
        <div className="flex flex-col justify-between bg-white dark:bg-[#162447]/90 border border-zinc-200/80 dark:border-slate-700/60 p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:border-[#0064D0] shadow-lg shadow-black/10 group">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:text-slate-400">03 / BUSINESSES</span>
              <Droplets size={18} className="text-[#0064D0]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white tracking-wide">CORPORATE</h3>
              <p className="text-xs text-zinc-500 dark:text-slate-200 font-light">For offices and businesses.</p>
            </div>

            <div className="py-4 border-y border-zinc-100 dark:border-slate-700/60">
              <span className="text-3xl font-black text-zinc-900 dark:text-white">
                {corporatePrice}
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-slate-400 font-light block mt-1">{freqLabel}</span>
            </div>

            <ul className="space-y-3 text-xs text-zinc-600 dark:text-slate-200 font-light">
              <li className="flex items-center space-x-2.5"><Check size={14} className="text-[#0064D0]" /><span>Bulk requirements supply</span></li>
              <li className="flex items-center space-x-2.5"><Check size={14} className="text-[#0064D0]" /><span>Scheduled deliveries</span></li>
              <li className="flex items-center space-x-2.5"><Check size={14} className="text-[#0064D0]" /><span>Reliable recurring service</span></li>
            </ul>
          </div>

          <div className="pt-8">
            <Link
              href="/order?plan=corporate"
              className="w-full py-3.5 bg-zinc-100 dark:bg-white dark:text-black hover:dark:bg-slate-100 text-zinc-900 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center transition-all duration-300 shadow-md"
            >
              Choose Plan
            </Link>
          </div>
        </div>

        {/* 4. CUSTOM PACKAGE */}
        <div className="flex flex-col justify-between bg-zinc-50/80 dark:bg-[#162447]/90 border border-zinc-200/80 dark:border-slate-700/60 p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:border-[#0064D0] shadow-lg shadow-black/10 group">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#0064D0]">04 / TAILORED</span>
              <Droplets size={18} className="text-[#0064D0]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white tracking-wide">CUSTOM</h3>
              <p className="text-xs text-zinc-500 dark:text-slate-200 font-light">Build a plan according to your exact requirements.</p>
            </div>

            <div className="py-4 border-y border-zinc-200/60 dark:border-slate-700/60">
              <span className="text-xl font-serif font-light text-[#0064D0]">
                Configurable Pricing
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-slate-400 font-light block mt-1">Calculated in real time</span>
            </div>

            <ul className="space-y-3 text-xs text-zinc-600 dark:text-slate-200 font-light">
              <li className="flex items-center space-x-2.5"><Check size={14} className="text-[#0064D0]" /><span>Choose exact bottle count</span></li>
              <li className="flex items-center space-x-2.5"><Check size={14} className="text-[#0064D0]" /><span>Flexible delivery dates</span></li>
              <li className="flex items-center space-x-2.5"><Check size={14} className="text-[#0064D0]" /><span>Instant calculator breakdown</span></li>
            </ul>
          </div>

          <div className="pt-8">
            <a
              href="#calculator"
              className="w-full py-3.5 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center transition-all duration-300 shadow-sm"
            >
              Build Your Plan
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
