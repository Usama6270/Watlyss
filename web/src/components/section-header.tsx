'use client'

import { motion, useReducedMotion } from 'framer-motion'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  lead?: string
  align?: 'center' | 'start'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  titleClassName?: string
}

const EASE = [0.16, 1, 0.3, 1] as const

/** Shared homepage / site section heading stack with once scroll-reveal. */
export default function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'center',
  as = 'h2',
  className = '',
  titleClassName = '',
}: SectionHeaderProps) {
  const reduceMotion = useReducedMotion()
  const TitleTag = as

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`section-header section-header--${align} ${className}`}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <TitleTag className={`section-title ${titleClassName}`}>{title}</TitleTag>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </motion.header>
  )
}
