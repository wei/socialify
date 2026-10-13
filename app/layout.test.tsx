import { render } from '@testing-library/react'

import RootLayout from '@/app/layout'

// GoogleTagManager calls performance.mark in a useEffect, which jsdom does not
// implement; it is irrelevant to the color scheme under test.
jest.mock('@next/third-parties/google', () => ({
  GoogleTagManager: () => null,
}))

test('RootLayout follows the device color scheme', () => {
  render(
    <RootLayout>
      <div>child</div>
    </RootLayout>
  )

  // React hoists <html>/<body>, so read them from the document.
  expect(document.documentElement.style.colorScheme).toBe('light dark')

  const scripts = Array.from(document.querySelectorAll('script'))
  const themeScript = scripts.find((s) =>
    s.textContent?.includes('prefers-color-scheme: dark')
  )
  expect(themeScript?.textContent).toContain('data-theme')
})
