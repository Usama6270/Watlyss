'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import Image from 'next/image'
import { Building, Award, ArrowRight, ShieldCheck, Briefcase } from 'lucide-react'

export default function CorporatePackagePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full container-custom py-12 space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/packages" className="hover:underline">Packages</Link>
          <span>/</span>
          <span className="text-zinc-400">Corporate Executive Suite</span>
        </div>

        {/* Hero Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
              ENTERPRISE & EXECUTIVE SUITES
            </span>
            <h1 className="page-title font-light text-foreground tracking-wide">
              Corporate Executive Suite
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
              Transform your office environment, executive boardrooms, and client lounges with custom-engraved glass bottles, luxury glass-compatible chillers, and automated bulk supply logistics.
            </p>
            <div className="pt-2 flex items-baseline space-x-4">
              <span className="text-3xl font-serif font-light text-primary">Custom B2B Quotation</span>
              <span className="text-xs uppercase text-zinc-400 font-bold tracking-widest">/ Volume Tiering</span>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?type=corporate"
                className="px-8 py-4 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>Request B2B Proposal</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/services/dispenser-service"
                className="px-8 py-4 border border-border text-zinc-800 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center transition-all"
              >
                View Office Chillers
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-square sm:h-[450px] bg-background dark:bg-card rounded-2xl overflow-hidden border border-border shadow-sm flex items-center justify-center p-8">
            <Image
              src="https://images.unsplash.com/photo-1548839134-6fd5e60885a3?auto=format&fit=crop&w=750&q=80"
              alt="Corporate Hydration Suite"
              fill
              className="object-contain p-8"
              priority
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="p-8 bg-card border border-border rounded-2xl space-y-3">
            <Briefcase className="text-primary" size={24} />
            <h3 className="text-lg font-bold text-foreground">Custom Laser Engraving</h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Incorporate your company brand logo directly onto our signature glass bottles for client boardrooms and hospitality suites.
            </p>
          </div>
          <div className="p-8 bg-card border border-border rounded-2xl space-y-3">
            <Building className="text-primary" size={24} />
            <h3 className="text-lg font-bold text-foreground">Dedicated Account Manager</h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Personal B2B concierge to manage delivery schedules, crate collection, and flexible monthly invoicing.
            </p>
          </div>
          <div className="p-8 bg-card border border-border rounded-2xl space-y-3">
            <Award className="text-primary" size={24} />
            <h3 className="text-lg font-bold text-foreground">ESG & Sustainability Reporting</h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Receive quarterly certified metrics detailing plastic waste eliminated for your company ESG disclosure reports.
            </p>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
