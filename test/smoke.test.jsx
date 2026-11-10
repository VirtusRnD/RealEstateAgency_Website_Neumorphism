import { expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import i18n from '../src/i18n.js'
import en from '../src/locales/en/translation.json'
import App from '../src/App.jsx'

const ROUTES = ["/"]
const renderAt = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
i18n.changeLanguage('en')

test.each(ROUTES)('renders %s', (path) => {
  const { container } = renderAt(path)
  expect(container.querySelector('h1, h2, h3')?.textContent).toBeTruthy()
})

test('the contact form reports success only after the endpoint accepted it', async () => {
  vi.stubEnv('VITE_FORM_ENDPOINT', 'https://forms.example/f/1')
  const fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })
  vi.stubGlobal('fetch', fetch)
  const { container } = renderAt("/")
  const form = container.querySelector('#contact form')
  fireEvent.change(form.querySelector('[name=name]'), { target: { value: 'Ada' } })
  fireEvent.change(form.querySelector('[name=email]'), { target: { value: 'ada@example.com' } })
  fireEvent.change(form.querySelector('[name=message]'), { target: { value: 'Hello' } })
  fireEvent.submit(form)
  expect(await screen.findByRole('alert')).toBeTruthy()
  expect(screen.queryByText(en.contact.successMessage, { exact: false })).toBeNull()
  fetch.mockResolvedValue({ ok: true })
  fireEvent.submit(form)
  expect(await screen.findByText(en.contact.successMessage, { exact: false })).toBeTruthy()
  expect(fetch).toHaveBeenLastCalledWith('https://forms.example/f/1', expect.objectContaining({ method: 'POST' }))
})
