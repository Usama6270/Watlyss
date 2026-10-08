/** Shared newsletter subscribe — one source of truth for footer & bubble universe. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim())
}

/**
 * Subscribe flow used by the footer form and the Newsletter Universe modal.
 * Client-side validation + brief loading delay; extend here when a backend route lands.
 */
export async function subscribeToNewsletter(
  email: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const trimmed = email.trim()
  if (!trimmed) return { ok: false, error: 'Please enter your email.' }
  if (!isValidEmail(trimmed)) return { ok: false, error: 'Enter a valid email address.' }

  await new Promise((r) => setTimeout(r, 700))
  return { ok: true }
}
