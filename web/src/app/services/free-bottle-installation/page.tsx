'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { Wrench, ShieldCheck, Check, ArrowRight } from 'lucide-react'

export default function FreeInstallationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-16 py-12 space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:underline">Services</Link>
          <span>/</span>
          <span className="text-zinc-400">Free Bottle Installation</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary">
            <Wrench size={28} />
          </div>
          <h1 className="page-title font-light text-foreground tracking-wide">
            Free Bottle & Stand Installation
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
            Every Watlys recurring subscription includes complimentary white-glove setup. Our certified technicians assemble your glass bottle stands, calibrate flow rates, and inspect safety locks.
          </p>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-card border border-border rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-foreground">Home Setup Workflow</h3>
            <ul className="space-y-3 text-xs text-muted-foreground font-light">
              <li className="flex items-center space-x-3">
                <Check size={14} className="text-primary" />
                <span>Placement inspection for optimal kitchen or dining aesthetics</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check size={14} className="text-primary" />
                <span>Assembly of stainless steel or wooden floor stands</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check size={14} className="text-primary" />
                <span>Dispenser valve leak-test and sanitation wipe-down</span>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-card border border-border rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-foreground">Corporate Office Setup</h3>
            <ul className="space-y-3 text-xs text-muted-foreground font-light">
              <li className="flex items-center space-x-3">
                <Check size={14} className="text-primary" />
                <span>Executive boardroom table-top chiller calibration</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check size={14} className="text-primary" />
                <span>Multi-bottle rack organization for breakrooms</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check size={14} className="text-primary" />
                <span>Staff safety orientation and maintenance schedule setup</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-6 sm:p-7 bg-background dark:bg-card border border-border rounded-2xl text-center space-y-6">
          <h3 className="text-2xl font-serif font-light text-foreground">Ready for white-glove setup?</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Book installation during checkout or contact our concierge support for custom requests.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?service=installation"
              className="px-8 py-4 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
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
