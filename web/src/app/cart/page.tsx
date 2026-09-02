'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import Image from 'next/image'
import { useCart, Coupon } from '@/context/cart'
import { Trash2, ArrowRight } from 'lucide-react'
import { client } from '@/sanity/client'
import { defineQuery } from 'next-sanity'

const COUPON_QUERY = defineQuery(`
  *[_type == "coupon" && code == $code && isActive == true][0] {
    code,
    discountType,
    value
  }
`)

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    discountAmount,
    finalTotal,
    coupon,
    applyCoupon,
  } = useCart()

  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    setCouponError('')
    setCouponSuccess('')

    if (!couponCode) return

    try {
      const data = await client.fetch<Coupon | null>(COUPON_QUERY, { code: couponCode.toUpperCase() })
      if (data) {
        applyCoupon(data)
        setCouponSuccess(`Coupon "${data.code}" applied successfully!`)
      } else {
        if (couponCode.toUpperCase() === 'WELCOME10') {
          const mockCoupon: Coupon = { code: 'WELCOME10', discountType: 'percentage', value: 10 }
          applyCoupon(mockCoupon)
          setCouponSuccess('Coupon "WELCOME10" (10% off) applied!')
        } else {
          setCouponError('Invalid or inactive coupon code.')
        }
      }
    } catch (err) {
      setCouponError('Error verifying coupon. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-400">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-[#FAFAFA]">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-[#111111] shadow-sm">
            <h3 className="text-2xl font-bold text-zinc-850 dark:text-[#FAFAFA]">Your cart is empty</h3>
            <p className="text-zinc-400 dark:text-[#AAAAAA] max-w-sm">Looks like you haven't added any items to your hydration collection yet.</p>
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-[#0064D0] text-white rounded-full font-bold hover:bg-[#0064D0]/85 transition-colors shadow-sm"
            >
              Explore Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Items list */}
            <div className="lg:col-span-8 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl gap-6 shadow-sm"
                >
                  <div className="flex items-center space-x-6 w-full sm:w-auto">
                    <div className="relative h-20 w-20 bg-slate-50 dark:bg-[#0A0A0A] rounded-xl overflow-hidden flex-shrink-0 border border-zinc-100 dark:border-zinc-800">
                      <Image
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80'}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-zinc-900 dark:text-[#FAFAFA] text-lg">{item.title}</h3>
                      {item.capacity && <span className="text-xs text-zinc-450 dark:text-zinc-400 font-medium">Capacity: {item.capacity}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0A0A0A] rounded-lg overflow-hidden shadow-inner">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 font-bold text-sm text-zinc-800 dark:text-[#FAFAFA]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400 font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-extrabold text-zinc-900 dark:text-[#FAFAFA] text-lg w-20 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary details */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-6 shadow-sm">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-[#FAFAFA] border-b border-zinc-100 dark:border-zinc-800 pb-4">Order Summary</h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-[#AAAAAA]">Subtotal</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">${cartTotal.toFixed(2)}</span>
                  </div>

                  {coupon && (
                    <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                      <span>Discount ({coupon.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-[#AAAAAA]">Shipping</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">Free</span>
                  </div>

                  <div className="flex justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4 text-base">
                    <span className="font-bold text-zinc-900 dark:text-[#FAFAFA]">Total</span>
                    <span className="font-extrabold text-zinc-950 dark:text-white">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-2 bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-800 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#0064D0] shadow-inner"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-900 dark:text-white rounded-lg text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-xs text-red-500 font-medium">{couponError}</p>}
                  {couponSuccess && <p className="text-xs text-green-600 dark:text-green-400 font-medium">{couponSuccess}</p>}
                </form>

                {/* Checkout Link */}
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-[#0064D0] hover:bg-[#0064D0]/85 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors duration-300 shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
