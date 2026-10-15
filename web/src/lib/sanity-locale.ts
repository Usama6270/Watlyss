/**
 * Helpers for reading locale-aware string fields coming out of Sanity.
 *
 * Sanity documents in this project currently store most text fields as a
 * plain `string` (English only — see src/sanity/localeFields.ts for the
 * full inventory of which document types still need this). Where a field
 * HAS been upgraded to a locale object, it looks like:
 *
 *   { "en": "Student & Hostel Plan", "ur": "سٹوڈنٹ و ہاسٹل پلان" }
 *
 * `pickLocale` understands both shapes so call sites can adopt localized
 * Sanity content incrementally without breaking existing plain-string data.
 */

export type LocaleField = { en?: string; ur?: string } | string | null | undefined

/**
 * Resolves a Sanity locale field to a plain string for the active locale.
 *
 * - If `field` is a plain string, it is returned as-is (legacy/English-only
 *   content — there is nothing to switch on).
 * - If `field` is a `{ en, ur }` object, returns `field[locale]`, falling
 *   back to `field.en`, then to an empty string.
 * - If the requested locale's value is missing, `fallbackLogKey` (when
 *   provided) is logged once via `console.warn` so missing Urdu copy in
 *   Sanity is easy to spot during QA, without throwing in production.
 */
export function pickLocale(
  field: LocaleField,
  locale: 'en' | 'ur',
  fallbackLogKey?: string
): string {
  if (field == null) return ''

  if (typeof field === 'string') return field

  const value = field[locale]
  if (value) return value

  const fallback = field.en ?? ''
  if (!value && fallbackLogKey && typeof console !== 'undefined') {
    console.warn(
      `[sanity-locale] Missing "${locale}" value for "${fallbackLogKey}" — falling back to "en".`
    )
  }
  return fallback
}
