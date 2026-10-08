'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import {
  MessageCircle,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Check,
  Loader2,
} from 'lucide-react'
import { useLanguage } from '@/context/language'
import {
  FOOTER_BRAND,
  FOOTER_NAV,
  FOOTER_CONTACT,
  FOOTER_LEGAL,
} from '@/data/footer-nav'
import { subscribeToNewsletter } from '@/lib/newsletter-subscribe'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function FooterWave({ animate }: { animate: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 -translate-y-[calc(100%-1px)] overflow-hidden leading-[0]">
      <svg
        className={`watlys-footer-wave block w-[200%] max-w-none ${animate ? 'watlys-footer-wave--live' : ''}`}
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          className="fill-[var(--footer-surface)]"
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,8 1440,36 L1440,64 L0,64 Z"
        />
      </svg>
      {animate ? (
        <div className="watlys-footer-microbubbles absolute inset-x-0 bottom-2 h-10" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : null}
    </div>
  )
}

function SubscribeForm() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const inputId = useId()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const result = await subscribeToNewsletter(email)
    if (!result.ok) {
      setStatus('error')
      setError(result.error)
      return
    }
    setStatus('success')
    window.setTimeout(() => {
      setEmail('')
      setStatus('idle')
    }, 3200)
  }

  return (
    <div className="w-full max-w-md">
      <label
        htmlFor={inputId}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--footer-label)]"
      >
        Water Insights
      </label>
      <form onSubmit={onSubmit} className="relative" noValidate>
        <div
          className={`relative flex min-h-12 items-center rounded-full border bg-white/[0.07] pl-4 pr-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-[box-shadow,border-color] duration-300 ${
            status === 'error'
              ? 'border-rose-300/60 focus-within:shadow-[0_0_0_3px_rgba(251,113,133,0.25)]'
              : 'border-white/20 focus-within:border-sky-200/50 focus-within:shadow-[0_0_0_3px_rgba(125,211,252,0.22)]'
          }`}
        >
          <input
            id={inputId}
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'error') setStatus('idle')
            }}
            placeholder={t.newsletter.emailPlaceholder}
            disabled={status === 'loading' || status === 'success'}
            aria-invalid={status === 'error'}
            aria-describedby={`${inputId}-hint`}
            className="min-w-0 flex-1 bg-transparent py-2.5 text-[13px] text-white placeholder:text-sky-100/45 outline-none disabled:opacity-70"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            aria-label={t.newsletter.button}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[color:var(--footer-deep)] shadow-sm transition hover:scale-[1.04] hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/70 disabled:opacity-80"
          >
            {status === 'loading' ? (
              <Loader2 size={15} className="animate-spin" />
            ) : status === 'success' ? (
              <Check size={16} className="text-emerald-600" strokeWidth={2.5} />
            ) : (
              <ArrowRight size={15} />
            )}
          </button>
          {status === 'success' && (
            <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
              <span className="watlys-footer-success-ripple absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/60" />
            </span>
          )}
        </div>
      </form>
      <p
        id={`${inputId}-hint`}
        className={`mt-2 text-[11px] leading-relaxed ${
          status === 'error'
            ? 'text-rose-200'
            : status === 'success'
              ? 'text-emerald-200'
              : 'text-sky-100/55'
        }`}
        role={status === 'error' ? 'alert' : undefined}
      >
        {status === 'error'
          ? error
          : status === 'success'
            ? t.newsletter.success
            : 'Weekly water insights — unsubscribe anytime.'}
      </p>
    </div>
  )
}

function FooterLinkItem({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="watlys-footer-link group relative inline-flex min-h-8 items-center text-[13px] text-sky-50/85 transition-[color,transform] duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--footer-deep)]"
      >
        <span className="relative">
          {label}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-sky-200/80 transition-[width] duration-300 ease-out group-hover:w-full" />
        </span>
      </Link>
    </li>
  )
}

export default function FooterSection() {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const footerRef = useRef<HTMLElement>(null)
  const inView = useInView(footerRef, { once: true, margin: '-40px' })
  const [activeInView, setActiveInView] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const year = new Date().getFullYear()

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setActiveInView(!!entry?.isIntersecting),
      { rootMargin: '80px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const animateFx = !reduceMotion && activeInView

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="watlys-footer relative mt-[-2.5rem] w-full overflow-hidden pt-10 sm:mt-[-3rem] sm:pt-12"
      style={
        {
          '--footer-deep': '#061525',
          '--footer-mid': '#0A2A45',
          '--footer-teal': '#0E4A6E',
          '--footer-surface': '#072033',
          '--footer-label': 'rgba(186, 230, 253, 0.72)',
        } as React.CSSProperties
      }
    >
      <FooterWave animate={animateFx} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,var(--footer-deep)_0%,var(--footer-mid)_42%,var(--footer-teal)_78%,#0B3D5C_100%)] dark:bg-[linear-gradient(165deg,#030B14_0%,#061525_40%,#0A2740_75%,#0C3550_100%)]"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-[0.14] dark:opacity-[0.1] ${
          animateFx ? 'watlys-footer-caustic' : ''
        }`}
        style={{
          background: `
            radial-gradient(ellipse 22% 50% at 18% 12%, rgba(255,255,255,0.55) 0%, transparent 70%),
            radial-gradient(ellipse 16% 40% at 72% 8%, rgba(125,211,252,0.4) 0%, transparent 70%),
            radial-gradient(ellipse 28% 35% at 48% 0%, rgba(186,230,253,0.25) 0%, transparent 65%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -right-6 h-56 w-56 opacity-[0.07] dark:opacity-[0.09]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120' fill='none'%3E%3Ccircle cx='60' cy='60' r='18' stroke='%237dd3fc' stroke-width='0.6'/%3E%3Ccircle cx='60' cy='60' r='32' stroke='%237dd3fc' stroke-width='0.5'/%3E%3Ccircle cx='60' cy='60' r='46' stroke='%237dd3fc' stroke-width='0.4'/%3E%3Cpath d='M10 70c20-8 30 12 50 4s30-18 50-8' stroke='%237dd3fc' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 pb-5 pt-2 sm:px-8 sm:pb-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid grid-cols-1 items-start gap-7 border-b border-white/10 pb-7 lg:grid-cols-12 lg:gap-10"
        >
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="relative mb-3 inline-block h-12 w-[140px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/50 sm:h-14 sm:w-[150px]"
            >
              <Image
                src="/logo.webp"
                alt="Watlys"
                fill
                sizes="150px"
                className="object-contain object-left brightness-0 invert"
              />
            </Link>
            <p className="font-serif text-[1.05rem] font-medium tracking-tight text-white sm:text-[1.15rem]">
              {FOOTER_BRAND.tagline}
            </p>
            <p className="mt-1.5 max-w-sm text-[12.5px] leading-relaxed text-sky-100/65">
              {FOOTER_BRAND.description}
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {FOOTER_BRAND.trustMarks.map((mark) => (
                <span
                  key={mark}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-100/80 backdrop-blur-sm"
                >
                  {mark}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 lg:flex lg:justify-end">
            <SubscribeForm />
          </div>
        </motion.div>

        <motion.nav
          aria-label="Footer"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
          className="hidden gap-8 border-b border-white/10 py-6 sm:grid sm:grid-cols-2 lg:grid-cols-3"
        >
          {FOOTER_NAV.map((sec, i) => (
            <motion.div
              key={sec.id}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.06, ease: EASE }}
            >
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--footer-label)]">
                {sec.title}
              </h3>
              <ul className="space-y-1.5">
                {sec.links.map((link) => (
                  <FooterLinkItem key={link.href} href={link.href} label={link.label} />
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.nav>

        <div className="space-y-1 border-b border-white/10 py-3 sm:hidden">
          {FOOTER_NAV.map((sec) => {
            const open = openSection === sec.id
            return (
              <div key={sec.id} className="border-b border-white/10 last:border-0">
                <button
                  type="button"
                  onClick={() => setOpenSection(open ? null : sec.id)}
                  aria-expanded={open}
                  className="flex min-h-11 w-full items-center justify-between py-2 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--footer-label)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/50"
                >
                  {sec.title}
                  <ChevronDown
                    size={16}
                    className={`text-sky-100/70 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className="overflow-hidden pb-2"
                    >
                      {sec.links.map((link) => (
                        <FooterLinkItem key={link.href} href={link.href} label={link.label} />
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
          className="my-5 grid grid-cols-1 overflow-hidden rounded-[1rem] border border-white/12 bg-white/[0.06] backdrop-blur-md sm:grid-cols-3"
        >
          <a
            href={FOOTER_CONTACT.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-12 items-center gap-3 px-4 py-3 transition hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-200/40 sm:border-r sm:border-white/10"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500/15 text-emerald-300 transition group-hover:shadow-[0_0_16px_rgba(52,211,153,0.35)]">
              <MessageCircle size={16} />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-100/55">
                {FOOTER_CONTACT.whatsapp.label}
              </span>
              <span className="block truncate text-[13px] font-medium text-white">
                {FOOTER_CONTACT.whatsapp.value}
              </span>
            </span>
          </a>
          <a
            href={FOOTER_CONTACT.email.href}
            className="group flex min-h-12 items-center gap-3 px-4 py-3 transition hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-200/40 sm:border-r sm:border-white/10"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-400/15 text-sky-200 transition group-hover:shadow-[0_0_16px_rgba(125,211,252,0.35)]">
              <Mail size={16} />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-100/55">
                {FOOTER_CONTACT.email.label}
              </span>
              <span className="block truncate text-[13px] font-medium text-white">
                {FOOTER_CONTACT.email.value}
              </span>
            </span>
          </a>
          <Link
            href={FOOTER_CONTACT.regions.href}
            className="group flex min-h-12 items-center gap-3 px-4 py-3 transition hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-200/40"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-400/15 text-sky-200 transition group-hover:shadow-[0_0_16px_rgba(125,211,252,0.35)]">
              <MapPin size={16} />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-100/55">
                {FOOTER_CONTACT.regions.label}
              </span>
              <span className="block truncate text-[13px] font-medium text-white">
                {FOOTER_CONTACT.regions.value}
              </span>
            </span>
          </Link>
        </motion.div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row">
          <p className="text-center text-[12px] text-sky-100/50 sm:text-left">
            © {year} {t.footer.rights}
          </p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-sky-100/55"
          >
            {FOOTER_LEGAL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/40"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={scrollTop}
            aria-label="Back to top"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.07] text-sky-100/80 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/50"
          >
            <ChevronUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}
