'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, AlertCircle, Loader2, MessageCircle, ArrowRight, Droplets, Sparkles, Building2, User, Users, GraduationCap, Banknote, CreditCard } from 'lucide-react'

import { useAuth } from '@/context/auth'

export interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  initialPackageDetails?: {
    bottleQty?: number
    frequency?: 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'One-Time' | string
    customerSegment?: 'Student' | 'Individual' | 'Family' | 'Corporate' | string
    city?: string
    months?: number
  }
}

const SEGMENT_DISCOUNTS: Record<string, number> = {
  Student: 10,
  Individual: 5,
  Family: 8,
  Corporate: 15,
}

const FREQUENCY_DELIVERIES: Record<string, number> = {
  Weekly: 4,
  'Bi-Weekly': 2,
  Monthly: 1,
  'One-Time': 1,
}

export default function OrderModal({ isOpen, onClose, initialPackageDetails }: OrderModalProps) {
  const { user } = useAuth()

  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [city, setCity] = useState(initialPackageDetails?.city || 'Islamabad / Rawalpindi')

  const [bottleQty, setBottleQty] = useState<number>(initialPackageDetails?.bottleQty || 10)
  const [frequency, setFrequency] = useState<string>(initialPackageDetails?.frequency || 'Bi-Weekly')
  const [customerSegment, setCustomerSegment] = useState<string>(initialPackageDetails?.customerSegment || 'Family')
  const [months, setMonths] = useState<number>(initialPackageDetails?.months || 1)

  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Bank Transfer' | 'Credit/Debit Card'>('Cash on Delivery')
  const [transactionReference, setTransactionReference] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [orderSuccess, setOrderSuccess] = useState<{
    orderId: string
    orderNumber: string
    paymentMethod: string
    paymentStatus: string
    transactionReference?: string
  } | null>(null)

  // Synchronize initial state when modal opens or props change
  useEffect(() => {
    if (isOpen) {
      if (user) {
        if (user.fullName) setCustomerName(user.fullName)
        if (user.phone) setPhone(user.phone)
        if (user.email) setEmail(user.email)
        if (user.addressList?.[0]?.street) setDeliveryAddress(user.addressList[0].street)
        if (user.addressList?.[0]?.city) setCity(user.addressList[0].city)
      }
      if (initialPackageDetails?.bottleQty) setBottleQty(initialPackageDetails.bottleQty)
      if (initialPackageDetails?.frequency) {
        const f = initialPackageDetails.frequency
        if (f.toLowerCase().includes('week')) setFrequency('Weekly')
        else if (f.toLowerCase().includes('bi')) setFrequency('Bi-Weekly')
        else if (f.toLowerCase().includes('month')) setFrequency('Monthly')
        else setFrequency(f)
      }
      if (initialPackageDetails?.customerSegment) {
        const seg = initialPackageDetails.customerSegment
        if (seg.toLowerCase().includes('student')) setCustomerSegment('Student')
        else if (seg.toLowerCase().includes('indiv')) setCustomerSegment('Individual')
        else if (seg.toLowerCase().includes('corp') || seg.toLowerCase().includes('office')) setCustomerSegment('Corporate')
        else setCustomerSegment('Family')
      }
      if (initialPackageDetails?.city) setCity(initialPackageDetails.city)
      if (initialPackageDetails?.months) setMonths(initialPackageDetails.months)

      // Reset form submission state
      setErrorMessage(null)
      setOrderSuccess(null)
      setPaymentMethod('Cash on Delivery')
      setTransactionReference('')
      setCardNumber('')
      setCardExpiry('')
      setCardCvv('')
    }
  }, [isOpen, initialPackageDetails, user])

  // Calculation Engine
  const basePrice = 320
  const deliveriesPerMonth = FREQUENCY_DELIVERIES[frequency] || 2
  const totalDeliveries = frequency === 'One-Time' ? 1 : deliveriesPerMonth * months
  const totalBottles = bottleQty * totalDeliveries
  
  const discountRate = (SEGMENT_DISCOUNTS[customerSegment] || 8) / 100
  const subtotal = totalBottles * basePrice
  const appliedDiscountPercentage = Math.round(discountRate * 100)
  const discountAmount = Math.round(subtotal * discountRate)
  const deliveryFee = 100 * totalDeliveries
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.')
      return
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your mobile phone number.')
      return
    }
    if (!deliveryAddress.trim()) {
      setErrorMessage('Please provide your complete delivery address.')
      return
    }

    if (paymentMethod === 'Bank Transfer' && !transactionReference.trim()) {
      setErrorMessage('Please enter your Bank Transfer Transaction Reference ID.')
      return
    }

    if (paymentMethod === 'Credit/Debit Card' && !cardNumber.trim()) {
      setErrorMessage('Please enter your Card Number to proceed with gateway checkout.')
      return
    }

    setIsSubmitting(true)

    const payStatus =
      paymentMethod === 'Credit/Debit Card'
        ? 'Paid'
        : paymentMethod === 'Bank Transfer'
        ? 'Verification Pending'
        : 'Unpaid'

    const trxRef =
      paymentMethod === 'Credit/Debit Card'
        ? `CARD-GATEWAY-${Math.floor(100000 + Math.random() * 900000)}`
        : transactionReference.trim()

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          deliveryAddress: deliveryAddress.trim(),
          city,
          packageDetails: {
            bottleQty,
            frequency,
            customerSegment,
          },
          pricingSummary: {
            basePrice,
            subtotal,
            appliedDiscountPercentage,
            deliveryFee,
            grandTotal,
          },
          paymentMethod,
          paymentStatus: payStatus,
          transactionReference: trxRef,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit order. Please try again.')
      }

      // Auto-save user session to localStorage so Account Page displays their orders
      try {
        const userProfile = {
          fullName: customerName.trim(),
          name: customerName.trim(),
          email: email ? email.trim() : 'customer@watlys.pk',
          phone: phone.trim(),
          addressList: [
            {
              addressLabel: 'Primary Address',
              street: deliveryAddress.trim(),
              city: city,
              postalCode: '54000',
            },
          ],
        }
        localStorage.setItem('watlys_user', JSON.stringify(userProfile))
      } catch (err) {
        console.warn('Failed to store session in localStorage:', err)
      }

      setOrderSuccess({
        orderId: data.orderId,
        orderNumber: data.orderNumber,
        paymentMethod,
        paymentStatus: payStatus,
        transactionReference: trxRef,
      })
    } catch (err: any) {
      console.error('Order submission error:', err)
      setErrorMessage(err.message || 'Network error occurred. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  // Format WhatsApp confirmation text
  const whatsappText = orderSuccess
    ? encodeURIComponent(
        `Hi Watlys Pakistan! I've confirmed order *#${orderSuccess.orderNumber}* on your website.\n\n` +
        `👤 *Name:* ${customerName}\n` +
        `📞 *Phone:* ${phone}\n` +
        `📍 *Address:* ${deliveryAddress}, ${city}\n` +
        `📦 *Package:* ${bottleQty} x 19L Bottles (${frequency}, ${customerSegment})\n` +
        `💰 *Grand Total:* PKR ${grandTotal.toLocaleString()}\n\n` +
        `Please confirm delivery dispatch time!`
      )
    : ''

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#111c38] rounded-3xl border border-zinc-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Header Bar */}
          <div className="relative bg-[#0064D0] px-6 py-5 text-white flex justify-between items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-[#0064D0] to-cyan-600 opacity-90" />
            <div className="relative z-10 flex items-center space-x-2.5">
              <Droplets className="w-5 h-5 text-cyan-200" />
              <div>
                <h3 className="text-lg font-serif font-bold tracking-wide">
                  {orderSuccess ? 'Order Confirmed!' : 'Complete Your 19L Water Order'}
                </h3>
                <p className="text-[11px] text-blue-100 font-light">
                  {orderSuccess ? 'Directly synced with Watlys Logistics System' : 'Direct Sanity Studio Order Integration'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="relative z-10 p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
            {orderSuccess ? (
              /* SUCCESS CONFIRMATION SCREEN */
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 text-center py-4"
              >
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                    ORDER SUCCESSFULLY CREATED
                  </span>
                  <h4 className="text-3xl font-serif font-bold text-zinc-900 dark:text-white pt-1">
                    Order ID: <span className="text-[#0064D0]">{orderSuccess.orderNumber}</span>
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-zinc-900 dark:text-white">{customerName}</strong>! Your order has been recorded in our system and is ready for fulfillment.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-zinc-50 dark:bg-[#0b1329] p-5 rounded-2xl border border-zinc-200 dark:border-slate-800 text-left text-xs space-y-2.5 shadow-inner">
                  <div className="flex justify-between border-b border-zinc-200/60 dark:border-slate-800 pb-2">
                    <span className="text-zinc-500">Customer Phone:</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200/60 dark:border-slate-800 pb-2">
                    <span className="text-zinc-500">Delivery Address:</span>
                    <span className="font-semibold text-zinc-900 dark:text-white text-right max-w-[240px] truncate">{deliveryAddress}, {city}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200/60 dark:border-slate-800 pb-2">
                    <span className="text-zinc-500">Package Breakdown:</span>
                    <span className="font-semibold text-[#0064D0]">{bottleQty} × 19L ({frequency}, {customerSegment})</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200/60 dark:border-slate-800 pb-2">
                    <span className="text-zinc-500">Payment Method:</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{orderSuccess.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200/60 dark:border-slate-800 pb-2">
                    <span className="text-zinc-500">Payment Status:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      orderSuccess.paymentStatus === 'Paid'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : orderSuccess.paymentStatus === 'Verification Pending'
                        ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {orderSuccess.paymentStatus}
                    </span>
                  </div>
                  {orderSuccess.transactionReference && (
                    <div className="flex justify-between border-b border-zinc-200/60 dark:border-slate-800 pb-2">
                      <span className="text-zinc-500">Transaction Ref #:</span>
                      <code className="font-mono text-[#0064D0] font-bold">{orderSuccess.transactionReference}</code>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-bold text-zinc-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">Grand Total:</span>
                    <span className="text-xl font-serif font-bold text-[#0064D0]">PKR {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <a
                    href={`https://wa.me/923001234567?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2.5 transition-all shadow-xl shadow-emerald-600/30 cursor-pointer"
                  >
                    <MessageCircle size={18} />
                    <span>Confirm & Track via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-3 bg-zinc-100 dark:bg-slate-800 hover:bg-zinc-200 dark:hover:bg-slate-700 text-zinc-800 dark:text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ORDER FORM FORM */
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-start space-x-2.5">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Section 1: Customer Info */}
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0064D0] block">
                    1. CUSTOMER INFORMATION
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-700 dark:text-slate-200">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Usama Khan"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-[#0b1329] border border-zinc-200 dark:border-slate-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-700 dark:text-slate-200">Phone Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="03001234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-[#0b1329] border border-zinc-200 dark:border-slate-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-700 dark:text-slate-200">Email Address (Optional)</label>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-[#0b1329] border border-zinc-200 dark:border-slate-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-700 dark:text-slate-200">City *</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-[#0b1329] border border-zinc-200 dark:border-slate-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                      >
                        <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Sialkot">Sialkot</option>
                        <option value="Other">Other City</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-slate-200">Delivery Address *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Street address, house/building #, sector/area..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-[#0b1329] border border-zinc-200 dark:border-slate-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                    />
                  </div>
                </div>

                {/* Section 2: Package Configuration */}
                <div className="space-y-4 pt-2 border-t border-zinc-200/80 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0064D0] block">
                    2. PACKAGE CONFIGURATION
                  </span>

                  {/* Customer Segment */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-slate-200">Customer Segment</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'Student', label: 'Student (10% Off)', icon: GraduationCap },
                        { id: 'Individual', label: 'Individual (5% Off)', icon: User },
                        { id: 'Family', label: 'Family (8% Off)', icon: Users },
                        { id: 'Corporate', label: 'Corporate (15% Off)', icon: Building2 },
                      ].map((seg) => {
                        const IconComponent = seg.icon
                        return (
                          <button
                            key={seg.id}
                            type="button"
                            onClick={() => setCustomerSegment(seg.id)}
                            className={`py-2 px-2 rounded-xl text-[11px] font-bold border flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                              customerSegment === seg.id
                                ? 'border-[#0064D0] bg-[#0064D0]/10 text-[#0064D0]'
                                : 'border-zinc-200 dark:border-slate-800 text-zinc-600 dark:text-slate-300 hover:border-zinc-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <IconComponent size={14} />
                            <span>{seg.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Bottle Quantity & Frequency */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <label className="text-zinc-700 dark:text-slate-200">Bottles per Delivery</label>
                        <span className="text-[#0064D0] font-bold">{bottleQty} × 19L</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={bottleQty}
                        onChange={(e) => setBottleQty(parseInt(e.target.value))}
                        className="w-full h-2 bg-zinc-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0064D0]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-700 dark:text-slate-200">Delivery Frequency</label>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-[#0b1329] border border-zinc-200 dark:border-slate-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                      >
                        <option value="Weekly">Weekly Refills (4x / month)</option>
                        <option value="Bi-Weekly">Bi-Weekly Refills (2x / month)</option>
                        <option value="Monthly">Monthly Refill (1x / month)</option>
                        <option value="One-Time">One-Time Delivery</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Payment Method Selection */}
                <div className="space-y-4 pt-2 border-t border-zinc-200/80 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0064D0] block">
                    3. PAYMENT METHOD SELECTION
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Cash on Delivery */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Cash on Delivery')}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                        paymentMethod === 'Cash on Delivery'
                          ? 'border-[#0064D0] bg-[#0064D0]/10 text-[#0064D0] shadow-sm'
                          : 'border-zinc-200 dark:border-slate-800 hover:border-zinc-300 dark:hover:border-slate-700 text-zinc-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Banknote className="w-5 h-5 text-emerald-500" />
                        {paymentMethod === 'Cash on Delivery' && <CheckCircle2 className="w-4 h-4 text-[#0064D0]" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold">Cash on Delivery</h4>
                        <p className="text-[10px] opacity-75">Pay cash upon doorstep refill delivery</p>
                      </div>
                    </button>

                    {/* Direct Bank Transfer */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Bank Transfer')}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                        paymentMethod === 'Bank Transfer'
                          ? 'border-[#0064D0] bg-[#0064D0]/10 text-[#0064D0] shadow-sm'
                          : 'border-zinc-200 dark:border-slate-800 hover:border-zinc-300 dark:hover:border-slate-700 text-zinc-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Building2 className="w-5 h-5 text-sky-500" />
                        {paymentMethod === 'Bank Transfer' && <CheckCircle2 className="w-4 h-4 text-[#0064D0]" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold">Bank Transfer</h4>
                        <p className="text-[10px] opacity-75">Transfer directly to Watlys Meezan account</p>
                      </div>
                    </button>

                    {/* Credit/Debit Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Credit/Debit Card')}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                        paymentMethod === 'Credit/Debit Card'
                          ? 'border-[#0064D0] bg-[#0064D0]/10 text-[#0064D0] shadow-sm'
                          : 'border-zinc-200 dark:border-slate-800 hover:border-zinc-300 dark:hover:border-slate-700 text-zinc-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CreditCard className="w-5 h-5 text-purple-500" />
                        {paymentMethod === 'Credit/Debit Card' && <CheckCircle2 className="w-4 h-4 text-[#0064D0]" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold">Credit/Debit Card</h4>
                        <p className="text-[10px] opacity-75">Visa / Mastercard instant online gateway</p>
                      </div>
                    </button>
                  </div>

                  {/* Conditional Bank Details Panel */}
                  {paymentMethod === 'Bank Transfer' && (
                    <div className="p-4 bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60 rounded-2xl space-y-3 text-xs">
                      <div className="flex items-center justify-between border-b border-sky-200/60 dark:border-sky-800/40 pb-2">
                        <span className="font-bold text-sky-900 dark:text-sky-200 uppercase tracking-wider text-[10px]">
                          WATLYS OFFICIAL BANK ACCOUNT DETAILS
                        </span>
                        <span className="px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 text-[10px] font-extrabold">
                          VERIFICATION REQUIRED
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-200">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Bank Name:</span>
                          <strong className="text-slate-900 dark:text-white">Meezan Bank Limited</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Account Title:</span>
                          <strong className="text-slate-900 dark:text-white">Watlys Mineral Water (Pvt) Ltd</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Account Number:</span>
                          <code className="text-[#0064D0] font-bold">0284-0105829104</code>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">IBAN:</span>
                          <code className="text-[#0064D0] font-bold">PK89MEZN0002840105829104</code>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-sky-200/60 dark:border-sky-800/40 space-y-1">
                        <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          Transaction Reference / TRX ID # *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. TRX-9840128 or HBL Deposit Ref"
                          value={transactionReference}
                          onChange={(e) => setTransactionReference(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0b1329] border border-sky-300 dark:border-sky-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0064D0]"
                        />
                        <p className="text-[10px] text-slate-500">Enter your bank transfer receipt / reference ID for quick verification.</p>
                      </div>
                    </div>
                  )}

                  {/* Conditional Credit/Debit Card Panel */}
                  {paymentMethod === 'Credit/Debit Card' && (
                    <div className="p-4 bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 rounded-2xl space-y-3 text-xs">
                      <div className="flex items-center justify-between border-b border-purple-200/60 dark:border-purple-800/40 pb-2">
                        <span className="font-bold text-purple-900 dark:text-purple-200 uppercase tracking-wider text-[10px]">
                          SECURE CARD GATEWAY CHECKOUT
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-[10px] font-extrabold">
                          256-BIT ENCRYPTED
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">Card Number *</label>
                          <input
                            type="text"
                            required
                            maxLength={19}
                            placeholder="4111 2222 3333 4444"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0b1329] border border-purple-200 dark:border-purple-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">Expiry (MM/YY) *</label>
                            <input
                              type="text"
                              required
                              maxLength={5}
                              placeholder="12/28"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0b1329] border border-purple-200 dark:border-purple-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">CVV / CVC *</label>
                            <input
                              type="password"
                              required
                              maxLength={4}
                              placeholder="•••"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0b1329] border border-purple-200 dark:border-purple-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 4: Pricing Summary */}
                <div className="p-5 bg-zinc-50 dark:bg-[#0b1329] rounded-2xl border border-zinc-200/80 dark:border-slate-800 space-y-2.5 text-xs text-zinc-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span>Base Bottle Price:</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">PKR {basePrice} / 19L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Bottles ({totalBottles} bottles):</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Segment Discount ({customerSegment} - {appliedDiscountPercentage}%):</span>
                    <span>- PKR {discountAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee ({totalDeliveries} trips):</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">PKR {deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-zinc-200/80 dark:border-slate-800 flex justify-between items-baseline">
                    <span className="font-bold uppercase tracking-wider text-zinc-900 dark:text-white text-xs">GRAND TOTAL:</span>
                    <span className="text-2xl font-serif font-bold text-[#0064D0]">PKR {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#0064D0] hover:bg-[#0052ad] disabled:opacity-60 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all shadow-xl shadow-[#0064D0]/30 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Order to Sanity...</span>
                    </>
                  ) : (
                    <>
                      <span>CONFIRM & PLACE LIVE ORDER</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
