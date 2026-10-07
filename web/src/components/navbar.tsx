'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, ChevronDown, MessageCircle, ArrowRight, Sparkles, User } from 'lucide-react'
import { useCart } from '@/context/cart'
import { useAuth } from '@/context/auth'
import { useLanguage } from '@/context/language'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'
import WatlysPatternHover from '@/components/watlys-pattern-hover'

export default function Navbar() {
  const { cart } = useCart()
  const { user, openAuthModal } = useAuth()
  const { language, setLanguage, t, isRtl } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isNavHovered, setIsNavHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock background body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isOpen])

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

  // Staggered Entrance Animations for Mobile Menu Links
  const menuContainerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.2, ease: 'easeIn' as any }
    }
  }

  const menuItemVariants = {
    hidden: { opacity: 0, x: isRtl ? 20 : -20, y: 10 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  }

  const mobileNavItems = [
    { num: '01', label: t.nav.ourWater, href: '/our-water' },
    { num: '02', label: t.nav.process, href: '/process' },
    { num: '03', label: t.nav.order, href: '/order' },
    { num: '04', label: t.nav.services, href: '/services/water-delivery' },
    { num: '05', label: t.nav.findUs, href: '/locations' },
    { num: '06', label: t.nav.about, href: '/about' },
  ]

  return (
    <>
      <nav
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
            ? 'bg-background/95 backdrop-blur-md border-border shadow-sm'
            : 'bg-background border-border/60'
          }`}
      >
        {/* DESKTOP NAVBAR CONTAINER — visible from lg (1024px)+ */}
        <div className="relative w-full max-w-[1600px] mx-auto h-20 sm:h-[84px] px-4 lg:px-6 2xl:px-10 hidden lg:flex items-center justify-between">

          {/* LEFT SIDE NAVIGATION */}
          <div className={`flex-1 flex items-center justify-start gap-3 lg:gap-4 2xl:gap-6 z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {leftLinks.map((link) => (
              <div
                key={link.label}
                className="relative whitespace-nowrap group"
                onMouseEnter={() => link.type === 'dropdown' && setActiveDropdown(link.id)}
                onMouseLeave={() => link.type === 'dropdown' && setActiveDropdown(null)}
              >
                {link.type === 'dropdown' ? (
                  <button className="flex items-center space-x-1 py-2 text-[10px] 2xl:text-[11px] uppercase tracking-[0.14em] font-semibold text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer whitespace-nowrap font-sans">
                    <span>{link.label}</span>
                    <ChevronDown size={11} className={`text-muted-foreground/70 group-hover:text-foreground transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link href={link.href || '#'} className="py-2 text-[10px] 2xl:text-[11px] uppercase tracking-[0.14em] font-semibold text-muted-foreground hover:text-foreground transition-colors duration-300 whitespace-nowrap font-sans block">
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
                      className="absolute top-full left-0 mt-1 w-56 bg-card border border-border py-3 shadow-lg rounded-xl z-50 glass"
                    >
                      {link.items?.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2 text-[11px] text-muted-foreground hover:bg-primary-muted hover:text-primary transition-colors font-medium whitespace-nowrap"
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

          {/* CENTER WATLYS LOGO */}
          <div className="flex-shrink-0 px-3 lg:px-6 z-20 flex items-center justify-center pointer-events-auto">
            <Link href="/" aria-label="Watlys Homepage" className="relative block h-12 sm:h-14 lg:h-16 w-44 sm:w-48 lg:w-52 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
              <Image
                src="/logo.webp"
                alt="Watlys Pure Mineral Water"
                fill
                priority
                sizes="(max-width: 640px) 176px, (max-width: 1024px) 192px, 208px"
                className="object-contain"
              />
            </Link>
          </div>

          {/* RIGHT SIDE NAVIGATION & UTILITY CONTROLS */}
          <div className={`flex-1 flex items-center justify-end gap-3 lg:gap-4 2xl:gap-5 z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>

            {/* Nav Links */}
            <div className={`flex items-center gap-3 lg:gap-4 2xl:gap-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {rightLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative whitespace-nowrap group"
                  onMouseEnter={() => link.type === 'dropdown' && setActiveDropdown(link.id)}
                  onMouseLeave={() => link.type === 'dropdown' && setActiveDropdown(null)}
                >
                  {link.type === 'dropdown' ? (
                    <button className="flex items-center space-x-1 py-2 text-[10px] 2xl:text-[11px] uppercase tracking-[0.14em] font-semibold text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer whitespace-nowrap font-sans">
                      <span>{link.label}</span>
                      <ChevronDown size={11} className={`text-muted-foreground/70 group-hover:text-foreground transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link href={link.href || '#'} className="py-2 text-[10px] 2xl:text-[11px] uppercase tracking-[0.14em] font-semibold text-muted-foreground hover:text-foreground transition-colors duration-300 whitespace-nowrap font-sans block">
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
                        className="absolute top-full right-0 mt-1 w-52 bg-card border border-border py-3 shadow-lg rounded-xl z-50 glass"
                      >
                        {link.items?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2 text-[11px] text-muted-foreground hover:bg-primary-muted hover:text-primary transition-colors font-medium whitespace-nowrap"
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

            {/* Utility Group */}
            <div className={`relative z-50 flex items-center gap-2 lg:gap-2.5 2xl:gap-3 pointer-events-auto ${isRtl ? 'flex-row-reverse' : ''}`}>
              <LanguageToggle />
              <ThemeToggle />

              {user ? (
                <Link
                  href="/account"
                  aria-label="Customer Account"
                  className="flex items-center space-x-1.5 px-2.5 lg:px-3 py-1.5 rounded-full bg-primary-muted text-primary hover:bg-primary hover:text-primary-foreground transition-all text-[11px] font-bold whitespace-nowrap"
                >
                  <User size={14} />
                  <span className="max-w-[75px] truncate">{user.fullName.split(' ')[0]}</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  aria-label="Sign In"
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <User size={16} />
                </button>
              )}
            </div>

          </div>

        </div>

        {/* MOBILE HEADER (< lg / 1024px) — glassmorphic hamburger shell */}
        <div className="relative w-full h-16 px-4 flex lg:hidden items-center justify-between z-50 bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm">

          {/* Left Slot: Navigation Menu Trigger */}
          <div className="flex items-center z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 cursor-pointer rounded-full touch-manipulation transition-all duration-300 ${isOpen
                ? 'bg-primary/10 text-primary rotate-90 scale-105 border border-primary/30'
                : 'text-foreground hover:bg-muted'
                }`}
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Absolute Center Slot: Geometric Center Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-auto">
            <Link href="/" className="relative block h-12 w-44 sm:h-15 sm:w-56">
              <Image
                src="/logo.webp"
                alt="Watlys Logo"
                fill
                priority
                sizes="176px"
                className="object-contain scale-110"
              />
            </Link>
          </div>

          {/* Right Slot: Action Utilities Cluster */}
          <div className="relative z-30 flex items-center gap-1.5 sm:gap-3 pointer-events-auto">
            {/* Animated Scaled Mobile Language Toggle Switch */}
            <LanguageToggle />

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Account Portal icon on Mobile */}
            {user ? (
              <Link
                href="/account"
                aria-label="Customer Account"
                className="p-1.5 rounded-full text-primary bg-primary/10"
              >
                <User size={16} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                aria-label="Sign In"
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground"
              >
                <User size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Glassmorphic mobile drawer — lg:hidden */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-16 left-0 right-0 bottom-0 h-[calc(100dvh-64px)] w-full z-[999] lg:hidden overflow-y-auto overflow-x-hidden font-sans
                bg-background/92 backdrop-blur-2xl
                border-t border-border shadow-xl
                flex flex-col justify-between p-5 sm:p-8"
            >
              {/* SUBTLE BRAND WATERMARK GRAPHIC IN BACKGROUND */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/5 dark:text-primary/10 font-bold text-9xl pointer-events-none select-none z-0">
                WATLYS
              </div>

              {/* Language toggle inside drawer (Urdu / EN) */}
              <div className="relative z-10 flex items-center justify-between gap-3 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  {isRtl ? 'زبان' : 'Language'}
                </span>
                <LanguageToggle />
              </div>

              {/* MAIN STAGGERED NAVIGATION LINKS (VERTICALLY BALANCED) */}
              <div className="relative z-10 py-4 flex-1 flex flex-col justify-center space-y-2">
                {mobileNavItems.map((item) => (
                  <motion.div key={item.num} variants={menuItemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group py-3.5 px-4 rounded-2xl flex items-center justify-between touch-manipulation
                        bg-white/70 dark:bg-card/75 backdrop-blur-md
                        hover:bg-primary/10 dark:hover:bg-primary/20
                        border border-white/60 dark:border-slate-700/60 hover:border-primary/40
                        transition-all duration-300 active:scale-[0.98] shadow-sm"
                    >
                      <div className="flex items-center space-x-3.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/80 text-primary dark:text-sky-400 group-hover:bg-primary group-hover:text-white transition-all">
                          {item.num}
                        </span>
                        <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 group-hover:text-primary dark:group-hover:text-sky-400 transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight size={16} className={`text-slate-400 group-hover:text-primary transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* COMPACT FOOTER & WHATSAPP BRANDED CTA SECTION */}
              <div className="relative z-10 pt-5 border-t border-slate-200/60 dark:border-slate-800/80 space-y-3.5">

                {/* WhatsApp Order Button */}
                <a
                  href="https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%2019L%20drinking%20water%20bottles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-[0.98]"
                >
                  <MessageCircle size={18} />
                  <span>{t.whatsapp || 'Order via WhatsApp'}</span>
                </a>

                {/* 2-Column Secondary Links Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground font-medium px-1">
                  <Link
                    href="/sustainability"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primary dark:hover:text-white transition-colors"
                  >
                    Sustainability
                  </Link>
                  <Link
                    href="/certifications"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primary dark:hover:text-white transition-colors"
                  >
                    Certifications
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primary dark:hover:text-white transition-colors"
                  >
                    About Watlys
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primary dark:hover:text-white transition-colors"
                  >
                    Contact Concierge
                  </Link>
                </div>

                {/* City Badges */}
                <p className="text-[10px] sm:text-[11px] text-slate-400 dark:text-zinc-500 text-center uppercase tracking-widest pt-1 font-semibold">
                  {isRtl ? 'لاہور • کراچی • اسلام آباد' : 'Lahore • Karachi • Islamabad'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
