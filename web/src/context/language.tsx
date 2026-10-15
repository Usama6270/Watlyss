'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react'
import {
  applyDocumentLocale,
  DEFAULT_LOCALE,
  formatCurrency,
  formatDate,
  formatMessage,
  formatNumber,
  getMessages,
  isLocale,
  type Locale,
  type Messages,
  persistLocale,
  readStoredLocale,
} from '@/lib/i18n'

export type { Locale, Messages }
/** @deprecated Use Messages — kept for gradual migration */
export type TranslationDict = Messages & {
  /** Legacy alias used by navbar WhatsApp CTA */
  whatsapp: string
}

type LanguageContextType = {
  language: Locale
  setLanguage: (lang: Locale) => void
  t: TranslationDict
  isRtl: boolean
  formatMessage: typeof formatMessage
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string
  formatCurrency: (value: number) => string
  formatDate: (value: Date | string | number) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

function withLegacyAliases(messages: Messages): TranslationDict {
  return {
    ...messages,
    whatsapp: messages.nav.whatsapp,
  }
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: React.ReactNode
  /** From cookie on the server — keeps SSR + hydration in sync */
  initialLocale?: Locale
}) {
  const [language, setLanguageState] = useState<Locale>(
    isLocale(initialLocale) ? initialLocale : DEFAULT_LOCALE
  )
  const [, startTransition] = useTransition()

  useEffect(() => {
    const stored = readStoredLocale()
    const active = stored ?? initialLocale ?? DEFAULT_LOCALE
    applyDocumentLocale(active)
    persistLocale(active)
    if (active !== language) {
      startTransition(() => setLanguageState(active))
    }
    try {
      if (
        !stored &&
        typeof navigator !== 'undefined' &&
        /^ur\b/i.test(navigator.language) &&
        !sessionStorage.getItem('watlys_ur_hint')
      ) {
        sessionStorage.setItem('watlys_ur_hint', '1')
        window.dispatchEvent(new CustomEvent('watlys:suggest-urdu'))
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount sync only
  }, [])

  const setLanguage = useCallback((lang: Locale) => {
    startTransition(() => {
      setLanguageState(lang)
      persistLocale(lang)
      applyDocumentLocale(lang)
    })
  }, [])

  const t = useMemo(() => withLegacyAliases(getMessages(language)), [language])
  const isRtl = language === 'ur'

  const value = useMemo<LanguageContextType>(
    () => ({
      language,
      setLanguage,
      t,
      isRtl,
      formatMessage,
      formatNumber: (value, options) => formatNumber(value, language, options),
      formatCurrency: (value) => formatCurrency(value, language),
      formatDate: (value) => formatDate(value, language),
    }),
    [language, setLanguage, t, isRtl]
  )

  return (
    <LanguageContext.Provider value={value}>
      <div
        className={isRtl ? 'font-urdu' : undefined}
        lang={language}
        dir={isRtl ? 'rtl' : 'ltr'}
        suppressHydrationWarning
      >
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
