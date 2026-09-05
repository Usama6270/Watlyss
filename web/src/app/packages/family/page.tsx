'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import Image from 'next/image'
import { Check, ShieldCheck, Heart, ArrowRight, Home, Sparkles } from 'lucide-react'

export default function FamilyPackagePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a1128] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/packages" className="hover:underline">Packages</Link>
          <span>/</span>
          <span className="text-zinc-400">Family Collection</span>
        </div>

        {/* Hero Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#0064D0] bg-[#0064D0]/10 px-3.5 py-1.5 rounded-full border border-[#0064D0]/20">
              POPULAR HOUSEHOLD WELLNESS
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
              Family Wellness Collection
            </h1>
            <p className="text-zinc-550 dark:text-slate-200 text-sm sm:text-base font-light leading-relaxed">
              Complete daily mineral hydration for households of all sizes. Sourced from protected volcanic aquifers and delivered in elegant wooden crates containing our signature 1L & 1.5L glass vessels.
            </p>
            <div className="pt-2 flex items-baseline space-x-4">
              <span className="text-4xl font-serif font-light text-[#0064D0]">$49.99</span>
              <span className="text-xs uppercase text-zinc-400 font-bold tracking-widest">/ Month (Bi-weekly Refills)</span>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/checkout?plan=family"
                className="px-8 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>Subscribe Family Plan</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-zinc-200 dark:border-slate-800 text-zinc-800 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center transition-all"
              >
                Custom Family Crate
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-square sm:h-[450px] bg-zinc-50 dark:bg-[#131c38] rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-slate-800/60 shadow-sm flex items-center justify-center p-8">
            <Image
              src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=750&q=80"
              alt="Family Hydration Collection"
              fill
              className="object-contain p-8"
              priority
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="p-8 bg-white dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 rounded-2xl space-y-3">
            <Home className="text-[#0064D0]" size={24} />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Handcrafted Wooden Crates</h3>
            <p className="text-xs text-zinc-500 dark:text-slate-200 font-light leading-relaxed">
              Delivered safely to your home in reusable wooden crates that protect glass vessels and store neatly in pantries.
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 rounded-2xl space-y-3">
            <Sparkles className="text-[#0064D0]" size={24} />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">TDS 180 Mineral Balance</h3>
            <p className="text-xs text-zinc-500 dark:text-slate-200 font-light leading-relaxed">
              Rich in bioavailable calcium, magnesium, and silica essential for growing children and adult joint health.
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 rounded-2xl space-y-3">
            <Heart className="text-[#0064D0]" size={24} />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">100% Microplastic-Free</h3>
            <p className="text-xs text-zinc-500 dark:text-slate-200 font-light leading-relaxed">
              Ensure your household drinks zero synthetic polymers or plasticizer runoff found in disposable bottles.
            </p>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
