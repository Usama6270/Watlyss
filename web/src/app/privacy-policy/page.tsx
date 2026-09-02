'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-400">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">Privacy Policy</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-light text-zinc-900 dark:text-white">Privacy Policy</h1>
          <p className="text-xs text-zinc-400">Last updated: August 2026 | Watlys Pure Water Pakistan</p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm font-light leading-relaxed space-y-6 text-zinc-650 dark:text-zinc-300">
          <p>
            Watlys Pure Water ("Watlys", "we", "our") respects your privacy and is committed to protecting your personal data when you order 19-Liter drinking water bottles or utilize our concierge services across Pakistan.
          </p>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">1. Information We Collect</h2>
          <p>
            When you subscribe to 19L water delivery, contact us via WhatsApp, or request water testing, we collect contact information (name, address, delivery city, phone number) necessary to fulfill your delivery.
          </p>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">2. Use of Information</h2>
          <p>
            Your information is strictly used for 19L bottle dispatch, customer service updates, driver tracking SMS alerts, and subscription management. We never sell your personal data to third parties.
          </p>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">3. Data Security</h2>
          <p>
            We implement industry-standard encryption protocols for all online order data and stored delivery addresses.
          </p>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
