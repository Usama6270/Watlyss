'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { Wrench, ShieldCheck, Check, ArrowRight } from 'lucide-react'

export default function FreeInstallationPage() {
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
          <span className="text-zinc-400">Free Bottle Installation</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0064D0]/10 text-[#0064D0]">
            <Wrench size={28} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
            Free Bottle & Stand Installation
          </h1>
          <p className="text-zinc-550 dark:text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Every Watlys recurring subscription includes complimentary white-glove setup. Our certified technicians assemble your glass bottle stands, calibrate flow rates, and inspect safety locks.
          </p>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Home Setup Workflow</h3>
            <ul className="space-y-3 text-xs text-zinc-500 dark:text-zinc-400 font-light">
              <li className="flex items-center space-x-3">
                <Check size={14} className="text-[#0064D0]" />
                <span>Placement inspection for optimal kitchen or dining aesthetics</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check size={14} className="text-[#0064D0]" />
                <span>Assembly of stainless steel or wooden floor stands</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check size={14} className="text-[#0064D0]" />
                <span>Dispenser valve leak-test and sanitation wipe-down</span>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Corporate Office Setup</h3>
            <ul className="space-y-3 text-xs text-zinc-500 dark:text-zinc-400 font-light">
              <li className="flex items-center space-x-3">
                <Check size={14} className="text-[#0064D0]" />
                <span>Executive boardroom table-top chiller calibration</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check size={14} className="text-[#0064D0]" />
                <span>Multi-bottle rack organization for breakrooms</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check size={14} className="text-[#0064D0]" />
                <span>Staff safety orientation and maintenance schedule setup</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-10 bg-zinc-50 dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl text-center space-y-6">
          <h3 className="text-2xl font-serif font-light text-zinc-900 dark:text-white">Ready for white-glove setup?</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Book installation during checkout or contact our concierge support for custom requests.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?service=installation"
              className="px-8 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <span>Schedule Free Installation</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
