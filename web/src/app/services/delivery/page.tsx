'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { Truck, ShieldCheck, Check, ArrowRight, Clock, MapPin } from 'lucide-react'

export default function DeliveryServicePage() {
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
          <span className="text-zinc-400">Express Delivery</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0064D0]/10 text-[#0064D0]">
            <Truck size={28} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
            Express Temperature-Controlled Delivery
          </h1>
          <p className="text-zinc-550 dark:text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Our climate-controlled distribution vans deliver your glass-bottled mineral water at subterranean temperatures. Reusable wooden crates ensure safe transport without plastic wrapping.
          </p>
        </div>

        {/* Delivery Standards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-3">
            <Clock className="text-[#0064D0]" size={24} />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Scheduled Recurring Windows</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Choose morning or evening delivery slots aligned with your home routine or office office hours.
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-3">
            <ShieldCheck className="text-[#0064D0]" size={24} />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Zero-Shatter Wooden Crates</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Glass containers sit securely in cushioned partitions, preventing bottle clinking and breakages.
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-3">
            <MapPin className="text-[#0064D0]" size={24} />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">GPS Live Driver Tracking</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Receive real-time SMS alerts and live driver location tracking 30 minutes before arrival.
            </p>
          </div>
        </div>

        {/* Coverage Banner */}
        <div className="p-10 bg-zinc-50 dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl text-center space-y-6">
          <h3 className="text-2xl font-serif font-light text-zinc-900 dark:text-white">Check Delivery Availability in Your Area</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            We currently provide free express delivery across major metropolitan centers in US, UK, Canada, and Pakistan.
          </p>
          <div className="pt-2">
            <Link
              href="/locations"
              className="px-8 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <span>View Coverage Locations</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
