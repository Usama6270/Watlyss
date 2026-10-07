'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import { useCart } from '@/context/cart'
import { useAuth } from '@/context/auth'

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

      // Stripe Checkout Session URL redirect (avoids deprecated redirectToCheckout)
      if (paymentMethod === 'stripe') {
        if (!session.url) {
          throw new Error('Stripe checkout URL missing. Please try again.')
        }
        window.location.href = session.url
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
    <div className="page-atmosphere min-h-screen bg-background text-foreground flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 flex-1 w-full space-y-12">
        <div className="space-y-2">
          <span className="eyebrow">Secure Checkout</span>
          <h1 className="page-title">Checkout</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Your cart is empty. Cannot checkout.</p>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Address and account Form */}
            <div className="lg:col-span-8 space-y-8 surface-card p-8">
              <h2 className="text-xl sm:text-2xl font-serif font-medium text-foreground border-b border-border pb-4">Shipping Information</h2>

              {error && <p className="text-sm text-destructive font-semibold">{error}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Address Line 1</label>
                  <input
                    type="text"
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={line2}
                    onChange={(e) => setLine2(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider">State / Province</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Postal / ZIP Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="input-field"
                  >
                    <option value="US">United States</option>
                    <option value="PK">Pakistan</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground">Payment Method</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center font-bold text-sm transition-all shadow-sm cursor-pointer ${
                      paymentMethod === 'stripe'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Stripe / Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center font-bold text-sm transition-all shadow-sm cursor-pointer ${
                      paymentMethod === 'jazzcash'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:text-black dark:hover:text-white'
                    }`}
                  >
                    JazzCash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center font-bold text-sm transition-all shadow-sm cursor-pointer ${
                      paymentMethod === 'easypaisa'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:text-black dark:hover:text-white'
                    }`}
                  >
                    EasyPaisa
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Details */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-card border border-border rounded-2xl space-y-6 shadow-sm">
                <h3 className="text-xl font-bold text-foreground border-b border-border pb-4">Order Summary</h3>

                {/* Items */}
                <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex-1">
                        <span className="font-semibold text-zinc-800 dark:text-foreground block">{item.title}</span>
                        <span className="text-xs text-zinc-450 dark:text-slate-200">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 text-sm border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">${cartTotal.toFixed(2)}</span>
                  </div>

                  {coupon && (
                    <div className="flex justify-between text-primary">
                      <span>Discount ({coupon.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">Free</span>
                  </div>

                  <div className="flex justify-between border-t border-border pt-4 text-base">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-extrabold text-zinc-950 dark:text-white">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary hover:bg-primary/85 text-white font-bold rounded-xl flex items-center justify-center transition-colors duration-300 disabled:opacity-50 shadow-sm cursor-pointer"
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
