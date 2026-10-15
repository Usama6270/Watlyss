/**
 * Inventory of Sanity document types / fields that are currently plain
 * `string`/`text` (English-only) but render on customer-facing pages that
 * are otherwise fully localized via `useLanguage()` (see src/messages/*.json).
 *
 * This file is documentation + a typed manifest — it does not change any
 * schema by itself. Use it as the checklist when migrating a field to the
 * `{ en, ur }` locale-object shape (see `localeString` in
 * watlys/studio/schemaTypes/localeString.ts) and when reading that content
 * on the frontend via `pickLocale()` (see src/lib/sanity-locale.ts).
 *
 * Migration order of priority: product → category → banner → testimonial →
 * blogPost (body is Portable Text and needs a different, block-level i18n
 * strategy — out of scope for the `localeString` factory below).
 */

export type LocaleFieldEntry = {
  /** Sanity schema type name (watlys/studio/schemaTypes/*.ts). */
  schemaType: string
  /** Field path within the document. */
  field: string
  /** Current Sanity field `type` (before migration). */
  currentType: 'string' | 'text'
  /** Where this field is rendered on the Next.js frontend. */
  renderedIn: string
  notes?: string
}

export const SANITY_LOCALE_FIELDS: LocaleFieldEntry[] = [
  {
    schemaType: 'product',
    field: 'title',
    currentType: 'string',
    renderedIn: 'src/app/shop/page.tsx, src/app/product/[slug]/page.tsx, src/components/product-card.tsx',
    notes: 'Primary product name — highest-traffic untranslated field.',
  },
  {
    schemaType: 'product',
    field: 'description',
    currentType: 'text',
    renderedIn: 'src/app/product/[slug]/page.tsx',
  },
  {
    schemaType: 'product',
    field: 'idealUse',
    currentType: 'string',
    renderedIn: 'src/app/product/[slug]/page.tsx',
    notes: 'Currently a fixed options list (`daily`/`sports`/`kids`) — map value → i18n key on the frontend instead of migrating to localeString.',
  },
  {
    schemaType: 'category',
    field: 'title',
    currentType: 'string',
    renderedIn: 'src/app/shop/page.tsx (category filters)',
  },
  {
    schemaType: 'category',
    field: 'description',
    currentType: 'text',
    renderedIn: 'src/app/shop/page.tsx',
  },
  {
    schemaType: 'banner',
    field: 'title',
    currentType: 'string',
    renderedIn: 'src/components/hero-carousel.tsx',
  },
  {
    schemaType: 'banner',
    field: 'subtitle',
    currentType: 'string',
    renderedIn: 'src/components/hero-carousel.tsx',
  },
  {
    schemaType: 'banner',
    field: 'buttonText',
    currentType: 'string',
    renderedIn: 'src/components/hero-carousel.tsx',
  },
  {
    schemaType: 'testimonial',
    field: 'quote',
    currentType: 'text',
    renderedIn: 'src/components/trust-section.tsx',
  },
  {
    schemaType: 'testimonial',
    field: 'role',
    currentType: 'string',
    renderedIn: 'src/components/trust-section.tsx',
  },
  {
    schemaType: 'blogPost',
    field: 'title',
    currentType: 'string',
    renderedIn: 'src/app/insights/page.tsx, src/app/insights/[slug]/page.tsx',
  },
  {
    schemaType: 'blogPost',
    field: 'excerpt',
    currentType: 'text',
    renderedIn: 'src/app/insights/page.tsx',
  },
  {
    schemaType: 'blogPost',
    field: 'body',
    currentType: 'text',
    renderedIn: 'src/app/insights/[slug]/page.tsx',
    notes: 'Portable Text array, not a plain string — needs a dedicated localized Portable Text strategy, not the `localeString` factory.',
  },
]
