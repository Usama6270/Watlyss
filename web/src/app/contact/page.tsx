'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { MessageCircle, Mail, MapPin, Phone, Check } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-400">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-16 flex-1 w-full space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">Contact Concierge</span>
        </div>

        <div className="space-y-4 text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-[#0064D0] font-bold">PAKISTAN CONCIERGE</span>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-[#FAFAFA]">Contact Watlys Pure Water</h1>
          <p className="text-xs sm:text-sm text-zinc-550 dark:text-[#AAAAAA] font-light">
            Have questions about 19L bottle delivery, custom corporate orders, or water testing? Reach out directly via WhatsApp or email.
          </p>
        </div>

        {/* WhatsApp Direct Banner */}
        <div className="p-8 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#25D366]">FASTEST RESPONSE</span>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Instant WhatsApp Order & Inquiry</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">Connect with our Pakistani concierge team immediately on WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20inquire%20about%2019L%20drinking%20water%20bottles"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-widest rounded-xl inline-flex items-center space-x-2 transition-all shadow-md flex-shrink-0"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
          {/* Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-light text-zinc-900 dark:text-[#FAFAFA]">Headquarters & Hubs</h2>
            
            <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300 font-light">
              <div className="p-6 bg-zinc-50 dark:bg-[#111111] rounded-2xl border border-zinc-200/50 dark:border-zinc-800 space-y-2">
                <span className="text-[#0064D0] font-bold block uppercase tracking-wider text-[10px]">Lahore Operations Hub</span>
                <p>Industrial Estate Phase 2, Lahore, Pakistan</p>
                <p className="text-zinc-400">+92 42 111 928 597</p>
              </div>

              <div className="p-6 bg-zinc-50 dark:bg-[#111111] rounded-2xl border border-zinc-200/50 dark:border-zinc-800 space-y-2">
                <span className="text-[#0064D0] font-bold block uppercase tracking-wider text-[10px]">Email Concierge</span>
                <p>concierge@watlys.pk</p>
                <p className="text-zinc-400">Response within 2 hours</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-serif font-light text-zinc-900 dark:text-white mb-2">Send an Inquiry</h3>
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-800 dark:text-white focus:outline-none focus:border-[#0064D0]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Phone / WhatsApp Number</label>
              <input
                type="tel"
                required
                placeholder="+92 300 1234567"
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-800 dark:text-white focus:outline-none focus:border-[#0064D0]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Inquiry Message</label>
              <textarea
                required
                rows={3}
                placeholder="Tell us your 19L bottle requirements or location..."
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-800 dark:text-white focus:outline-none focus:border-[#0064D0]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
            >
              Submit Inquiry
            </button>
            {submitted && (
              <div className="p-3 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-xl text-center flex items-center justify-center space-x-2">
                <Check size={14} />
                <span>Thank you! Our concierge team will contact you shortly.</span>
              </div>
            )}
          </form>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
