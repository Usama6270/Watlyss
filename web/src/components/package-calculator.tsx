'use client'

import React, { useState, useEffect } from 'react'
import { animate } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Info, Sparkles, MessageCircle } from 'lucide-react'

// CMS / Admin Configurable Pricing Data Structure
const PRICING_CONFIG = {
  basePricePer19LBottle: 320,
  locations: [
    { id: 'lahore', name: 'Lahore', deliveryFee: 100 },
    { id: 'islamabad', name: 'Islamabad', deliveryFee: 100 },
    { id: 'rawalpindi', name: 'Rawalpindi', deliveryFee: 100 },
    { id: 'sialkot', name: 'Sialkot', deliveryFee: 120 },
    { id: 'other', name: 'Other', deliveryFee: 150 },
  ],
  frequencies: [
    { id: 'weekly', name: 'Weekly', deliveriesPerMonth: 4, discount: 0.05 },
    { id: 'biweekly', name: 'Every 2 Weeks', deliveriesPerMonth: 2, discount: 0.10 },
    { id: 'monthly', name: 'Monthly', deliveriesPerMonth: 1, discount: 0.15 },
  ],
  customerTypes: [
    { id: 'student', name: 'Student', discount: 0.10 },
    { id: 'individual', name: 'Individual', discount: 0.05 },
    { id: 'family', name: 'Family', discount: 0.08 },
    { id: 'office', name: 'Office', discount: 0.12 },
    { id: 'corporate', name: 'Corporate', discount: 0.15 },
  ],
}

function CountUp({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [value])

  return <span>{displayValue.toLocaleString()}</span>
}

export default function PackageCalculator() {
  const [bottlesPerDelivery, setBottlesPerDelivery] = useState<number>(10)
  const [frequencyId, setFrequencyId] = useState<string>('biweekly')
  const [months, setMonths] = useState<number>(6)
  const [customerTypeId, setCustomerTypeId] = useState<string>('family')
  const [locationId, setLocationId] = useState<string>('lahore')

  // Config lookup
  const selectedFreq = PRICING_CONFIG.frequencies.find((f) => f.id === frequencyId) || PRICING_CONFIG.frequencies[1]
  const selectedType = PRICING_CONFIG.customerTypes.find((c) => c.id === customerTypeId) || PRICING_CONFIG.customerTypes[2]
  const selectedLoc = PRICING_CONFIG.locations.find((l) => l.id === locationId) || PRICING_CONFIG.locations[0]

  // Formula Calculations
  const estimatedDeliveries = selectedFreq.deliveriesPerMonth * months
  const totalBottles = bottlesPerDelivery * estimatedDeliveries
  const totalLiters = totalBottles * 19

  const durationDiscount = months >= 12 ? 0.10 : months >= 6 ? 0.05 : 0.0
  const totalDiscountRate = Math.min(0.35, selectedFreq.discount + selectedType.discount + durationDiscount)

  const subtotal = totalBottles * PRICING_CONFIG.basePricePer19LBottle
  const discountAmount = Math.round(subtotal * totalDiscountRate)
  const deliveryCost = selectedLoc.deliveryFee * estimatedDeliveries
  const estimatedTotal = Math.max(0, subtotal - discountAmount + deliveryCost)

  const monthlyEstimatedCost = Math.round(estimatedTotal / months)
  const monthlySavings = Math.round(discountAmount / months)

  return (
    <section id="calculator" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-zinc-200/40 dark:border-slate-800/60 bg-white dark:bg-[#0b1329] transition-colors duration-300 font-sans">
      
      {/* Editorial Header */}
      <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#0064D0]">
          INTERACTIVE CONFIGURATOR
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-white tracking-wide leading-tight">
          Build Your Perfect Water Plan.
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-slate-200 font-light max-w-lg mx-auto">
          Tell us what you need. We'll calculate your estimated plan instantly.
        </p>
      </div>

      {/* 50/50 CONFIGURATOR LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        
        {/* LEFT PANEL: INTERACTIVE CONTROLS (Span 6) */}
        <div className="lg:col-span-6 bg-zinc-50/80 dark:bg-[#162447]/90 p-5 sm:p-8 lg:p-10 rounded-2xl border border-zinc-200/80 dark:border-slate-700/60 space-y-6 sm:space-y-8 shadow-xl shadow-black/10">
          
          {/* Variable 1: Number of Bottles */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline flex-wrap gap-1">
              <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-slate-200">
                1. Number of Bottles
              </label>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#0064D0]">
                {bottlesPerDelivery} × 19L Bottles
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={bottlesPerDelivery}
              onChange={(e) => setBottlesPerDelivery(parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0064D0]"
            />
            <div className="flex justify-between text-[10px] font-semibold text-zinc-400 dark:text-slate-400">
              <span>1 Bottle</span>
              <span>15 Bottles</span>
              <span>30 Bottles</span>
            </div>
          </div>

          {/* Variable 2: Delivery Frequency */}
          <div className="space-y-3">
            <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-slate-200 block">
              2. Delivery Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PRICING_CONFIG.frequencies.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFrequencyId(f.id)}
                  className={`py-2.5 px-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xl border transition-all duration-300 cursor-pointer text-center ${
                    frequencyId === f.id
                      ? 'border-[#0064D0] bg-[#0064D0] text-white shadow-sm'
                      : 'border-zinc-200/80 dark:border-slate-800 text-zinc-500 dark:text-slate-300 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-[#0b1329]'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Variable 3: Number of Months Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline flex-wrap gap-1">
              <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-slate-200">
                3. Number of Months
              </label>
              <span className="text-lg sm:text-xl font-serif font-bold text-zinc-900 dark:text-white">
                {months} Months
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0064D0]"
            />
            <div className="flex justify-between text-[10px] font-semibold text-zinc-400 dark:text-slate-400">
              <span>1 Month</span>
              <span>6 Months</span>
              <span>12 Months</span>
            </div>
          </div>

          {/* Variable 4: Customer Type */}
          <div className="space-y-3">
            <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-slate-200 block">
              4. Customer Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {PRICING_CONFIG.customerTypes.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCustomerTypeId(c.id)}
                  className={`py-2 px-1 text-[10px] font-bold uppercase tracking-wider rounded-xl border transition-all duration-300 cursor-pointer text-center ${
                    customerTypeId === c.id
                      ? 'border-[#0064D0] bg-[#0064D0]/10 text-[#0064D0]'
                      : 'border-zinc-200/80 dark:border-slate-800 text-zinc-500 dark:text-slate-300 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-[#0b1329]'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Variable 5: Delivery Location Dropdown */}
          <div className="space-y-3">
            <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-slate-200 block">
              5. Delivery Location
            </label>
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="w-full px-4 py-3.5 bg-white dark:bg-[#0b1329] border border-zinc-200/80 dark:border-slate-800 text-xs text-zinc-900 dark:text-white rounded-xl font-medium focus:outline-none focus:border-[#0064D0]"
            >
              {PRICING_CONFIG.locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} (PKR {loc.deliveryFee} delivery fee / trip)
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* RIGHT PANEL: LIVE RESULT CARD (Span 6) */}
        <div className="lg:col-span-6 bg-white dark:bg-[#162447] p-6 sm:p-8 lg:p-10 rounded-2xl border-2 border-[#0064D0] shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-slate-700 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0064D0]">
                YOUR CUSTOM PLAN
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 dark:text-slate-300 bg-zinc-100 dark:bg-[#0b1329] px-3 py-1 rounded-full border dark:border-slate-800">
                Estimated Price
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-white block">
                {bottlesPerDelivery} × 19L BOTTLES
              </span>
              <span className="text-sm font-serif font-medium text-[#0064D0] block">
                Approximately <CountUp value={totalLiters} /> LITERS ({totalBottles} bottles total)
              </span>
            </div>

            {/* Price Line Breakdown */}
            <div className="p-6 bg-zinc-50/70 dark:bg-[#0b1329]/80 rounded-xl border border-zinc-200/60 dark:border-slate-800 space-y-3 text-xs font-light text-zinc-600 dark:text-slate-200">
              <div className="flex justify-between">
                <span>Water ({totalBottles} x 19L Bottles):</span>
                <span className="font-semibold text-zinc-900 dark:text-white">PKR <CountUp value={subtotal} /></span>
              </div>
              <div className="flex justify-between">
                <span>Delivery ({estimatedDeliveries} trips to {selectedLoc.name}):</span>
                <span className="font-semibold text-zinc-900 dark:text-white">PKR <CountUp value={deliveryCost} /></span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Discount ({Math.round(totalDiscountRate * 100)}%):</span>
                <span>- PKR <CountUp value={discountAmount} /></span>
              </div>
              <div className="pt-3 border-t border-zinc-200/60 dark:border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">TOTAL:</span>
                <span className="text-2xl font-serif font-bold text-[#0064D0]">
                  PKR <CountUp value={estimatedTotal} />
                </span>
              </div>
            </div>

            {/* Estimated Monthly Summary */}
            <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-slate-300 font-light px-1 flex-wrap gap-2">
              <span>Estimated Monthly Cost: <strong className="text-zinc-900 dark:text-white font-bold">PKR <CountUp value={monthlyEstimatedCost} /></strong></span>
              <span>Estimated Savings: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">PKR <CountUp value={monthlySavings} /></strong></span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href={`/order?bottles=${bottlesPerDelivery}&freq=${frequencyId}&type=${customerTypeId}&city=${locationId}`}
              className="w-full py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all duration-300 shadow-md"
            >
              <span>Order This Plan</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/contact"
              className="w-full py-3.5 bg-zinc-100 dark:bg-white dark:text-black hover:dark:bg-slate-100 text-zinc-900 rounded-xl text-[10px] font-bold uppercase tracking-[0.18em] inline-flex items-center justify-center transition-all duration-300"
            >
              Talk to WATLYS
            </Link>
          </div>

        </div>

      </div>
    </section>
  )
}
