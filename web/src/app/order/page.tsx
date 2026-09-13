'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/auth'

const PRICING_CONFIG = {
  basePricePer19LBottle: 320,
  locations: [
    { id: 'lahore', name: 'Lahore', deliveryFee: 100 },
    { id: 'islamabad', name: 'Islamabad', deliveryFee: 100 },
    { id: 'rawalpindi', name: 'Rawalpindi', deliveryFee: 100 },
    { id: 'sialkot', name: 'Sialkot', deliveryFee: 120 },
    { id: 'karachi', name: 'Karachi', deliveryFee: 150 },
    { id: 'faisalabad', name: 'Faisalabad', deliveryFee: 120 },
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

function OrderWaterContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planParam = searchParams.get('plan')
  const bottlesParam = searchParams.get('bottles')
  const freqParam = searchParams.get('freq')
  const typeParam = searchParams.get('type')
  const cityParam = searchParams.get('city')
  const monthsParam = searchParams.get('months')

  const { user, openAuthModal, updateSubscription } = useAuth()
  const [customerType, setCustomerType] = useState<'home' | 'student' | 'office'>('home')

  const [quantity, setQuantity] = useState<number>(8)
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('biweekly')
  const [months, setMonths] = useState<number>(6)
  const [city, setCity] = useState<string>('Lahore')

  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad']

  useEffect(() => {
    if (planParam === 'student') {
      setCustomerType('student')
      setQuantity(4)
      setFrequency('monthly')
      setMonths(1)
    } else if (planParam === 'family') {
      setCustomerType('home')
      setQuantity(8)
      setFrequency('biweekly')
      setMonths(6)
    } else if (planParam === 'corporate') {
      setCustomerType('office')
      setQuantity(20)
      setFrequency('weekly')
      setMonths(12)
    }

    if (bottlesParam) {
      const b = parseInt(bottlesParam)
      if (!isNaN(b) && b > 0) setQuantity(b)
    }

    if (freqParam) {
      const lowerFreq = freqParam.toLowerCase()
      if (lowerFreq === 'weekly') setFrequency('weekly')
      else if (lowerFreq === 'biweekly' || lowerFreq === 'bi-weekly') setFrequency('biweekly')
      else if (lowerFreq === 'monthly') setFrequency('monthly')
    }

    if (typeParam) {
      const lowerType = typeParam.toLowerCase()
      if (lowerType === 'family' || lowerType === 'home') {
        setCustomerType('home')
      } else if (lowerType === 'student' || lowerType === 'individual') {
        setCustomerType('student')
      } else if (lowerType === 'office' || lowerType === 'corporate') {
        setCustomerType('office')
      }
    }

    if (cityParam) {
      const formattedCity = cityParam.charAt(0).toUpperCase() + cityParam.slice(1).toLowerCase()
      if (cities.includes(formattedCity)) {
        setCity(formattedCity)
      } else {
        setCity(cityParam)
      }
    }

    if (monthsParam) {
      const m = parseInt(monthsParam)
      if (!isNaN(m) && m > 0) setMonths(m)
    }
  }, [planParam, bottlesParam, freqParam, typeParam, cityParam, monthsParam])

  const isCuratedPlan = planParam === 'student' || planParam === 'family' || planParam === 'corporate'

  // Config lookup
  const selectedFreq = PRICING_CONFIG.frequencies.find((f) => f.id === frequency) || PRICING_CONFIG.frequencies[1]
  const selectedTypeKey = customerType === 'student' ? 'student' : customerType === 'office' ? 'office' : 'family'
  const selectedType = PRICING_CONFIG.customerTypes.find((c) => c.id === selectedTypeKey) || PRICING_CONFIG.customerTypes[2]
  const locKey = city.toLowerCase()
  const selectedLoc = PRICING_CONFIG.locations.find((l) => l.id === locKey) || PRICING_CONFIG.locations[0]

  const estimatedDeliveries = selectedFreq.deliveriesPerMonth * months
  const totalBottles = quantity * estimatedDeliveries

  let estimatedMonthlyCost = 2800
  let estimatedTotal = 2800 * months
  let subtotal = 0
  let discountAmount = 0
  let deliveryCost = 0
  let totalDiscountRate = 0

  if (planParam === 'student') {
    estimatedMonthlyCost = 1200
    estimatedTotal = 1200 * months
  } else if (planParam === 'family') {
    estimatedMonthlyCost = 2800
    estimatedTotal = 2800 * months
  } else if (planParam === 'corporate') {
    estimatedMonthlyCost = 5500
    estimatedTotal = 5500 * months
  } else {
    // Custom Calculator Formula
    subtotal = totalBottles * PRICING_CONFIG.basePricePer19LBottle
    const durationDiscount = months >= 12 ? 0.10 : months >= 6 ? 0.05 : 0.0
    totalDiscountRate = Math.min(0.35, selectedFreq.discount + selectedType.discount + durationDiscount)
    discountAmount = Math.round(subtotal * totalDiscountRate)
    deliveryCost = selectedLoc.deliveryFee * estimatedDeliveries
    estimatedTotal = Math.max(0, subtotal - discountAmount + deliveryCost)
    estimatedMonthlyCost = Math.round(estimatedTotal / months)
  }

  const handleConfirmOrder = () => {
    const pkgTitle =
      customerType === 'student'
        ? 'Student Plan (19L)'
        : customerType === 'office'
        ? 'Corporate Plan (19L)'
        : 'Family Plan (19L)'

    updateSubscription({
      packageType: pkgTitle,
      frequency: frequency === 'biweekly' ? 'bi-weekly' : (frequency as any),
      bottleQty: quantity,
      status: 'active',
    })

    window.location.href = '/account'
  }

  const whatsappMessage = encodeURIComponent(
    `Hi Watlys Pakistan! I want to order 19L drinking water bottles.\n\nType: ${customerType.toUpperCase()}\nQuantity: ${quantity} x 19L Bottles per delivery\nFrequency: ${frequency}\nDuration: ${months} Months\nCity: ${city}\nTotal Price: PKR ${estimatedTotal.toLocaleString()} (PKR ${estimatedMonthlyCost.toLocaleString()}/month)`
  )

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0a1128] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-300">
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

            {/* Step 4: Contract Duration */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-slate-200">
                <span>4. Contract Duration (Months)</span>
                <span className="text-[#0064D0] font-serif text-lg">{months} {months === 1 ? 'Month' : 'Months'}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 3, 6, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                      months === m
                        ? 'border-[#0064D0] bg-[#0064D0]/10 text-[#0064D0]'
                        : 'border-zinc-200 dark:border-slate-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {m} {m === 1 ? 'Month' : 'Months'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: City Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-slate-200 block">
                5. Delivery City in Pakistan
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
          <div className="lg:col-span-5 space-y-6 bg-[#FAF9F6] dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 p-8 sm:p-10 rounded-2xl shadow-sm sticky top-28">
            <h3 className="text-2xl font-serif font-light text-zinc-900 dark:text-white">Order Summary</h3>

            <div className="space-y-3 text-xs font-light text-zinc-650 dark:text-slate-200 border-t border-b border-zinc-200 dark:border-slate-800 py-6">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Core Product:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">19L Pure Water Bottle</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Account Type:</span>
                <span className="font-semibold text-zinc-900 dark:text-white uppercase">{customerType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Bottles per Delivery:</span>
                <span className="font-semibold text-[#0064D0]">{quantity} × 19L Bottles</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Frequency:</span>
                <span className="font-semibold text-zinc-900 dark:text-white capitalize">{frequency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Duration:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{months} Months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">City Coverage:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{city}, Pakistan</span>
              </div>

              {/* Exact Calculator Financial Breakdown (Only for custom calculator mode) */}
              {!isCuratedPlan && (
                <div className="pt-3 border-t border-zinc-100 dark:border-slate-800 space-y-2 text-[11px]">
                  <div className="flex justify-between text-zinc-500">
                    <span>Water ({totalBottles} x 19L Bottles):</span>
                    <span>PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Delivery ({estimatedDeliveries} trips to {city}):</span>
                    <span>PKR {deliveryCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount ({Math.round(totalDiscountRate * 100)}%):</span>
                    <span>- PKR {discountAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest block">
                {isCuratedPlan ? 'Selected Package Rate' : `Total Contract Price (${months} Mo)`}
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-serif font-bold text-[#0064D0]">
                  PKR {estimatedMonthlyCost.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-400 font-semibold">/ Month</span>
              </div>
              <div className="text-[11px] text-zinc-500 pt-1 font-medium flex justify-between border-t border-zinc-100 dark:border-slate-800 mt-2">
                <span>Contract Total ({months} {months === 1 ? 'Month' : 'Months'}):</span>
                <span className="font-bold text-zinc-900 dark:text-white">PKR {estimatedTotal.toLocaleString()}</span>
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

              {user ? (
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="w-full py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                >
                  <span>Confirm & Activate Plan</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal('signup')}
                  className="w-full py-4 bg-[#0064D0] hover:bg-[#0052ad] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                >
                  <span>Submit Online Order (Sign In)</span>
                  <ArrowRight size={14} />
                </button>
              )}

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

export default function OrderWaterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] dark:bg-[#0a1128]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0064D0]" />
        </div>
      }
    >
      <OrderWaterContent />
    </Suspense>
  )
}
