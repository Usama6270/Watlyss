'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/context/language'

/** Keeps document title / meta description in sync with active locale. */
export function DocumentMeta() {
  const { t, language } = useLanguage()

  useEffect(() => {
    document.title = t.meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', t.meta.description)
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', t.meta.ogTitle)
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', t.meta.ogDescription)
    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) {
      ogLocale.setAttribute('content', language === 'ur' ? 'ur_PK' : 'en_PK')
    }
  }, [t, language])

  return null
}
