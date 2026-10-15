'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Mail, Phone, MapPin, ChevronUp } from 'lucide-react'
import { useLanguage } from '@/context/language'
import {
  getFooterPrimaryLinks,
  getFooterContactIcons,
  getFooterLegal,
  type FooterContactIcon,
} from '@/data/footer-nav'

const CONTACT_ICONS = {
  whatsapp: MessageCircle,
  email: Mail,
  phone: Phone,
  locations: MapPin,
} as const

function ContactIconButton({ item }: { item: FooterContactIcon }) {
  const Icon = CONTACT_ICONS[item.id as keyof typeof CONTACT_ICONS] ?? MapPin
  const className =
    'watlys-footer-icon group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--footer-icon-border)] bg-[var(--footer-icon-bg)] text-[var(--footer-icon-fg)] transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[var(--footer-accent)] hover:border-[var(--footer-accent)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--footer-bg)] focus-visible:-translate-y-0.5 focus-visible:bg-[var(--footer-accent)] focus-visible:border-[var(--footer-accent)] focus-visible:text-white'

  const tooltip = (
    <span className="watlys-footer-tooltip" role="tooltip">
      {item.value}
    </span>
  )

  if (item.href.startsWith('/') && !item.external) {
    return (
      <Link href={item.href} aria-label={`${item.label}: ${item.value}`} className={className}>
        <Icon size={17} strokeWidth={1.75} aria-hidden />
        {tooltip}
      </Link>
    )
  }

  return (
    <a
      href={item.href}
      aria-label={`${item.label}: ${item.value}`}
      className={className}
      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Icon size={17} strokeWidth={1.75} aria-hidden />
      {tooltip}
    </a>
  )
}

export default function FooterSection() {
  const { t, isRtl } = useLanguage()
  const footerPrimaryLinks = React.useMemo(() => getFooterPrimaryLinks(t), [t])
  const footerContactIcons = React.useMemo(() => getFooterContactIcons(t, isRtl), [t, isRtl])
  const footerLegal = React.useMemo(() => getFooterLegal(t), [t])
  const footerRef = useRef<HTMLElement>(null)
  const rafRef = useRef(0)
  const targetRef = useRef({ x: 0.5, y: 0.5 })
  const currentRef = useRef({ x: 0.5, y: 0.5 })
  const [inView, setInView] = useState(false)
  const [patternOn, setPatternOn] = useState(false)
  const [overInteractive, setOverInteractive] = useState(false)
  const [finePointer, setFinePointer] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const year = new Date().getFullYear()

  useEffect(() => {
    const mqPointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setFinePointer(mqPointer.matches)
      setReduceMotion(mqMotion.matches)
    }
    sync()
    mqPointer.addEventListener('change', sync)
    mqMotion.addEventListener('change', sync)
    return () => {
      mqPointer.removeEventListener('change', sync)
      mqMotion.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { rootMargin: '60px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || !finePointer || reduceMotion) return
    const el = footerRef.current
    if (!el) return

    const tick = () => {
      const c = currentRef.current
      const t = targetRef.current
      c.x += (t.x - c.x) * 0.14
      c.y += (t.y - c.y) * 0.14
      el.style.setProperty('--mx', `${(c.x * 100).toFixed(2)}%`)
      el.style.setProperty('--my', `${(c.y * 100).toFixed(2)}%`)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height) return
      targetRef.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      }
      const target = e.target as Element | null
      const onControl = Boolean(
        target?.closest?.(
          'a, button, [role="button"], input, select, textarea, .watlys-footer-icon, .watlys-footer-link, .watlys-footer-legal-link, .watlys-footer-logo'
        )
      )
      setOverInteractive(onControl)
    }
    const onEnter = () => {
      setPatternOn(true)
      setOverInteractive(false)
    }
    const onLeave = () => {
      setPatternOn(false)
      setOverInteractive(false)
    }

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [inView, finePointer, reduceMotion])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const trackPattern = finePointer && !reduceMotion

  return (
    <>
      <footer
        id="footer"
        ref={footerRef}
        className={`watlys-footer ${patternOn && !overInteractive ? 'is-pattern-on' : ''} ${overInteractive ? 'is-over-interactive' : ''} ${trackPattern ? 'has-pointer-track' : 'is-static-pattern'}`}
        style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
      >
        {/* pattern-04 — light spotlight on empty footer; hidden on buttons/links */}
        <div className="watlys-footer-pattern" aria-hidden>
          <div className="watlys-footer-pattern-tile" />
        </div>

        <div className="watlys-footer-inner">
          <div className="watlys-footer-main">
            <div className="watlys-footer-brand">
              <div className="watlys-footer-brand-mark">
                <span className="watlys-footer-accent" aria-hidden />
                <Link href="/" aria-label="Watlys home" className="watlys-footer-logo">
                  <Image
                    src="/logo.webp"
                    alt="Watlys"
                    width={176}
                    height={50}
                    sizes="176px"
                    className="h-full w-full object-contain object-left dark:brightness-0 dark:invert"
                  />
                </Link>
              </div>
              <p className="watlys-footer-tagline">{t.footer.taglineShort}</p>
            </div>

            <nav aria-label="Footer" className="watlys-footer-links">
              {footerPrimaryLinks.map((link) => (
                <Link key={link.href} href={link.href} className="watlys-footer-link">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="watlys-footer-icons" role="group" aria-label="Contact">
              {footerContactIcons.map((item) => (
                <ContactIconButton key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="watlys-footer-bar">
            <p className="watlys-footer-copy">
              © {year} {t.footer?.rights ?? 'Watlys Pure Water Pakistan. All rights reserved.'}
            </p>
            <nav aria-label="Legal" className="watlys-footer-legal">
              {footerLegal.map((link) => (
                <Link key={link.href} href={link.href} className="watlys-footer-legal-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>

      {/* Fixed back-to-top — left of chat (16px+ gap), only after scroll */}
      <button
        type="button"
        onClick={scrollTop}
        aria-label={t.a11y.backToTop}
        className={`watlys-footer-top-fixed ${showTop ? 'is-visible' : ''}`}
      >
        <ChevronUp size={18} aria-hidden />
      </button>
    </>
  )
}
