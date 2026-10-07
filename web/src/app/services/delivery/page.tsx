'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { Truck, ShieldCheck, Check, ArrowRight, Clock, MapPin } from 'lucide-react'

export default function DeliveryServicePage() {
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
          <span className="text-zinc-400">Express Delivery</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary">
            <Truck size={28} />
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-serif font-light text-foreground tracking-wide">
            Express Temperature-Controlled Delivery
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
            Our climate-controlled distribution vans deliver your glass-bottled mineral water at subterranean temperatures. Reusable wooden crates ensure safe transport without plastic wrapping.
          </p>
        </div>

        {/* Delivery Standards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-card border border-border rounded-2xl space-y-3">
            <Clock className="text-primary" size={24} />
            <h3 className="text-lg font-bold text-foreground">Scheduled Recurring Windows</h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Choose morning or evening delivery slots aligned with your home routine or office office hours.
            </p>
          </div>
          <div className="p-8 bg-card border border-border rounded-2xl space-y-3">
            <ShieldCheck className="text-primary" size={24} />
            <h3 className="text-lg font-bold text-foreground">Zero-Shatter Wooden Crates</h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Glass containers sit securely in cushioned partitions, preventing bottle clinking and breakages.
            </p>
          </div>
          <div className="p-8 bg-card border border-border rounded-2xl space-y-3">
            <MapPin className="text-primary" size={24} />
            <h3 className="text-lg font-bold text-foreground">GPS Live Driver Tracking</h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Receive real-time SMS alerts and live driver location tracking 30 minutes before arrival.
            </p>
          </div>
        </div>

        {/* Coverage Banner */}
        <div className="p-10 bg-background dark:bg-card border border-border rounded-2xl text-center space-y-6">
          <h3 className="text-2xl font-serif font-light text-foreground">Check Delivery Availability in Your Area</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            We currently provide free express delivery across major metropolitan centers in US, UK, Canada, and Pakistan.
          </p>
          <div className="pt-2">
            <Link
              href="/locations"
              className="px-8 py-4 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all shadow-md"
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
