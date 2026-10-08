'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import Image from 'next/image'
import { Check, ShieldCheck, Zap, ArrowRight, Truck, RefreshCw } from 'lucide-react'

export default function StudentPackagePage() {
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
          <span className="text-zinc-400">Student Plan</span>
        </div>

        {/* Hero Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
              ACTIVE ESSENTIAL HYDRATION
            </span>
            <h1 className="page-title font-light text-foreground tracking-wide">
              Student Hydration Plan
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
              Designed specifically for students, young researchers, and active individuals needing pure cellular hydration, enhanced stamina, and zero microplastic exposure during long study and training sessions.
            </p>
            <div className="pt-2 flex items-baseline space-x-4">
              <span className="section-title font-light text-primary">PKR 1,200</span>
              <span className="text-xs uppercase text-zinc-400 font-bold tracking-widest">/ Month (Weekly Refills)</span>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/checkout?plan=student"
                className="px-8 py-4 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>Subscribe Student Plan</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-border text-zinc-800 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center transition-all"
              >
                Inquire Campus Group
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-square sm:h-[450px] bg-background dark:bg-card rounded-2xl overflow-hidden border border-border shadow-sm flex items-center justify-center p-8">
            <Image
              src="https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=750&q=80"
              alt="Student Hydration Bottle"
              fill
              className="object-contain p-8"
              priority
            />
          </div>
        </div>

        {/* Specifications & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="p-8 bg-card border border-border rounded-2xl space-y-3">
            <Truck className="text-primary" size={24} />
            <h3 className="text-lg font-bold text-foreground">Campus & Dorm Delivery</h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Scheduled weekly door delivery directly to your university dormitory or apartment doorstep.
            </p>
          </div>
          <div className="p-8 bg-card border border-border rounded-2xl space-y-3">
            <ShieldCheck className="text-primary" size={24} />
            <h3 className="text-lg font-bold text-foreground">500ml Recyclable Glass</h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Enclosed in lightweight, durable lead-free glass containers that fit easily into backpacks and gym totes.
            </p>
          </div>
          <div className="p-8 bg-card border border-border rounded-2xl space-y-3">
            <RefreshCw className="text-primary" size={24} />
            <h3 className="text-lg font-bold text-foreground">Flexible Student Pause</h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Easily pause or freeze your subscription during exam breaks or summer vacations with 1 click.
            </p>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
