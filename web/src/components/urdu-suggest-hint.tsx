'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/language'

/** Soft first-visit hint when browser language is Urdu — never auto-switches. */
export function UrduSuggestHint() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onSuggest = () => {
      if (language === 'en') setOpen(true)
    }
    window.addEventListener('watlys:suggest-urdu', onSuggest)
    return () => window.removeEventListener('watlys:suggest-urdu', onSuggest)
  }, [language])

  if (!open || language === 'ur') return null

  return (
    <div
      role="dialog"
      aria-label="Urdu language suggestion"
      className="fixed bottom-20 inset-inline-start-4 inset-inline-end-4 z-[90] mx-auto max-w-sm rounded-2xl border border-border bg-card p-4 shadow-lg sm:inset-inline-start-auto sm:inset-inline-end-6 sm:bottom-24"
    >
      <p className="font-urdu text-sm leading-relaxed text-foreground">
        کیا آپ ویب سائٹ اردو میں دیکھنا چاہیں گے؟
      </p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          className="btn-primary min-h-9 px-4 text-[11px]"
          onClick={() => {
            setLanguage('ur')
            setOpen(false)
          }}
        >
          <span className="font-urdu">ہاں، اردو</span>
        </button>
        <button
          type="button"
          className="min-h-9 rounded-lg border border-border px-4 text-[11px] font-medium text-muted-foreground hover:bg-muted"
          onClick={() => setOpen(false)}
        >
          Keep English
        </button>
      </div>
    </div>
  )
}
