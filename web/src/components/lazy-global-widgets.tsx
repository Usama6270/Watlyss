'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ChatWidget = dynamic(() => import('@/components/chat-widget').then((m) => m.ChatWidget), {
  ssr: false,
})
const AuthModal = dynamic(() => import('@/components/auth-modal'), { ssr: false })

/**
 * Auth modal after hydration; chat only after idle + short delay
 * so it never competes with LCP / hero frames.
 */
export default function LazyGlobalWidgets() {
  const [authReady, setAuthReady] = useState(false)
  const [chatReady, setChatReady] = useState(false)

  useEffect(() => {
    setAuthReady(true)

    let idleId: number | undefined
    let timer: ReturnType<typeof setTimeout> | undefined

    const enableChat = () => setChatReady(true)

    const onInteract = () => {
      enableChat()
      cleanup()
    }

    const cleanup = () => {
      window.removeEventListener('pointerdown', onInteract)
      window.removeEventListener('keydown', onInteract)
      window.removeEventListener('scroll', onInteract)
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }
      if (timer) clearTimeout(timer)
    }

    window.addEventListener('pointerdown', onInteract, { once: true, passive: true })
    window.addEventListener('keydown', onInteract, { once: true })
    window.addEventListener('scroll', onInteract, { once: true, passive: true })

    timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(enableChat, { timeout: 2500 })
      } else {
        enableChat()
      }
    }, 2500)

    return cleanup
  }, [])

  return (
    <>
      {authReady && <AuthModal />}
      {chatReady && <ChatWidget />}
    </>
  )
}
