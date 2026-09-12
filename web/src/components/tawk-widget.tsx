'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function TawkWidget() {
  useEffect(() => {
    // Intercept and prevent non-fatal third-party Tawk.to script errors from triggering Next.js error overlays
    const handleWindowError = (event: ErrorEvent) => {
      if (
        event?.message?.includes('Tawk') ||
        event?.message?.includes('i18next') ||
        (event?.filename && event.filename.includes('tawk.to'))
      ) {
        event.stopImmediatePropagation()
        event.preventDefault()
        return true
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event?.reason?.toString() || ''
      if (reason.includes('Tawk') || reason.includes('i18next')) {
        event.stopImmediatePropagation()
        event.preventDefault()
        return true
      }
    }

    window.addEventListener('error', handleWindowError, true)
    window.addEventListener('unhandledrejection', handleUnhandledRejection, true)

    return () => {
      window.removeEventListener('error', handleWindowError, true)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true)
    }
  }, [])

  return (
    <Script id="tawk-to" strategy="lazyOnload">
      {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/6aa06c225914873442c8ff55/1k21acq8d';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
        })();
      `}
    </Script>
  )
}
