'use client'

import React from 'react'
import { Star } from 'lucide-react'

const PARTNERS = [
  'DHA LAHORE RESIDENCES', 'BAHRIA TOWN EXECUTIVE', 'GULBERG CORPORATE TOWER', 'ISLAMABAD MEDICAL COMPLEX', 'PAKISTAN HOSP. ASSOC'
]

const TESTIMONIALS = [
  {
    name: 'Usman Chaudhry',
    type: 'Home Customer',
    location: 'DHA Phase 5, Lahore',
    rating: 5,
    quote: 'Watlys 19L water delivery has been extremely reliable. The bottle quality is pristine, and the mineral taste is noticeably pure for my daily tea and drinking.',
  },
  {
    name: 'Amina Siddiqui',
    type: 'Office Manager',
    location: 'Gulberg 3, Lahore',
    rating: 5,
    quote: 'We subscribed to 20 bottles per month for our corporate office. Delivery is always punctual on Monday mornings and dispenser setup was completely free.',
  },
  {
    name: 'Dr. Hamza Tariq',
    type: 'Family Customer',
    location: 'F-7/2, Islamabad',
    rating: 5,
    quote: 'Having lab-tested TDS 180 water delivered directly to our kitchen gives our family complete peace of mind regarding microplastics and purity.',
  },
  {
    name: 'Zainab Rashid',
    type: 'Corporate Client',
    location: 'Clifton Phase 8, Karachi',
    rating: 5,
    quote: 'Watlys provides dedicated monthly invoicing and automated refills for our executive meeting suites. Exceptional luxury water service.',
  },
]

export default function TrustSection() {
  return (
    <section id="trust" className="py-24 px-6 max-w-7xl mx-auto w-full border-t border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-[#0A0A0A] space-y-20 font-sans">
      
      {/* 1. TESTIMONIALS SECTION */}
      <div className="space-y-12 text-center">
        <div className="space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#0064D0]">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-wide text-zinc-900 dark:text-white">
            Trusted by Homes & Businesses.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light max-w-lg mx-auto">
            See what Pakistani families, student hostels, and corporate offices say about Watlys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-zinc-50/80 dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-4 flex flex-col justify-between shadow-sm hover:border-[#0064D0] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200/40 dark:border-zinc-800/40 space-y-0.5">
                <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                  {item.name}
                </span>
                <span className="text-[10px] text-[#0064D0] font-semibold block uppercase tracking-wider">
                  {item.type} • {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. PARTNER LOGOS */}
      <div className="pt-10 border-t border-zinc-200/30 dark:border-zinc-800/30 space-y-6 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 block font-sans">
          TRUSTED BY
        </span>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 opacity-40 dark:opacity-60 font-sans">
          {PARTNERS.map((partner) => (
            <span key={partner} className="text-xs font-bold tracking-[0.2em] text-zinc-700 dark:text-zinc-300">
              {partner}
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
