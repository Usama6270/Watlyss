'use client'

import dynamic from 'next/dynamic'
import DeferredMount from '@/components/deferred-mount'

const MapSection = dynamic(() => import('@/components/map-section'), {
  ssr: false,
  loading: () => <div className="min-h-[50vh]" aria-hidden />,
})

const CertificationsSection = dynamic(
  () => import('@/components/certifications-section'),
  {
    loading: () => <div className="min-h-[30vh]" aria-hidden />,
  }
)

const IndustryBriefingSection = dynamic(
  () => import('@/components/industry-briefing-section'),
  {
    ssr: false,
    loading: () => <div className="min-h-[60vh]" aria-hidden />,
  }
)

/** Below-fold: map → certifications (just above newsletter) → bubble universe. */
export default function HomeDeferredSections() {
  return (
    <>
      <DeferredMount minHeight={360} rootMargin="300px">
        <MapSection />
      </DeferredMount>
      <DeferredMount minHeight={280} rootMargin="280px">
        <CertificationsSection />
      </DeferredMount>
      <DeferredMount minHeight={480} rootMargin="400px">
        <IndustryBriefingSection />
      </DeferredMount>
    </>
  )
}
