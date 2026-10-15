import { defineField } from 'sanity'

/**
 * STUB — not wired into any schema yet.
 *
 * Factory for a `{ en, ur }` locale-object string field, matching the
 * `LocaleField` shape consumed by `pickLocale()` on the frontend
 * (see watlys/web/src/lib/sanity-locale.ts and
 * watlys/web/src/sanity/localeFields.ts for the migration checklist).
 *
 * Usage once wired into a document schema (e.g. product.ts):
 *
 *   localeString({ name: 'title', title: 'Title', required: true })
 *
 * Sanity-best-practice note: for only two locales (en/ur) a plain
 * `{ en, ur }` object is simple and keeps authoring in one place. If this
 * project grows beyond a couple of locales, prefer
 * `sanity-plugin-internationalized-array` instead — nested locale objects
 * don't scale well past a handful of languages (see the "Field-Level
 * Localization" section of the Sanity localization guide).
 */
export function localeString(options: {
  name: string
  title?: string
  description?: string
  required?: boolean
  hidden?: boolean
  readOnly?: boolean
}) {
  return defineField({
    name: options.name,
    title: options.title,
    description: options.description,
    hidden: options.hidden,
    readOnly: options.readOnly,
    type: 'object',
    fieldsets: [{ name: 'locales', title: 'Locales', options: { columns: 2 } }],
    fields: [
      defineField({
        name: 'en',
        title: 'English',
        type: 'string',
        fieldset: 'locales',
        validation: options.required ? (Rule) => Rule.required() : undefined,
      }),
      defineField({
        name: 'ur',
        title: 'اردو (Urdu)',
        type: 'string',
        fieldset: 'locales',
      }),
    ],
    preview: {
      select: { en: 'en', ur: 'ur' },
      prepare({ en, ur }: { en?: string; ur?: string }) {
        return { title: en || ur || '(empty)', subtitle: ur ? `UR: ${ur}` : undefined }
      },
    },
  })
}
