'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import { useAuth, AddressItem } from '@/context/auth'
import { client } from '@/sanity/client'
import { defineQuery } from 'next-sanity'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Package,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  Plus,
  Trash2,
  RefreshCw,
  Droplets,
  LogOut,
  ShoppingBag,
  Sliders,
  ChevronRight,
  Shield,
  Truck,
  AlertCircle,
  Loader2,
} from 'lucide-react'

interface PackageDetails {
  bottleQty?: number
  frequency?: string
  customerSegment?: string
}

interface PricingSummary {
  basePrice?: number
  subtotal?: number
  appliedDiscountPercentage?: number
  deliveryFee?: number
  grandTotal?: number
}

interface OrderItem {
  productId?: string
  title: string
  quantity: number
  price: number
}

interface Order {
  _id: string
  orderNumber: string
  customerName?: string
  phone?: string
  email?: string
  deliveryAddress?: string
  city?: string
  packageDetails?: PackageDetails
  pricingSummary?: PricingSummary
  paymentMethod?: string
  paymentStatus?: string
  transactionReference?: string
  orderStatus?: string
  subscriptionStatus?: string
  pauseStartDate?: string
  nextBillingDate?: string
  // Legacy schema fallbacks
  status?: string
  total?: number
  items?: OrderItem[]
  _createdAt: string
}

const CUSTOMER_ORDERS_QUERY = `
  *[_type == "order"] | order(_createdAt desc) {
    _id,
    orderNumber,
    customerName,
    phone,
    email,
    deliveryAddress,
    city,
    packageDetails,
    pricingSummary,
    orderStatus,
    status,
    total,
    items,
    _createdAt
  }
`

export default function AccountPage() {
  const {
    user,
    logout,
    toggleSubscriptionStatus,
    updateSubscription,
    addAddress,
    removeAddress,
    openAuthModal,
  } = useAuth()

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'subscription' | 'addresses'>('overview')
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  const [showAddressForm, setShowAddressForm] = useState(false)
  const [newLabel, setNewLabel] = useState('Home')
  const [newStreet, setNewStreet] = useState('')
  const [newCity, setNewCity] = useState('Lahore')
  const [newPostal, setNewPostal] = useState('54000')

  const [isToggling, setIsToggling] = useState(false)
  const [toggleNotice, setToggleNotice] = useState<string | null>(null)

  const handleToggleSubscription = async () => {
    setIsToggling(true)
    setToggleNotice(null)

    const currentStatus = sub.status // 'active' or 'paused'
    const isCurrentlyActive = currentStatus === 'active'
    const action = isCurrentlyActive ? 'PAUSE' : 'RESUME'

    try {
      const res = await fetch('/api/subscription/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: latestOrder?._id,
          phone: currentUser.phone,
          action,
        }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to toggle subscription in Sanity.')
      }

      toggleSubscriptionStatus()

      setToggleNotice(
        action === 'PAUSE'
          ? 'Deliveries paused in Sanity. Automated billing put on hold.'
          : 'Deliveries resumed! Sanity subscription status set to ACTIVE.'
      )
    } catch (err: any) {
      console.error('Failed to toggle subscription:', err)
      setToggleNotice(err.message || 'Network error toggling subscription status.')
    } finally {
      setIsToggling(false)
    }
  }

  useEffect(() => {
    let subscription: any

    async function fetchOrders(showSpinner = false) {
      try {
        if (showSpinner) setLoadingOrders(true)
        const res = await fetch('/api/orders')
        const data = await res.json()
        const allOrders: Order[] = data.orders || []

        // Filter relevant orders if user info is present, or show all orders for user
        if (user) {
          const userEmail = (user.email || '').toLowerCase().trim()
          const userPhone = (user.phone || '').trim()
          const userName = (user.fullName || '').toLowerCase().trim()

          const filtered = (allOrders || []).filter((o) => {
            const oEmail = (o.email || '').toLowerCase().trim()
            const oPhone = (o.phone || '').trim()
            const oName = (o.customerName || '').toLowerCase().trim()

            if (userEmail && oEmail && (oEmail.includes(userEmail) || userEmail.includes(oEmail))) return true
            if (userPhone && oPhone && (oPhone.includes(userPhone) || userPhone.includes(oPhone))) return true
            if (userName && oName && (oName.includes(userName) || userName.includes(oName))) return true
            return false
          })

          setOrders(filtered.length > 0 ? filtered : allOrders)
        } else {
          setOrders(allOrders)
        }
      } catch (err) {
        console.error('Failed to fetch orders via /api/orders:', err)
      } finally {
        if (showSpinner) setLoadingOrders(false)
      }
    }

    fetchOrders(true)
    const interval = setInterval(() => fetchOrders(false), 5000)

    // Setup Real-Time Sanity Listener for Instant Status Updates
    try {
      subscription = client
        .listen(`*[_type == "order"]`)
        .subscribe(() => {
          fetchOrders(false)
        })
    } catch (err) {
      console.error('Failed to subscribe to Sanity live updates:', err)
    }

    return () => {
      clearInterval(interval)
      if (subscription) subscription.unsubscribe()
    }
  }, [user])

  const currentUser = user || {
    fullName: 'Watlys Customer',
    email: 'customer@watlys.pk',
    phone: '+92 300 1234567',
    addressList: [
      {
        addressLabel: 'Primary Location',
        street: 'Main Boulevard, Gulberg III',
        city: 'Lahore',
        postalCode: '54000',
      },
    ],
  }

  const sub = currentUser.activeSubscription || {
    packageType: 'Family Plan (19L)',
    frequency: 'weekly',
    bottleQty: 4,
    status: 'active',
  }

  const latestOrder = orders.length > 0 ? orders[0] : null

  const getFormattedNextDelivery = () => {
    if (sub.status !== 'active') return 'On Hold (Paused)'

    const rawDate = latestOrder?.nextBillingDate
    const targetDate = rawDate ? new Date(rawDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    if (isNaN(targetDate.getTime())) return 'Tomorrow, 10:00 AM'

    return targetDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) + ' (10:00 AM)'
  }

  const getStatusBadgeClass = (statusStr?: string) => {
    const s = (statusStr || 'pending').toLowerCase()
    if (s.includes('confirm')) return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
    if (s.includes('out') || s.includes('delivery')) return 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30'
    if (s.includes('deliver') || s.includes('paid')) return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
    if (s.includes('cancel') || s.includes('fail')) return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
    return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
  }

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStreet) return
    addAddress({
      addressLabel: newLabel,
      street: newStreet,
      city: newCity,
      postalCode: newPostal,
    })
    setNewStreet('')
    setShowAddressForm(false)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0a1128] text-zinc-900 dark:text-[#FAFAFA] flex flex-col pt-24 transition-colors duration-300 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 w-full space-y-8">
        
        {/* Header Profile Banner */}
        <div className="bg-white dark:bg-[#131c38] border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-[#0064D0] text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-[#0064D0]/30">
              {currentUser.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
                  {currentUser.fullName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {currentUser.email} • {currentUser.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <Link
              href="/order"
              className="flex-1 md:flex-none px-5 py-2.5 bg-[#0064D0] hover:bg-[#0052ad] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <Droplets size={15} />
              <span>Order 19L Refill</span>
            </Link>
            <button
              onClick={logout}
              className="p-2.5 text-red-500 hover:bg-red-500/10 rounded-xl border border-red-500/20 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2 pb-1">
          {[
            { id: 'overview', label: 'Overview & Schedule', icon: Package },
            { id: 'orders', label: `Order History (${orders.length})`, icon: ShoppingBag },
            { id: 'subscription', label: 'Subscription Controls', icon: Sliders },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-[#131c38] text-[#0064D0] border-t-2 border-[#0064D0] shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* TAB 1: OVERVIEW & SCHEDULE */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Active Subscription Delivery Card */}
            <div className="lg:col-span-8 bg-white dark:bg-[#131c38] border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
              
              {/* Latest Live Sanity Order Banner if present */}
              {latestOrder && (
                <div className="p-4 bg-[#0064D0]/10 border border-[#0064D0]/30 rounded-2xl flex flex-wrap justify-between items-center gap-3">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-[#0064D0]" />
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0064D0] block">
                        LATEST RECENT ORDER ({latestOrder.orderNumber})
                      </span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {latestOrder.packageDetails?.bottleQty || 10} × 19L Bottles • {latestOrder.packageDetails?.customerSegment || 'Family'}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadgeClass(latestOrder.orderStatus || latestOrder.status)}`}>
                    Status: {latestOrder.orderStatus || latestOrder.status || 'Pending'}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0064D0]">
                    CURRENT HYDRATION PLAN
                  </span>
                  <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                    {sub.packageType}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    sub.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                  }`}
                >
                  {sub.status === 'active' ? '• DELIVERY ACTIVE' : '• DELIVERY PAUSED'}
                </span>
              </div>

              {toggleNotice && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-xs text-[#0064D0] font-semibold flex items-center space-x-2">
                  <CheckCircle2 size={16} />
                  <span>{toggleNotice}</span>
                </div>
              )}

              {/* Delivery Schedule Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-[#0a1128] rounded-2xl space-y-1 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold">
                    <Calendar size={14} className="text-[#0064D0]" />
                    <span>Next Estimated Delivery</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white pt-1">
                    {getFormattedNextDelivery()}
                  </p>
                  <span className={`text-[10px] font-medium ${sub.status === 'active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {sub.status === 'active' ? 'On schedule' : 'Deliveries suspended'}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#0a1128] rounded-2xl space-y-1 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold">
                    <Droplets size={14} className="text-[#0064D0]" />
                    <span>Bottle Allocation</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white pt-1">
                    {sub.bottleQty} × 19L Bottles
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium">Refilled {sub.frequency}</span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#0a1128] rounded-2xl space-y-1 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold">
                    <MapPin size={14} className="text-[#0064D0]" />
                    <span>Primary Location</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white pt-1 truncate">
                    {currentUser.addressList?.[0]?.city || 'Lahore'}, Pakistan
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium">Doorstep delivery</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <button
                    onClick={handleToggleSubscription}
                    disabled={isToggling}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer disabled:opacity-60 ${
                      sub.status === 'active'
                        ? 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border border-amber-500/30'
                        : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md'
                    }`}
                  >
                    {isToggling ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Updating Sanity...</span>
                      </>
                    ) : sub.status === 'active' ? (
                      <>
                        <PauseCircle size={16} />
                        <span>⏸ PAUSE DELIVERIES</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle size={16} />
                        <span>▶ RESUME DELIVERIES</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 font-light">
                    * Pausing stops your upcoming automated billing and delivery schedule immediately.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('subscription')}
                  className="text-xs text-[#0064D0] font-bold hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <span>Customize Plan & Quantity</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Account Quick Stats Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-[#131c38] border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Account Summary</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Total Sanity Orders</span>
                    <span className="font-bold text-slate-900 dark:text-white">{orders.length} Order(s)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Delivery Frequency</span>
                    <span className="font-bold text-[#0064D0] capitalize">{sub.frequency}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Saved Addresses</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {currentUser.addressList?.length || 1} Address(es)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0064D0] to-sky-700 text-white p-6 rounded-3xl space-y-3 shadow-lg">
                <Shield size={24} className="text-sky-200" />
                <h4 className="font-serif font-bold text-lg">Pure Mineral Assurance</h4>
                <p className="text-xs text-sky-100 leading-relaxed">
                  Every 19L bottle undergoes multi-stage filtration and micro-mineral balancing before delivery.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ORDER HISTORY */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                  Live Sanity Orders History
                </h3>
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Real-Time Sync</span>
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {orders.length} Order(s) Found
              </span>
            </div>

            {loadingOrders ? (
              <div className="p-12 text-center text-xs text-slate-400 flex flex-col items-center space-y-3">
                <RefreshCw className="w-6 h-6 animate-spin text-[#0064D0]" />
                <span>Fetching live order records from Sanity Studio...</span>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white dark:bg-[#131c38] border border-dashed border-slate-200 dark:border-slate-800 p-12 rounded-3xl text-center space-y-4">
                <ShoppingBag size={36} className="mx-auto text-slate-300" />
                <p className="text-sm text-slate-500">No live 19L bottle orders found for your account.</p>
                <Link
                  href="/order"
                  className="inline-block px-6 py-2.5 bg-[#0064D0] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#0052ad] transition-all"
                >
                  Place New 19L Order
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const statusDisplay = order.orderStatus || order.status || 'Pending'
                  const grandTotal = order.pricingSummary?.grandTotal || order.total || 0
                  const bottleCount = order.packageDetails?.bottleQty || order.items?.[0]?.quantity || 1
                  const freq = order.packageDetails?.frequency || 'Bi-Weekly'
                  const segment = order.packageDetails?.customerSegment || 'Family'

                  return (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-[#131c38] border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">
                            Order Number
                          </span>
                          <span className="text-base font-serif font-bold text-[#0064D0]">
                            {order.orderNumber}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">
                            Placed On
                          </span>
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                            {new Date(order._createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">
                            Live Sanity Status
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border inline-block ${getStatusBadgeClass(statusDisplay)}`}>
                            {statusDisplay}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">
                            Payment Details
                          </span>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              {order.paymentMethod || 'Cash on Delivery'}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                (order.paymentStatus || 'unpaid').toLowerCase().includes('paid') && !(order.paymentStatus || '').toLowerCase().includes('unpaid')
                                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                                  : (order.paymentStatus || '').toLowerCase().includes('verif')
                                  ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30'
                                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                              }`}
                            >
                              {order.paymentStatus || 'Unpaid'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Details Breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="text-slate-400 font-semibold block text-[11px]">Customer & Address:</span>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{order.customerName || currentUser.fullName}</p>
                          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                            {order.deliveryAddress || 'Standard Delivery'}, {order.city || 'Islamabad'}
                          </p>
                          <p className="text-slate-400 text-[10px]">{order.phone || currentUser.phone}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-400 font-semibold block text-[11px]">Package Specs:</span>
                          <p className="font-semibold text-[#0064D0]">{bottleCount} × 19L Bottles</p>
                          <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                            Frequency: <strong>{freq}</strong>
                          </p>
                          <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                            Segment: <strong>{segment}</strong>
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-400 font-semibold block text-[11px]">Pricing Breakdown:</span>
                          {order.pricingSummary ? (
                            <>
                              <div className="flex justify-between text-slate-500 text-[11px]">
                                <span>Subtotal:</span>
                                <span>PKR {order.pricingSummary.subtotal?.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-emerald-600 text-[11px]">
                                <span>Discount ({order.pricingSummary.appliedDiscountPercentage}%):</span>
                                <span>- PKR {Math.round((order.pricingSummary.subtotal || 0) * ((order.pricingSummary.appliedDiscountPercentage || 0) / 100)).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-slate-500 text-[11px]">
                                <span>Delivery Fee:</span>
                                <span>PKR {order.pricingSummary.deliveryFee?.toLocaleString()}</span>
                              </div>
                            </>
                          ) : (
                            <p className="text-slate-500">Standard Plan Pricing</p>
                          )}
                        </div>
                      </div>

                      {order.transactionReference && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 flex items-center space-x-1.5 border-t border-slate-100 dark:border-slate-800">
                          <span className="font-semibold text-slate-400">Transaction Reference ID:</span>
                          <code className="font-mono text-[#0064D0] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                            {order.transactionReference}
                          </code>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800 font-bold text-sm">
                        <span className="text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">
                          Grand Total Amount:
                        </span>
                        <span className="text-xl font-serif text-[#0064D0]">
                          PKR {grandTotal.toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SUBSCRIPTION CONTROLS */}
        {activeTab === 'subscription' && (
          <div className="bg-white dark:bg-[#131c38] border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 rounded-3xl space-y-8 shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0064D0]">RECURRING SETTINGS</span>
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                Subscription & Delivery Controls
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                Adjust your bottle quantity or pause recurring deliveries anytime with zero extra fees.
              </p>
            </div>

            {/* Pause / Resume Panel */}
            <div className="p-6 bg-slate-50 dark:bg-[#0a1128] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-200/60 dark:border-slate-800">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Subscription Status</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {sub.status === 'active' ? 'Deliveries are ACTIVE' : 'Deliveries are PAUSED'}
                </span>
                <p className="text-xs text-slate-500">
                  {sub.status === 'active'
                    ? 'Your weekly 19L bottle deliveries will arrive as scheduled.'
                    : 'Your delivery queue is currently paused. Resume whenever you need refills.'}
                </p>
                <p className="text-[10px] text-slate-400 font-light pt-1">
                  * Pausing stops your upcoming automated billing and delivery schedule immediately.
                </p>
              </div>

              <button
                onClick={handleToggleSubscription}
                disabled={isToggling}
                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 disabled:opacity-60 ${
                  sub.status === 'active'
                    ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-md'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md'
                }`}
              >
                {isToggling ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Updating Sanity...</span>
                  </>
                ) : sub.status === 'active' ? (
                  <>
                    <PauseCircle size={16} />
                    <span>⏸ PAUSE DELIVERIES</span>
                  </>
                ) : (
                  <>
                    <PlayCircle size={16} />
                    <span>▶ RESUME DELIVERIES</span>
                  </>
                )}
              </button>
            </div>

            {/* Frequency Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Delivery Frequency
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'weekly', label: 'Weekly' },
                  { id: 'bi-weekly', label: 'Bi-Weekly' },
                  { id: 'monthly', label: 'Monthly' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => updateSubscription({ frequency: f.id as any })}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      sub.frequency === f.id
                        ? 'border-[#0064D0] bg-[#0064D0]/10 text-[#0064D0]'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Adjuster */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex justify-between">
                <span>19L Bottles Per Delivery</span>
                <span className="text-[#0064D0] text-sm font-bold">{sub.bottleQty} Bottles</span>
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateSubscription({ bottleQty: Math.max(1, sub.bottleQty - 1) })}
                  className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold text-lg hover:bg-slate-200 transition-colors"
                >
                  -
                </button>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={sub.bottleQty}
                  onChange={(e) => updateSubscription({ bottleQty: parseInt(e.target.value) })}
                  className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0064D0]"
                />
                <button
                  onClick={() => updateSubscription({ bottleQty: sub.bottleQty + 1 })}
                  className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold text-lg hover:bg-slate-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                Saved Delivery Addresses
              </h3>
              <button
                onClick={() => setShowAddressForm(true)}
                className="px-4 py-2 bg-[#0064D0] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Address</span>
              </button>
            </div>

            {/* Address List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentUser.addressList?.map((addr, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#131c38] border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl space-y-3 relative shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded bg-[#0064D0]/10 text-[#0064D0] text-[10px] font-bold uppercase tracking-wider">
                      {addr.addressLabel || 'Saved Location'}
                    </span>
                    {idx > 0 && (
                      <button
                        onClick={() => removeAddress(idx)}
                        className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Remove Address"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                    {addr.street} <br />
                    {addr.city}, {addr.postalCode}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Address Modal / Form Overlay */}
            {showAddressForm && (
              <form
                onSubmit={handleAddAddressSubmit}
                className="bg-white dark:bg-[#131c38] border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl max-w-lg"
              >
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Add New Delivery Address
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-500">Label</label>
                    <input
                      type="text"
                      required
                      placeholder="Home / Office / Hostel"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-500">City</label>
                    <input
                      type="text"
                      required
                      placeholder="Lahore"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-500">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="House/Plot #, Block, Sector, Road"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0a1128] border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0064D0] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </main>

      <FooterSection />
    </div>
  )
}
