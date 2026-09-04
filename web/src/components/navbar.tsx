'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, ChevronDown, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/cart'
import { useLanguage } from '@/context/language'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'

export default function Navbar() {
  const { cart } = useCart()
  const { language, setLanguage, t, isRtl } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  // LEFT NAVIGATION GROUP
  const leftLinks = [
    { label: t.nav.ourWater, href: '/our-water' },
    { label: t.nav.process, href: '/process' },
    {
      label: t.nav.services,
      type: 'dropdown',
      id: 'services',
      items: [
        { label: t.nav.servicesList.delivery, href: '/services/water-delivery' },
        { label: t.nav.servicesList.installation, href: '/services/free-bottle-installation' },
        { label: t.nav.servicesList.testing, href: '/services/water-testing' },
        { label: t.nav.servicesList.dispenser, href: '/services/dispenser-service' },
      ],
    },
  ]

  // RIGHT NAVIGATION GROUP
  const rightLinks = [
    { label: t.nav.sustainability, href: '/sustainability' },
    { label: t.nav.about, href: '/about' },
    {
      label: t.nav.findUs,
      type: 'dropdown',
      id: 'findUs',
      items: [
        { label: t.nav.findUsList.contact, href: '/contact' },
        { label: t.nav.findUsList.locations, href: '/locations' },
        { label: t.nav.findUsList.inquiry, href: '/contact?type=corporate' },
      ],
    },
  ]

  const dropdownVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    },
    exit: {
      opacity: 0,
      y: 8,
      scale: 0.98,
      transition: { duration: 0.15, ease: 'easeIn' as any }
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b ${isScrolled
            ? 'bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-zinc-200/20 dark:border-zinc-800/40 shadow-[0_2px_20px_rgba(0,0,0,0.03)]'
            : 'bg-white dark:bg-[#0A0A0A] border-zinc-100 dark:border-zinc-900'
          }`}
      >
        {/* DESKTOP NAVBAR CONTAINER — ABSOLUTE CENTERED LOGO */}
        <div className="relative w-full max-w-[1536px] mx-auto h-20 sm:h-[84px] px-8 2xl:px-14 hidden xl:flex items-center justify-between">

          {/* LEFT SIDE NAVIGATION */}
          <div className={`flex items-center gap-6 2xl:gap-8 z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {leftLinks.map((link) => (
              <div
                key={link.label}
                className="relative whitespace-nowrap group"
                onMouseEnter={() => link.type === 'dropdown' && setActiveDropdown(link.id)}
                onMouseLeave={() => link.type === 'dropdown' && setActiveDropdown(null)}
              >
                {link.type === 'dropdown' ? (
                  <button className="flex items-center space-x-1.5 py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap font-sans">
                    <span>{link.label}</span>
                    <ChevronDown size={11} className={`text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link href={link.href || '#'} className="py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 whitespace-nowrap font-sans block">
                    {link.label}
                  </Link>
                )}

                {/* Dropdown Box */}
                <AnimatePresence>
                  {link.type === 'dropdown' && activeDropdown === link.id && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 mt-1 w-60 bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800 py-3 shadow-xl rounded-xl z-50"
                    >
                      {link.items?.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2.5 text-[11px] text-zinc-600 dark:text-zinc-300 hover:bg-[#0064D0]/10 hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors font-medium whitespace-nowrap"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* ABSOLUTE HORIZONTAL CENTERED WATLYS LOGO */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-auto">
            <Link href="/" aria-label="Watlys Homepage" className="relative block h-14 sm:h-16 2xl:h-20 w-56 sm:w-64 2xl:w-72 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
              <Image
                src="/logo.png"
                alt="Watlys Pure Mineral Water"
                fill
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* RIGHT SIDE NAVIGATION & UTILITY CONTROLS */}
          <div className={`flex items-center gap-5 2xl:gap-7 z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>

            {/* Nav Links */}
            <div className={`flex items-center gap-5 2xl:gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {rightLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative whitespace-nowrap group"
                  onMouseEnter={() => link.type === 'dropdown' && setActiveDropdown(link.id)}
                  onMouseLeave={() => link.type === 'dropdown' && setActiveDropdown(null)}
                >
                  {link.type === 'dropdown' ? (
                    <button className="flex items-center space-x-1.5 py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap font-sans">
                      <span>{link.label}</span>
                      <ChevronDown size={11} className={`text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link href={link.href || '#'} className="py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 whitespace-nowrap font-sans block">
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown Box */}
                  <AnimatePresence>
                    {link.type === 'dropdown' && activeDropdown === link.id && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full right-0 mt-1 w-56 bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800 py-3 shadow-xl rounded-xl z-50"
                      >
                        {link.items?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2.5 text-[11px] text-zinc-600 dark:text-zinc-300 hover:bg-[#0064D0]/10 hover:text-[#0064D0] dark:hover:text-[#0064D0] transition-colors font-medium whitespace-nowrap"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Utility Group: Animated LanguageToggle Pill | Dark Mode | Cart */}
            <div className={`relative z-50 flex items-center gap-3 pointer-events-auto ${isRtl ? 'flex-row-reverse' : ''}`}>
              {/* Language Selector Pill Toggle */}
              <LanguageToggle />

              {/* Dark Mode Icon */}
              <ThemeToggle />

              {/* Cart / Bag Icon */}
              <Link
                href="/cart"
                aria-label="Shopping Bag"
                className="relative w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
              >
                <ShoppingBag size={17} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#0064D0] text-white text-[7px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white dark:border-[#0A0A0A]">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

          </div>

        </div>

        {/* MOBILE HEADER (< xl) — RE-ARCHITECTED NON-OVERLAPPING LAYOUT */}
        <div className="relative w-full h-16 px-4 flex xl:hidden items-center justify-between z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">

          {/* Left Slot: Navigation Menu Trigger */}
          <div className="flex items-center z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-zinc-900 dark:text-white cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Absolute Center Slot: Geometric Center Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-auto">
            <Link href="/" className="relative block h-9 w-32 sm:h-12 sm:w-44">
              <Image
                src="/logo.png"
                alt="Watlys Logo"
                fill
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* Right Slot: Action Utilities Cluster */}
          <div className="relative z-30 flex items-center gap-1.5 sm:gap-3 pointer-events-auto">
            {/* Animated Scaled Mobile Language Toggle Switch */}
            <LanguageToggle />

            {/* Theme Toggle Button */}
            <ThemeToggle />

            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ShoppingBag size={17} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0064D0] text-white text-[7px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* SLEEK APPLE/TESLA-STYLE MOBILE DRAWER OVERLAY */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8 xl:hidden overflow-y-auto font-sans"
            >
              {/* TOP BAR INSIDE OVERLAY: LOGO + UTILITIES + CLOSE */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-zinc-800/80">
                <Link href="/" onClick={() => setIsOpen(false)} className="relative block h-10 w-36">
                  <Image
                    src="/logo.png"
                    alt="Watlys Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </Link>

                <div className="flex items-center space-x-3">
                  {/* Animated Language Toggle Pill */}
                  <LanguageToggle />

                  <ThemeToggle />

                  {/* Close Drawer Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-slate-800 dark:text-zinc-200 hover:text-slate-950 dark:hover:text-white rounded-full bg-slate-100 dark:bg-zinc-800/60 transition-colors"
                    aria-label="Close Navigation Menu"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* MAIN NAVIGATION LINKS (CLEAN SLEEK TYPOGRAPHY) */}
              <div className="py-6 flex-1 flex flex-col justify-center divide-y divide-slate-100 dark:divide-zinc-800/60">
                <Link
                  href="/our-water"
                  onClick={() => setIsOpen(false)}
                  className="py-3.5 text-xl sm:text-2xl font-medium tracking-tight text-slate-800 dark:text-zinc-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center justify-between group"
                >
                  <span>{t.nav.ourWater}</span>
                  <span className="text-xs text-slate-400 group-hover:text-sky-600 transition-colors">01</span>
                </Link>

                <Link
                  href="/process"
                  onClick={() => setIsOpen(false)}
                  className="py-3.5 text-xl sm:text-2xl font-medium tracking-tight text-slate-800 dark:text-zinc-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center justify-between group"
                >
                  <span>{t.nav.process}</span>
                  <span className="text-xs text-slate-400 group-hover:text-sky-600 transition-colors">02</span>
                </Link>

                <Link
                  href="/order"
                  onClick={() => setIsOpen(false)}
                  className="py-3.5 text-xl sm:text-2xl font-medium tracking-tight text-slate-800 dark:text-zinc-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center justify-between group"
                >
                  <span>{t.nav.order}</span>
                  <span className="text-xs text-slate-400 group-hover:text-sky-600 transition-colors">03</span>
                </Link>

                <Link
                  href="/services/water-delivery"
                  onClick={() => setIsOpen(false)}
                  className="py-3.5 text-xl sm:text-2xl font-medium tracking-tight text-slate-800 dark:text-zinc-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center justify-between group"
                >
                  <span>{t.nav.services}</span>
                  <span className="text-xs text-slate-400 group-hover:text-sky-600 transition-colors">04</span>
                </Link>

                <Link
                  href="/locations"
                  onClick={() => setIsOpen(false)}
                  className="py-3.5 text-xl sm:text-2xl font-medium tracking-tight text-slate-800 dark:text-zinc-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center justify-between group"
                >
                  <span>{t.nav.findUs}</span>
                  <span className="text-xs text-slate-400 group-hover:text-sky-600 transition-colors">05</span>
                </Link>
              </div>

              {/* COMPACT FOOTER & CTA SECTION */}
              <div className="pt-6 border-t border-slate-100 dark:border-zinc-800/80 space-y-4">

                {/* WhatsApp Order Button */}
                <a
                  href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%2019L%20drinking%20water%20bottles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 text-sm transition-all"
                >
                  <MessageCircle size={18} />
                  <span>Order via WhatsApp</span>
                </a>

                {/* 2-Column Secondary Links Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-zinc-400 pt-1 font-medium">
                  <Link
                    href="/sustainability"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Sustainability
                  </Link>
                  <Link
                    href="/certifications"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Certifications
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    About Watlys
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Contact Support
                  </Link>
                </div>

                {/* City Badges */}
                <p className="text-[11px] text-slate-400 dark:text-zinc-500 text-center uppercase tracking-widest pt-2 font-medium">
                  Lahore • Karachi • Islamabad
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
