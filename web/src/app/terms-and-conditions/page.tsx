'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0a1128] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">Terms & Conditions</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-light text-zinc-900 dark:text-white">Terms & Conditions</h1>
          <p className="text-xs text-zinc-400">Last updated: August 2026 | Watlys Pure Water Pakistan</p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm font-light leading-relaxed space-y-6 text-zinc-650 dark:text-slate-200">
          <p>
            Welcome to Watlys Pure Water. These Terms and Conditions govern your purchase and delivery of 19-Liter drinking water bottles in Pakistan.
          </p>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">1. 19L Bottle Care & Deposit</h2>
          <p>
            All 19-Liter glass and food-grade containers remain the property of Watlys. Customers are responsible for keeping empty vessels clean and uncracked for driver pickup during recurring refills.
          </p>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">2. Delivery Logistics</h2>
          <p>
            Deliveries are made to specified residential or corporate addresses during scheduled delivery windows. Cancellations or pause requests must be made 24 hours prior to dispatch.
          </p>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">3. Pricing & Modifications</h2>
          <p>
            Watlys reserves the right to modify delivery rates or subscription pricing with advance written notice to active subscribers.
          </p>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
