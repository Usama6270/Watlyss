'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import { useCart } from '@/context/cart'
import { useAuth } from '@/context/auth'
import { loadStripe } from '@stripe/stripe-js'

export default function CheckoutPage() {
  const { cart, cartTotal, discountAmount, finalTotal, coupon } = useCart()
  const { user, login } = useAuth()

  // Form Fields
  const [email, setEmail] = useState(user?.email || '')
  const [name, setName] = useState(user?.name || '')
  const [line1, setLine1] = useState(user?.address?.line1 || '')
  const [line2, setLine2] = useState(user?.address?.line2 || '')
  const [city, setCity] = useState(user?.address?.city || '')
  const [state, setState] = useState(user?.address?.state || '')
  const [postalCode, setPostalCode] = useState(user?.address?.postalCode || '')
  const [country, setCountry] = useState(user?.address?.country || 'US')
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'jazzcash' | 'easypaisa'>('stripe')
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // If user is guest, perform a quick auto-login/signup for local dashboard tracking
    if (!user) {
      login(email, name)
    }

    try {
      // 1. Trigger Stripe checkout session generation
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          address: { line1, line2, city, state, postalCode, country },
          items: cart.map((i) => ({
            id: i.id,
            title: i.title,
            price: i.price,
            quantity: i.quantity,
            imageUrl: i.imageUrl,
          })),
          couponCode: coupon?.code,
          paymentMethod,
        }),
      })

      const session = await response.json()

      if (!response.ok) {
        throw new Error(session.error || 'Failed to create checkout session.')
      }

      // If Stripe payment method chosen, redirect to Stripe
      if (paymentMethod === 'stripe') {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')
        if (stripe) {
          const { error: stripeError } = await (stripe as any).redirectToCheckout({
            sessionId: session.id,
          })
          if (stripeError) {
            throw new Error(stripeError.message)
          }
        } else {
          throw new Error('Stripe failed to load. Please try again.')
        }
      } else {
        // Direct simulation redirect to success page for local mobile wallets
        window.location.href = `/checkout/success?session_id=${session.orderNumber}`
      }
    } catch (err: any) {
      setError(err.message || 'Checkout failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0a1128] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-[#FAFAFA]">Checkout</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-400 dark:text-slate-200">Your cart is empty. Cannot checkout.</p>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Address and account Form */}
            <div className="lg:col-span-8 space-y-8 bg-white dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 p-8 rounded-2xl shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-[#FAFAFA] border-b border-zinc-100 dark:border-slate-800 pb-4">Shipping Information</h2>

              {error && <p className="text-sm text-red-500 font-semibold">{error}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 dark:text-slate-200 font-bold uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-[#0a1128] border border-zinc-200 dark:border-slate-800 text-zinc-800 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#0064D0] shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 dark:text-slate-200 font-bold uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-[#0a1128] border border-zinc-200 dark:border-slate-800 text-zinc-800 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#0064D0] shadow-inner"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs text-zinc-500 dark:text-slate-200 font-bold uppercase tracking-wider">Address Line 1</label>
                  <input
                    type="text"
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-[#0a1128] border border-zinc-200 dark:border-slate-800 text-zinc-800 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#0064D0] shadow-inner"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs text-zinc-500 dark:text-slate-200 font-bold uppercase tracking-wider">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={line2}
                    onChange={(e) => setLine2(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-[#0a1128] border border-zinc-200 dark:border-slate-800 text-zinc-800 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#0064D0] shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 dark:text-slate-200 font-bold uppercase tracking-wider">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-[#0a1128] border border-zinc-200 dark:border-slate-800 text-zinc-800 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#0064D0] shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 dark:text-slate-200 font-bold uppercase tracking-wider">State / Province</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-[#0a1128] border border-zinc-200 dark:border-slate-800 text-zinc-800 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#0064D0] shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 dark:text-slate-200 font-bold uppercase tracking-wider">Postal / ZIP Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-[#0a1128] border border-zinc-200 dark:border-slate-800 text-zinc-800 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#0064D0] shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 dark:text-slate-200 font-bold uppercase tracking-wider">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-[#0a1128] border border-zinc-200 dark:border-slate-800 text-zinc-800 dark:text-white focus:outline-none focus:border-[#0064D0]"
                  >
                    <option value="US">United States</option>
                    <option value="PK">Pakistan</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-[#FAFAFA]">Payment Method</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center font-bold text-sm transition-all shadow-sm cursor-pointer ${
                      paymentMethod === 'stripe'
                        ? 'border-[#0064D0] bg-[#0064D0]/10 text-[#0064D0]'
                        : 'border-zinc-200 dark:border-slate-800 bg-white dark:bg-[#131c38] text-zinc-500 dark:text-slate-200 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Stripe / Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center font-bold text-sm transition-all shadow-sm cursor-pointer ${
                      paymentMethod === 'jazzcash'
                        ? 'border-[#0064D0] bg-[#0064D0]/10 text-[#0064D0]'
                        : 'border-zinc-200 dark:border-slate-800 bg-white dark:bg-[#131c38] text-zinc-500 dark:text-slate-200 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    JazzCash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center font-bold text-sm transition-all shadow-sm cursor-pointer ${
                      paymentMethod === 'easypaisa'
                        ? 'border-[#0064D0] bg-[#0064D0]/10 text-[#0064D0]'
                        : 'border-zinc-200 dark:border-slate-800 bg-white dark:bg-[#131c38] text-zinc-500 dark:text-slate-200 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    EasyPaisa
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Details */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-white dark:bg-[#131c38] border border-zinc-200/60 dark:border-slate-800/60 rounded-2xl space-y-6 shadow-sm">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-[#FAFAFA] border-b border-zinc-100 dark:border-slate-800 pb-4">Order Summary</h3>

                {/* Items */}
                <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex-1">
                        <span className="font-semibold text-zinc-800 dark:text-[#FAFAFA] block">{item.title}</span>
                        <span className="text-xs text-zinc-450 dark:text-slate-200">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-bold text-zinc-900 dark:text-[#FAFAFA]">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 text-sm border-t border-zinc-100 dark:border-slate-800 pt-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-slate-200">Subtotal</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">${cartTotal.toFixed(2)}</span>
                  </div>

                  {coupon && (
                    <div className="flex justify-between text-[#0064D0]">
                      <span>Discount ({coupon.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-slate-200">Shipping</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">Free</span>
                  </div>

                  <div className="flex justify-between border-t border-zinc-100 dark:border-slate-800 pt-4 text-base">
                    <span className="font-bold text-zinc-900 dark:text-[#FAFAFA]">Total</span>
                    <span className="font-extrabold text-zinc-950 dark:text-white">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#0064D0] hover:bg-[#0064D0]/85 text-white font-bold rounded-xl flex items-center justify-center transition-colors duration-300 disabled:opacity-50 shadow-sm cursor-pointer"
                >
                  {loading ? 'Processing...' : paymentMethod === 'stripe' ? 'Pay with Stripe' : 'Place Order'}
                </button>
              </div>
            </div>
          </form>
        )}
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
