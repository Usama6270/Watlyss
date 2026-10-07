'use client'

import dynamic from 'next/dynamic'
import DeferredMount from '@/components/deferred-mount'

const MapSection = dynamic(() => import('@/components/map-section'), {
  ssr: false,
  loading: () => <div className="min-h-[50vh]" aria-hidden />,
})

const IndustryBriefingSection = dynamic(
  () => import('@/components/industry-briefing-section'),
  {
    ssr: false,
    loading: () => <div className="min-h-[60vh]" aria-hidden />,
  }
)

/** Client-only below-fold homepage chunks (map + bubble universe). */
export default function HomeDeferredSections() {
  return (
    <>
      <DeferredMount minHeight={480} rootMargin="300px">
        <MapSection />
      </DeferredMount>
      <DeferredMount minHeight={560} rootMargin="400px">
        <IndustryBriefingSection />
      </DeferredMount>
    </>
  )
}
