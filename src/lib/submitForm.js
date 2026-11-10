/**
 * Sends a form somewhere real.
 *
 * Set VITE_FORM_ENDPOINT (in .env) to any URL that accepts a JSON POST: your own API,
 * Formspree, Netlify Forms, a Google Apps Script... Without it the visitor's mail app
 * opens with the message prefilled and addressed to `email`, so a submission is never
 * silently dropped. Resolves to 'sent' or 'mailto'; throws when nothing could be sent.
 */
export async function submitForm(values, { email, subject = 'Website form' } = {}) {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    })
    if (!res.ok) throw new Error(`Form endpoint answered ${res.status}`)
    return 'sent'
  }
  if (!email) throw new Error('Set VITE_FORM_ENDPOINT or a contact email')
  const body = Object.entries(values)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return 'mailto'
}
