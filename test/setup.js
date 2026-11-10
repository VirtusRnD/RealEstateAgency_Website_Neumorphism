import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(cleanup)

// jsdom lacks the browser APIs the motion and smooth-scroll libraries touch
window.matchMedia ??= (query) => ({
  matches: false, media: query, onchange: null,
  addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {},
  dispatchEvent() { return false },
})
class NoopObserver { observe() {} unobserve() {} disconnect() {} takeRecords() { return [] } }
window.IntersectionObserver ??= NoopObserver
window.ResizeObserver ??= NoopObserver
window.scrollTo = () => {} // jsdom ships a "not implemented" stub, so ??= would keep it
Element.prototype.scrollIntoView ??= function () {}
