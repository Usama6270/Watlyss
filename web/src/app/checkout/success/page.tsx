'use client'

import React, { useEffect } from 'react'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCart } from '@/context/cart'
import confetti from 'canvas-confetti'

export default function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()

    const duration = 2 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#1FB6D8', '#37D6FF', '#ffffff'],
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#1FB6D8', '#37D6FF', '#ffffff'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }, [])

  return (
    <div className="min-h-screen bg-transparent text-zinc-900 dark:text-white flex flex-col pt-24">
      <Navbar />

      <main className="max-w-xl mx-auto px-6 py-20 flex-1 flex flex-col items-center justify-center text-center space-y-8 w-full">
        {/* Animated Checkmark */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="h-24 w-24 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center text-green-500"
          >
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-zinc-900">Order Confirmed!</h1>
          <p className="text-zinc-550 font-medium">
            Thank you for choosing Watlys. Your order has been placed successfully and is currently being processed.
          </p>
        </div>

        <div className="bg-white border border-zinc-200/60 p-6 rounded-2xl w-full text-left space-y-3 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1FB6D8]">Next Steps</span>
          <p className="text-sm text-zinc-650 leading-relaxed font-medium">
            1. You will receive an email confirmation with your order details shortly. <br />
            2. Our packaging team is already handpicking and inspecting your premium hydration containers. <br />
            3. Track updates instantly in your profile dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            href="/dashboard"
            className="flex-1 py-4 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold rounded-xl transition-colors duration-300 shadow-sm text-center"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/shop"
            className="flex-1 py-4 bg-[#1FB6D8] hover:bg-[#1FB6D8]/85 text-white font-bold rounded-xl transition-colors duration-300 shadow-sm text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200/50 bg-white text-center text-sm text-zinc-400">
        <span>&copy; {new Date().getFullYear()} Watlys. All rights reserved.</span>
      </footer>
    </div>
  )
}
