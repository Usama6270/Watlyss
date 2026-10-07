import dynamic from 'next/dynamic'
import Navbar from '@/components/navbar'
import HeroScrollCanvas from '@/components/HeroScrollCanvas'
import PackagesSection from '@/components/packages-section'
import HomeDeferredSections from '@/components/home-deferred-sections'

const ProcessSection = dynamic(() => import('@/components/process-section'), {
  loading: () => <div className="min-h-[40vh]" aria-hidden />,
})
const WhyWatlysSection = dynamic(() => import('@/components/why-watlys-section'), {
  loading: () => <div className="min-h-[40vh]" aria-hidden />,
})
const CertificationsSection = dynamic(() => import('@/components/certifications-section'), {
  loading: () => <div className="min-h-[30vh]" aria-hidden />,
})
const FinalCtaSection = dynamic(() => import('@/components/final-cta-section'), {
  loading: () => <div className="min-h-[30vh]" aria-hidden />,
})
const FooterSection = dynamic(() => import('@/components/footer-section'), {
  loading: () => <div className="min-h-[40vh]" aria-hidden />,
})

export default function Home() {
  return (
    <main className="page-atmosphere w-full min-h-screen overflow-x-clip overflow-y-visible bg-background text-foreground transition-colors duration-300 font-sans">
      <Navbar />
      <HeroScrollCanvas />
      <PackagesSection />
      <ProcessSection />
      <WhyWatlysSection />
      <CertificationsSection />
      <FinalCtaSection />
      <HomeDeferredSections />
      <FooterSection />
    </main>
  )
}
