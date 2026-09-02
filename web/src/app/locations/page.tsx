'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, ArrowRight, MessageCircle, Check } from 'lucide-react'

export default function LocationsPage() {
  const [searchArea, setSearchArea] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const pakistanLocations = [
    {
      city: 'Lahore',
      province: 'Punjab',
      hubs: ['DHA Phase 1–8', 'Gulberg', 'Model Town', 'Johar Town', 'Bahria Town', 'Cavalry Ground'],
      phone: '+92 42 111 928 597',
      status: 'Active 19L Daily Express Delivery',
    },
    {
      city: 'Karachi',
      province: 'Sindh',
      hubs: ['Clifton', 'DHA Phase 1–8', 'PECHS', 'Gulshan-e-Iqbal', 'KDA Scheme 1', 'North Nazimabad'],
      phone: '+92 21 111 928 597',
      status: 'Active 19L Daily Express Delivery',
    },
    {
      city: 'Islamabad & Rawalpindi',
      province: 'Federal Capital & Punjab',
      hubs: ['Sectors F-6, F-7, F-8, F-10, F-11', 'E-11', 'G-11', 'Bahria Town Phase 1–8', 'DHA Islamabad'],
      phone: '+92 51 111 928 597',
      status: 'Active 19L Daily Express Delivery',
    },
    {
      city: 'Faisalabad',
      province: 'Punjab',
      hubs: ['Civil Lines', 'Peoples Colony', 'Canal Road', 'Susan Road'],
      phone: '+92 41 111 928 597',
      status: 'Active 19L Scheduled Delivery',
    },
  ]

  const handleCheckCoverage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchArea) return
    setStatus(`Watlys 19L delivery is ACTIVE in ${searchArea}! Direct WhatsApp dispatch available.`)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-400">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">Pakistan Coverage Areas</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0064D0]/10 text-[#0064D0]">
            <MapPin size={28} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
            Watlys 19L Delivery Coverage in Pakistan
          </h1>
          <p className="text-zinc-550 dark:text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Our climate-controlled delivery fleet services major residential societies, university campuses, and commercial business centers across Pakistan.
          </p>
        </div>

        {/* Availability Checker Form */}
        <div className="max-w-2xl mx-auto bg-zinc-50 dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 p-8 rounded-2xl space-y-4">
          <h3 className="text-lg font-serif font-light text-zinc-900 dark:text-white text-center">Check Delivery Availability in Your Area</h3>
          <form onSubmit={handleCheckCoverage} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchArea}
              onChange={(e) => setSearchArea(e.target.value)}
              placeholder="Enter your sector or society (e.g. DHA Phase 5, F-7, Clifton)"
              className="flex-1 px-4 py-3 bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 text-xs rounded-xl focus:outline-none focus:border-[#0064D0]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#0064D0] hover:bg-[#0052ad] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Check Area
            </button>
          </form>
          {status && (
            <div className="p-4 bg-[#0064D0]/10 border border-[#0064D0]/30 rounded-xl text-xs text-[#0064D0] font-semibold text-center flex items-center justify-center space-x-2">
              <Check size={16} />
              <span>{status}</span>
            </div>
          )}
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pakistanLocations.map((loc, idx) => (
            <div
              key={idx}
              className="p-8 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-6 shadow-sm"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#0064D0] bg-[#0064D0]/10 px-2.5 py-0.5 rounded border border-[#0064D0]/20">
                  {loc.status}
                </span>
                <h2 className="text-2xl font-serif font-light text-zinc-900 dark:text-white tracking-wide pt-2">{loc.city}</h2>
                <span className="text-xs text-zinc-400 font-semibold">{loc.province}</span>
              </div>

              <div className="space-y-3 text-xs text-zinc-650 dark:text-zinc-300 font-light border-t border-zinc-100 dark:border-zinc-800 pt-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 block">Coverage Hubs & Societies:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {loc.hubs.map((h) => (
                      <span key={h} className="text-[10px] bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-md text-zinc-700 dark:text-zinc-300 font-medium">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <Link
                  href="/order"
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0064D0] hover:text-[#0052ad] transition-colors"
                >
                  <span>Order 19L Water</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href={`https://wa.me/923001234567?text=Hi%20Watlys!%20Check%2019L%20delivery%20in%20${encodeURIComponent(loc.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#25D366] flex items-center space-x-1"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Hub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
