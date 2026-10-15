import en from '@/messages/en.json'
import ur from '@/messages/ur.json'

export type Locale = 'en' | 'ur'
export type Messages = typeof en

export const LOCALES: Locale[] = ['en', 'ur']
export const DEFAULT_LOCALE: Locale = 'en'
export const LANG_STORAGE_KEY = 'watlys_lang'
export const LANG_COOKIE_KEY = 'watlys_lang'

export const messagesByLocale: Record<Locale, Messages> = {
  en,
  ur: ur as Messages,
}

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'ur'
}

export function getMessages(locale: Locale): Messages {
  return messagesByLocale[locale] ?? messagesByLocale.en
}

/** Simple `{name}` interpolation for ICU-lite message strings. */
export function formatMessage(
  template: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined && vars[key] !== null ? String(vars[key]) : `{${key}}`
  )
}

export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale === 'ur' ? 'ur-PK' : 'en-PK', options).format(value)
}

export function formatCurrency(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'ur' ? 'ur-PK' : 'en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(value: Date | string | number, locale: Locale): string {
  const date = value instanceof Date ? value : new Date(value)
  return new Intl.DateTimeFormat(locale === 'ur' ? 'ur-PK' : 'en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/** Cookie + localStorage write for persistence across SSR and client. */
export function persistLocale(locale: Locale) {
  if (typeof document === 'undefined') return
  try {
    localStorage.setItem(LANG_STORAGE_KEY, locale)
    document.cookie = `${LANG_COOKIE_KEY}=${locale};path=/;max-age=31536000;SameSite=Lax`
  } catch {
    /* ignore */
  }
}

export function readStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  try {
    const fromStorage = localStorage.getItem(LANG_STORAGE_KEY)
    if (isLocale(fromStorage)) return fromStorage
    const match = document.cookie.match(/(?:^|; )watlys_lang=(en|ur)(?:;|$)/)
    if (match && isLocale(match[1])) return match[1]
  } catch {
    /* ignore */
  }
  return null
}

export function applyDocumentLocale(locale: Locale) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.lang = locale
  root.dir = locale === 'ur' ? 'rtl' : 'ltr'
  root.classList.toggle('font-urdu', locale === 'ur')
  root.dataset.locale = locale
}
