'use client'

import React from 'react'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  lead?: string
  align?: 'center' | 'left'
  className?: string
}

/** Shared editorial section header — one hierarchy across the site. */
export default function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-2.5 sm:gap-3 mb-8 sm:mb-10 ${alignClass} ${className}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title max-w-2xl">{title}</h2>
      {lead ? <p className={`section-lead ${align === 'center' ? 'mx-auto' : ''}`}>{lead}</p> : null}
    </div>
  )
}
