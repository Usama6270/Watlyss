'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, animate, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Check, Droplets, SlidersHorizontal, Calculator } from 'lucide-react'

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

// Smooth Spring Number Counter Component
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

// 3D Perspective Tilt Card Wrapper
function TiltCard({ children, className = '', floating = false }: { children: React.ReactNode; className?: string; floating?: boolean }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div style={{ perspective: 1000 }} className="h-full w-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        animate={floating ? { y: [0, -6, 0] } : undefined}
        transition={floating ? { y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } } : undefined}
        whileHover={{ scale: 1.01 }}
        className={`relative h-full w-full transition-all duration-300 ${className}`}
      >
        <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }} className="h-full w-full">
          {children}
        </div>
      </motion.div>
    </div>
  )
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
    <section id="calculator" className="relative py-12 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full border-t border-zinc-200/40 dark:border-slate-800/60 bg-white dark:bg-[#0b1329] transition-colors duration-300 font-sans overflow-hidden">

      {/* Glassmorphism Background Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#0064D0]/10 dark:bg-blue-600/15 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 space-y-12">
        {/* Animated Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-[#0064D0] inline-flex items-center gap-1.5">
            <Calculator size={14} />
            <span>INTERACTIVE CONFIGURATOR</span>
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-white tracking-wide leading-tight">
            Build Your Perfect Water Plan.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-slate-200 font-light leading-relaxed">
            Tell us what you need. We'll calculate your estimated plan instantly.
          </p>
        </motion.div>

        {/* 50/50 3D CONFIGURATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">

          {/* LEFT PANEL: INTERACTIVE CONTROLS (Span 6) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
            className="lg:col-span-6 h-full"
          >
            <TiltCard className="bg-zinc-50/90 dark:bg-[#162447]/95 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-2xl border border-zinc-200/80 dark:border-slate-700/60 shadow-xl shadow-sky-950/5 hover:shadow-2xl hover:shadow-[#0064D0]/10 flex flex-col justify-between space-y-6 sm:space-y-8">

              {/* Variable 1: Number of Bottles */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-slate-200">
                    1. Number of Bottles
                  </label>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#0064D0] inline-flex items-center gap-1.5">
                    <Droplets size={18} />
                    <span>{bottlesPerDelivery} × 19L Bottles</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={bottlesPerDelivery}
                  onChange={(e) => setBottlesPerDelivery(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-zinc-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0064D0] transition-all hover:scale-[1.01]"
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
                    <motion.button
                      key={f.id}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setFrequencyId(f.id)}
                      className={`py-2.5 px-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xl border transition-all duration-300 cursor-pointer text-center ${frequencyId === f.id
                        ? 'border-[#0064D0] bg-[#0064D0] text-white shadow-lg shadow-[#0064D0]/30'
                        : 'border-zinc-200/80 dark:border-slate-800 text-zinc-500 dark:text-slate-300 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-[#0b1329]'
                        }`}
                    >
                      {f.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Variable 3: Number of Months Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-slate-200">
                    3. Duration (Months)
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
                  className="w-full h-2.5 bg-zinc-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0064D0] transition-all hover:scale-[1.01]"
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
                    <motion.button
                      key={c.id}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setCustomerTypeId(c.id)}
                      className={`py-2 px-1 text-[10px] font-bold uppercase tracking-wider rounded-xl border transition-all duration-300 cursor-pointer text-center ${customerTypeId === c.id
                        ? 'border-[#0064D0] bg-[#0064D0]/15 text-[#0064D0] font-extrabold shadow-md shadow-[#0064D0]/20'
                        : 'border-zinc-200/80 dark:border-slate-800 text-zinc-500 dark:text-slate-300 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-[#0b1329]'
                        }`}
                    >
                      {c.name}
                    </motion.button>
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
                  className="w-full px-4 py-3.5 bg-white dark:bg-[#0b1329] border border-zinc-200/80 dark:border-slate-800 text-xs text-zinc-900 dark:text-white rounded-xl font-medium focus:outline-none focus:border-[#0064D0] focus:ring-2 focus:ring-[#0064D0]/20 transition-all cursor-pointer"
                >
                  {PRICING_CONFIG.locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} (PKR {loc.deliveryFee} delivery fee / trip)
                    </option>
                  ))}
                </select>
              </div>

            </TiltCard>
          </motion.div>

          {/* RIGHT PANEL: LIVE 3D SUMMARY RESULT CARD (Span 6) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
            className="lg:col-span-6 h-full"
          >
            <TiltCard floating className="bg-white dark:bg-[#162447] p-6 sm:p-8 lg:p-10 rounded-2xl border-2 border-[#0064D0] shadow-2xl shadow-[#0064D0]/25 hover:shadow-[#0064D0]/45 flex flex-col justify-between space-y-6">

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-100 dark:border-slate-700 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0064D0] flex items-center gap-1.5">
                    <Sparkles size={14} />
                    <span>YOUR CUSTOM PLAN</span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 dark:text-slate-300 bg-zinc-100 dark:bg-[#0b1329] px-3 py-1 rounded-full border dark:border-slate-800 shadow-sm">
                    Estimated Price
                  </span>
                </div>

                {/* Animated Dynamic Counter Trigger */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${bottlesPerDelivery}-${frequencyId}-${months}-${customerTypeId}-${locationId}`}
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1"
                  >
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-white block tracking-wide">
                      {bottlesPerDelivery} × 19L BOTTLES
                    </span>
                    <span className="text-sm font-serif font-medium text-[#0064D0] block">
                      Approximately <CountUp value={totalLiters} /> LITERS ({totalBottles} bottles total)
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Price Line Breakdown */}
                <div className="p-6 bg-zinc-50/80 dark:bg-[#0b1329]/80 rounded-xl border border-zinc-200/60 dark:border-slate-800 space-y-3 text-xs font-light text-zinc-600 dark:text-slate-200 shadow-inner">
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
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0064D0]">
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

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={`/order?bottles=${bottlesPerDelivery}&freq=${frequencyId}&type=${customerTypeId}&city=${locationId}`}
                    className="w-full py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2 transition-all duration-300 shadow-xl shadow-[#0064D0]/35 hover:shadow-[#0064D0]/50"
                  >
                    <span>ORDER THIS PLAN</span>
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="w-full py-3.5 bg-zinc-100 dark:bg-white dark:text-black hover:dark:bg-slate-100 text-zinc-900 rounded-xl text-[10px] font-bold uppercase tracking-[0.18em] inline-flex items-center justify-center transition-all duration-300 text-center"
                  >
                    Talk to WATLYS
                  </Link>
                </motion.div>
              </div>

            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
