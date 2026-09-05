'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, MessageCircle, MapPin, Calendar, Droplets, ArrowRight } from 'lucide-react'

export default function OrderWaterPage() {
  const [customerType, setCustomerType] = useState<'home' | 'student' | 'office'>('home')
  const [quantity, setQuantity] = useState<number>(8)
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('biweekly')
  const [city, setCity] = useState<string>('Lahore')

  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad']

  const getEstimatedPrice = () => {
    // Basic price estimation logic in PKR
    const basePerBottle = 320
    const total = quantity * basePerBottle
    return total
  }

  const whatsappMessage = encodeURIComponent(
    `Hi Watlys Pakistan! I want to order 19L drinking water bottles.\n\nType: ${customerType.toUpperCase()}\nQuantity: ${quantity} x 19L Bottles\nFrequency: ${frequency}\nCity: ${city}\nEstimated Total: PKR ${getEstimatedPrice()}`
  )

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a1128] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0064D0]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">Order 19L Water Plan</span>
        </div>

        {/* Page Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#0064D0] bg-[#0064D0]/10 px-3.5 py-1.5 rounded-full border border-[#0064D0]/20">
            SIMPLE 19L WATER CONFIGURATOR
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-900 dark:text-white tracking-wide">
            Build Your 19L Water Delivery Plan
          </h1>
          <p className="text-xs sm:text-sm text-zinc-550 dark:text-slate-200 font-light leading-relaxed">
            Select your household or business requirements below and instantly dispatch your order via WhatsApp or online confirmation.
          </p>
        </div>

        {/* Configurator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 space-y-8 bg-white dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 p-8 sm:p-10 rounded-2xl shadow-sm">
            
            {/* Step 1: Customer Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-slate-200 block">
                1. Select Account Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'home', label: 'Home / Family' },
                  { id: 'student', label: 'Student / Hostel' },
                  { id: 'office', label: 'Office / Business' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCustomerType(item.id as any)}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                      customerType === item.id
                        ? 'border-[#0064D0] bg-[#0064D0]/10 text-[#0064D0]'
                        : 'border-zinc-200 dark:border-slate-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: 19L Bottle Quantity */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-slate-200">
                <span>2. Monthly 19L Bottle Quantity</span>
                <span className="text-[#0064D0] font-serif text-lg">{quantity} x 19L Bottles</span>
              </div>
              <input
                type="range"
                min="2"
                max="40"
                step="2"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#0064D0]"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-semibold">
                <span>2 Bottles (Minimal)</span>
                <span>20 Bottles (Family)</span>
                <span>40+ Bottles (Corporate)</span>
              </div>
            </div>

            {/* Step 3: Delivery Frequency */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-slate-200 block">
                3. Delivery Frequency
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'weekly', label: 'Weekly Refills' },
                  { id: 'biweekly', label: 'Bi-Weekly' },
                  { id: 'monthly', label: 'Monthly Bulk' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFrequency(item.id as any)}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                      frequency === item.id
                        ? 'border-[#0064D0] bg-[#0064D0]/10 text-[#0064D0]'
                        : 'border-zinc-200 dark:border-slate-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: City Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-slate-200 block">
                4. Delivery City in Pakistan
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-[#0a1128] border border-zinc-200 dark:border-slate-800 text-xs font-semibold text-zinc-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Right Column: Order Summary & Actions */}
          <div className="lg:col-span-5 space-y-6 bg-zinc-50 dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 p-8 sm:p-10 rounded-2xl shadow-sm sticky top-28">
            <h3 className="text-2xl font-serif font-light text-zinc-900 dark:text-white">Order Summary</h3>

            <div className="space-y-4 text-xs font-light text-zinc-650 dark:text-slate-200 border-t border-b border-zinc-200 dark:border-slate-800 py-6">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Core Product:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">19L Pure Water Bottle</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Account Type:</span>
                <span className="font-semibold text-zinc-900 dark:text-white uppercase">{customerType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Quantity:</span>
                <span className="font-semibold text-[#0064D0]">{quantity} × 19L Bottles</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Frequency:</span>
                <span className="font-semibold text-zinc-900 dark:text-white capitalize">{frequency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">City Coverage:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{city}, Pakistan</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest block">Estimated Rate</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-serif font-light text-[#0064D0]">PKR {getEstimatedPrice()}</span>
                <span className="text-[10px] text-zinc-400 font-semibold">/ Month</span>
              </div>
            </div>

            {/* Conversion Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/923001234567?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>Order via WhatsApp</span>
              </a>

              <Link
                href={`/contact?plan=${customerType}&qty=${quantity}`}
                className="w-full py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>Submit Online Order</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <p className="text-[10px] text-zinc-400 text-center font-light pt-2">
              * Rates are estimates. Free doorstep delivery & bottle stands included on qualifying recurring orders.
            </p>
          </div>

        </div>
      </main>

      <FooterSection />
    </div>
  )
}
