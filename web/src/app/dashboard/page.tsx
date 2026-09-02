'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import { useAuth } from '@/context/auth'
import { client } from '@/sanity/client'
import { defineQuery } from 'next-sanity'
import Link from 'next/link'

interface OrderItem {
  productId: string
  title: string
  quantity: number
  price: number
}

interface Order {
  _id: string
  orderNumber: string
  customerEmail: string
  items: OrderItem[]
  total: number
  paymentStatus: string
  status: string
  _createdAt: string
}

const CUSTOMER_ORDERS_QUERY = defineQuery(`
  *[_type == "order" && customerEmail == $email] | order(_createdAt desc) {
    _id,
    orderNumber,
    customerEmail,
    items,
    total,
    paymentStatus,
    status,
    _createdAt
  }
`)

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.email) {
      setLoading(false)
      return
    }

    async function load() {
      try {
        const data = await client.fetch<Order[]>(CUSTOMER_ORDERS_QUERY, { email: user?.email || '' })
        setOrders(data || [])
      } catch (err) {
        console.error('Failed to load orders', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-400">
        <Navbar />
        <main className="max-w-md mx-auto px-6 py-20 flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-[#FAFAFA]">Access Denied</h2>
          <p className="text-zinc-500 dark:text-[#AAAAAA]">Please sign in during checkout or shop catalog to access your dashboard.</p>
          <Link href="/shop" className="px-8 py-3 bg-[#0064D0] text-white rounded-full font-bold shadow-sm">
            Go to Shop
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-400">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Profile Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-[#FAFAFA]">Profile</h3>
            <div>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 block uppercase font-bold tracking-wider">Name</span>
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{user.name}</span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 block uppercase font-bold tracking-wider">Email</span>
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{user.email}</span>
            </div>
            <button
              onClick={logout}
              className="w-full py-2.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors text-sm font-semibold cursor-pointer"
            >
              Sign Out
            </button>
          </div>

          {user.address && (
            <div className="p-6 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-4 shadow-sm">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-[#FAFAFA]">Saved Address</h3>
              <p className="text-sm text-zinc-650 dark:text-zinc-300 font-medium">
                {user.address.line1} <br />
                {user.address.line2 && <>{user.address.line2} <br /></>}
                {user.address.city}, {user.address.state} <br />
                {user.address.postalCode}, {user.address.country}
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Order History */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-[#FAFAFA]">Order History</h2>

          {loading ? (
            <p className="text-zinc-500 dark:text-[#AAAAAA]">Loading order history...</p>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-[#111111] shadow-sm">
              <p className="text-zinc-500 dark:text-[#AAAAAA]">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="p-6 bg-white dark:bg-[#111111] border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <div>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 block">Order Date</span>
                      <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                        {new Date(order._createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 block">Order Number</span>
                      <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{order.orderNumber}</span>
                    </div>
                    <div>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 block">Status</span>
                      <span className="inline-block text-xs uppercase font-bold px-2.5 py-1 rounded bg-[#0064D0]/10 text-[#0064D0] border border-[#0064D0]/20">
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-zinc-650 dark:text-zinc-300 font-medium">
                          {item.title} <span className="text-zinc-400 dark:text-zinc-500 font-normal">x{item.quantity}</span>
                        </span>
                        <span className="font-semibold text-zinc-850 dark:text-[#FAFAFA]">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800 font-bold">
                    <span>Total Paid</span>
                    <span className="text-lg text-[#0064D0]">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
