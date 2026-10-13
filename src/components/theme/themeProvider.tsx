'use client'

import { useSearchParams } from 'next/navigation'
import { JSX, useEffect } from 'react'

import { resolveWebsiteTheme } from '@/src/components/configuration/configHelpers'

/** Attribute daisyUI reads to select the active theme. */
export const WEBSITE_THEME_ATTRIBUTE = 'data-theme'

const DARK_THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)'

/**
 * Applies the website theme requested through the `?theme` query parameter.
 *
 * - `light` / `dark` force that theme.
 * - `auto` follows the device color scheme.
 * - no (or an invalid) parameter removes the override, preserving the
 *   existing default theme.
 */
export default function ThemeProvider(): JSX.Element | null {
  const searchParams = useSearchParams()
  const theme = resolveWebsiteTheme(searchParams.get('theme'))

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'light' || theme === 'dark') {
      root.setAttribute(WEBSITE_THEME_ATTRIBUTE, theme)
      return () => root.removeAttribute(WEBSITE_THEME_ATTRIBUTE)
    }

    if (theme === 'auto') {
      const mediaQuery = window.matchMedia(DARK_THEME_MEDIA_QUERY)
      const applyDeviceTheme = (prefersDark: boolean): void => {
        root.setAttribute(
          WEBSITE_THEME_ATTRIBUTE,
          prefersDark ? 'dark' : 'light'
        )
      }
      const handleMediaQueryChange = (event: MediaQueryListEvent): void =>
        applyDeviceTheme(event.matches)

      applyDeviceTheme(mediaQuery.matches)
      mediaQuery.addEventListener('change', handleMediaQueryChange)
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange)
        root.removeAttribute(WEBSITE_THEME_ATTRIBUTE)
      }
    }

    root.removeAttribute(WEBSITE_THEME_ATTRIBUTE)
  }, [theme])

  return null
}
