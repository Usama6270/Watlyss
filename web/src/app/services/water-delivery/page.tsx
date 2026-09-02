'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { Truck, ShieldCheck, Check, ArrowRight, Clock, MapPin, MessageCircle } from 'lucide-react'

export default function WaterDeliveryServicePage() {
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
          <span className="text-zinc-400">19L Water Delivery</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0064D0]/10 text-[#0064D0]">
            <Truck size={28} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
            19L Express Water Delivery Service
          </h1>
          <p className="text-zinc-550 dark:text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Reliable, climate-controlled distribution vans delivering fresh 19-Liter drinking water bottles directly to homes, student hostels, and corporate offices across Lahore, Karachi, Islamabad, Rawalpindi, and Faisalabad.
          </p>
        </div>

        {/* Delivery Standards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-3">
            <Clock className="text-[#0064D0]" size={24} />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Scheduled Delivery Windows</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Choose morning or evening delivery slots tailored to your household schedule or workplace hours.
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-3">
            <ShieldCheck className="text-[#0064D0]" size={24} />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Sanitized 19L Vessel Handling</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Bottles are carried in specialized protective crates and sanitized before placement on your stand.
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-3">
            <MapPin className="text-[#0064D0]" size={24} />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Live SMS & Driver Tracking</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Receive real-time driver status updates 30 minutes prior to delivery dispatch.
            </p>
          </div>
        </div>

        {/* Action Callout */}
        <div className="p-10 bg-zinc-50 dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl text-center space-y-6">
          <h3 className="text-2xl font-serif font-light text-zinc-900 dark:text-white">Order 19L Water Delivery in Your City</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Contact our WhatsApp concierge or build your monthly 19L delivery plan online in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <a
              href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%2019L%20water%20delivery"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Delivery Order</span>
            </a>
            <Link
              href="/order"
              className="px-8 py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <span>Build Delivery Plan</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
