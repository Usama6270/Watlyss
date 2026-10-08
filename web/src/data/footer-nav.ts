/** Single source of truth for site footer links & contact. */

export type FooterLink = { label: string; href: string }

export type FooterNavSection = {
  id: string
  title: string
  links: FooterLink[]
}

export const FOOTER_BRAND = {
  tagline: 'Pure by nature. Delivered with care.',
  description:
    'Premier 19L mineral drinking water — subscribed purity for homes and offices across Pakistan.',
  trustMarks: ['Lab-tested purity', 'ISO 22000 & HACCP'] as const,
}

export const FOOTER_NAV: FooterNavSection[] = [
  {
    id: 'explore',
    title: 'Explore',
    links: [
      { label: 'Our Water (19L)', href: '/our-water' },
      { label: 'How It Works', href: '/process' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'About Us', href: '/about' },
    ],
  },
  {
    id: 'services',
    title: 'Services',
    links: [
      { label: '19L Water Delivery', href: '/services/water-delivery' },
      { label: 'Free Bottle Installation', href: '/services/free-bottle-installation' },
      { label: 'Water Testing Assay', href: '/services/water-testing' },
      { label: 'Dispenser Service', href: '/services/dispenser-service' },
    ],
  },
  {
    id: 'locations',
    title: 'Locations & Contact',
    links: [
      { label: 'Contact Concierge', href: '/contact' },
      { label: 'Service Locations', href: '/locations' },
      { label: 'Corporate Inquiry', href: '/contact?type=corporate' },
    ],
  },
]

export const FOOTER_CONTACT = {
  whatsapp: {
    label: 'WhatsApp Concierge',
    value: '+92 300 1234567',
    href: 'https://wa.me/923001234567?text=Hi%20Watlys%20I%20want%20to%20order%20drinking%20water',
  },
  email: {
    label: 'Email Assistance',
    value: 'care@watlys.com',
    href: 'mailto:care@watlys.com',
  },
  regions: {
    label: 'Service Regions',
    value: 'Lahore · Islamabad · Karachi',
    href: '/locations',
  },
} as const

export const FOOTER_LEGAL: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Refund / Delivery Policy', href: '/terms-and-conditions#refund' },
]
