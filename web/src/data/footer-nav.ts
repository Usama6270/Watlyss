import type { Messages } from '@/lib/i18n'

/** Single source of truth for the compact site footer. */

export type FooterLink = { label: string; href: string }

export type FooterContactIcon = {
  id: string
  label: string
  value: string
  href: string
  external?: boolean
}

/** Base WhatsApp concierge number used for the contact icon + prefill link. */
export const FOOTER_WHATSAPP_NUMBER = '923001234567'

/**
 * Builds the footer's compact primary nav from `t.nav` / `t.footer` (see
 * src/messages/en.json) — hrefs stay fixed in source, only labels localize.
 */
export function getFooterPrimaryLinks(t: Messages): FooterLink[] {
  return [
    { label: t.nav.ourWater, href: '/our-water' },
    { label: t.nav.process, href: '/process' },
    { label: t.footer.company.links.sustainability, href: '/sustainability' },
    { label: t.nav.about, href: '/about' },
    { label: t.footer.support.links.locations, href: '/locations' },
  ]
}

/**
 * Builds localized footer contact icons. WhatsApp prefill text switches to
 * Urdu when `isRtl` is true (see footer.whatsappPrefill in ur.json).
 */
export function getFooterContactIcons(t: Messages, isRtl: boolean): FooterContactIcon[] {
  const waText = isRtl ? t.footer.whatsappPrefill : 'Hi Watlys, I want to order drinking water'
  return [
    {
      id: 'whatsapp',
      label: t.footer.contact.whatsappLabel,
      value: '+92 300 1234567',
      href: `https://wa.me/${FOOTER_WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`,
      external: true,
    },
    {
      id: 'email',
      label: t.footer.contact.emailLabel,
      value: 'care@watlys.com',
      href: 'mailto:care@watlys.com',
    },
    {
      id: 'phone',
      label: t.common.call,
      value: '+92 300 1234567',
      href: 'tel:+923001234567',
    },
    {
      id: 'locations',
      label: t.footer.contact.regionsLabel,
      value: t.footer.contact.regions,
      href: '/locations',
    },
  ]
}

export function getFooterLegal(t: Messages): FooterLink[] {
  return [
    { label: t.footer.legal.privacy, href: '/privacy-policy' },
    { label: t.footer.legal.terms, href: '/terms-and-conditions' },
    { label: t.footer.legal.refund, href: '/terms-and-conditions#refund' },
  ]
}
