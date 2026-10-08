import React from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'

export default function FAQPage() {
  const faqs = [
    {
      q: 'What is the pH level of Watlys water?',
      a: 'Watlys Classic boasts an optimal pH balance of 7.8, while our Active/Sport variants are naturally alkaline at 8.2 to aid recovery and restore hydration.',
    },
    {
      q: 'Why does Watlys use glass containers?',
      a: 'Glass preserves the pristine, natural taste of spring water without risk of chemical leaching, microplastic contamination, or off-taste. It is also 100% infinitely recyclable.',
    },
    {
      q: 'Where do you deliver?',
      a: 'We currently deliver to the United States, Pakistan, United Kingdom, and Canada. Standard shipping is completely free for all premium collection orders.',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-16 py-16 flex-1 w-full space-y-12">
        <div className="space-y-4 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold">Inquiries</span>
          <h1 className="page-title font-medium text-[#111827] dark:text-foreground">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Everything you need to know about the premium hydration standard.</p>
        </div>

        <div className="space-y-6 pt-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 bg-card border border-border rounded-2xl space-y-2 shadow-sm">
              <h3 className="font-bold text-zinc-950 dark:text-foreground text-lg">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
