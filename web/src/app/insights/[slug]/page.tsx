'use client'

import React, { use } from 'react'
import Navbar from '@/components/navbar'
import FooterSection from '@/components/footer-section'
import Link from 'next/link'
import { ARTICLES_DATA, Article } from '../page'
import { ArrowLeft, BookOpen, Clock, User, Share2 } from 'lucide-react'

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const article: Article = ARTICLES_DATA.find((a) => a.slug === slug) || ARTICLES_DATA[0]

  const relatedArticles = ARTICLES_DATA.filter((a) => a.slug !== article.slug).slice(0, 2)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-24 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-12 space-y-12">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/insights" className="hover:underline">Knowledge Series</Link>
          <span>/</span>
          <span className="text-zinc-400 truncate max-w-[200px]">{article.title}</span>
        </div>

        {/* Header Block */}
        <div className="space-y-6 border-b border-zinc-200/50 dark:border-slate-800/60 pb-8">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            {article.categoryLabel}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light text-foreground leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-light">
            <span className="flex items-center space-x-1.5"><User size={14} className="text-primary" /><span>{article.author}</span></span>
            <span className="flex items-center space-x-1.5"><Clock size={14} className="text-primary" /><span>{article.readTime}</span></span>
            <span>Published {article.date}</span>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="p-6 bg-background dark:bg-card border-l-4 border-primary rounded-r-xl text-sm font-light text-zinc-600 dark:text-slate-200 italic leading-relaxed">
          "{article.excerpt}"
        </div>

        {/* Article Body Content */}
        <article className="prose dark:prose-invert max-w-none text-sm sm:text-base font-light text-foreground leading-relaxed space-y-6">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl font-serif font-light text-foreground pt-4">
                  {paragraph.replace('### ', '')}
                </h3>
              )
            }
            return <p key={idx}>{paragraph}</p>
          })}
        </article>

        {/* Back & Related Articles */}
        <div className="pt-12 border-t border-zinc-200/50 dark:border-slate-800/60 space-y-8">
          <Link
            href="/insights"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-primary-hover"
          >
            <ArrowLeft size={14} />
            <span>Back to All Articles</span>
          </Link>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-serif font-light text-foreground">Related Research Papers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/insights/${rel.slug}`}
                  className="p-6 bg-card border border-border rounded-xl block hover:border-primary transition-colors"
                >
                  <span className="text-[9px] font-bold text-primary uppercase tracking-wider block mb-1">{rel.categoryLabel}</span>
                  <h4 className="text-sm font-serif font-light text-foreground">{rel.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
