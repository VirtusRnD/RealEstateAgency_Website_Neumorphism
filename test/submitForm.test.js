import { afterEach, expect, test, vi } from 'vitest'
import { submitForm } from '../src/lib/submitForm.js'

afterEach(() => vi.unstubAllEnvs())

test('posts JSON to VITE_FORM_ENDPOINT and fails loudly when the endpoint does', async () => {
  vi.stubEnv('VITE_FORM_ENDPOINT', 'https://forms.example/f/1')
  const fetch = vi.fn().mockResolvedValue({ ok: true })
  vi.stubGlobal('fetch', fetch)
  await expect(submitForm({ name: 'Ada' })).resolves.toBe('sent')
  expect(fetch).toHaveBeenCalledWith('https://forms.example/f/1', expect.objectContaining({ method: 'POST', body: '{"name":"Ada"}' }))
  fetch.mockResolvedValue({ ok: false, status: 500 })
  await expect(submitForm({ name: 'Ada' })).rejects.toThrow('500')
})

test('without an endpoint it opens the mail app, and refuses when there is no address either', async () => {
  vi.stubEnv('VITE_FORM_ENDPOINT', '')
  vi.spyOn(console, 'error').mockImplementation(() => {}) // jsdom logs "navigation not implemented"
  await expect(submitForm({ name: 'Ada' }, { email: 'hi@example.com' })).resolves.toBe('mailto')
  await expect(submitForm({ name: 'Ada' })).rejects.toThrow()
})
