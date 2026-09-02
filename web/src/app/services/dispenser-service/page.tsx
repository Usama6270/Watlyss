'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { ShieldCheck, Snowflake, Check, ArrowRight, Zap } from 'lucide-react'

export default function DispenserServicePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-400">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:underline">Services</Link>
          <span>/</span>
          <span className="text-zinc-400">Dispenser & Chiller Service</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0064D0]/10 text-[#0064D0]">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
            Luxury Dispenser & Chiller Service
          </h1>
          <p className="text-zinc-550 dark:text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Elevate home kitchens and office lounges with quiet, high-efficiency stainless steel water chillers designed specifically for heavy glass containers without risk of neck cracking or valve leakage.
          </p>
        </div>

        {/* Dispenser Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Residential Tabletop Stand</h3>
              <span className="text-xs font-bold text-[#0064D0] bg-[#0064D0]/10 px-2.5 py-1 rounded-full">Included Free</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Crafted from brushed stainless steel with non-slip silicone feet. Fits elegantly on kitchen countertops.
            </p>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300 font-light">
              <li className="flex items-center space-x-2"><Check size={14} className="text-[#0064D0]" /><span>Fits 1L and 1.5L glass bottles</span></li>
              <li className="flex items-center space-x-2"><Check size={14} className="text-[#0064D0]" /><span>Food-grade stainless steel spout</span></li>
            </ul>
          </div>

          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Executive Electric Chiller</h3>
              <span className="text-xs font-bold text-[#0064D0] bg-[#0064D0]/10 px-2.5 py-1 rounded-full">$14.99 / mo</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Dual temperature precision cooling (chilled 4°C / room temperature 20°C) with whisper-quiet compressor.
            </p>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300 font-light">
              <li className="flex items-center space-x-2"><Check size={14} className="text-[#0064D0]" /><span>Energy Star certified ultra-quiet cooling</span></li>
              <li className="flex items-center space-x-2"><Check size={14} className="text-[#0064D0]" /><span>Quarterly deep-cleaning sanitization service</span></li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 bg-zinc-50 dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl text-center space-y-6">
          <h3 className="text-2xl font-serif font-light text-zinc-900 dark:text-white">Need a custom corporate chiller installation?</h3>
          <div className="pt-2">
            <Link
              href="/contact?service=dispenser"
              className="px-8 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <span>Inquire Dispenser Lease</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
