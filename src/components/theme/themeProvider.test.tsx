import { act, render } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'

import ThemeProvider, {
  WEBSITE_THEME_ATTRIBUTE,
} from '@/src/components/theme/themeProvider'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}))

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>

const mockThemeParam = (value: string | null): void => {
  mockUseSearchParams.mockReturnValue({
    get: (key: string) => (key === 'theme' ? value : null),
  } as unknown as ReturnType<typeof useSearchParams>)
}

type MediaQueryListener = (event: MediaQueryListEvent) => void

let mediaQueryListeners: MediaQueryListener[] = []
let prefersDark = false

const setupMatchMedia = (): void => {
  mediaQueryListeners = []
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: prefersDark,
    addEventListener: (_event: string, listener: MediaQueryListener) => {
      mediaQueryListeners.push(listener)
    },
    removeEventListener: (_event: string, listener: MediaQueryListener) => {
      mediaQueryListeners = mediaQueryListeners.filter(
        (registered) => registered !== listener
      )
    },
  })) as unknown as typeof window.matchMedia
}

const currentTheme = (): string | null =>
  document.documentElement.getAttribute(WEBSITE_THEME_ATTRIBUTE)

beforeEach(() => {
  jest.clearAllMocks()
  document.documentElement.removeAttribute(WEBSITE_THEME_ATTRIBUTE)
  prefersDark = false
  setupMatchMedia()
})

describe('ThemeProvider', () => {
  it('forces the light theme when theme=light', () => {
    mockThemeParam('light')

    render(<ThemeProvider />)

    expect(currentTheme()).toBe('light')
  })

  it('forces the dark theme when theme=dark', () => {
    mockThemeParam('dark')

    render(<ThemeProvider />)

    expect(currentTheme()).toBe('dark')
  })

  it('keeps the default theme when no parameter is provided', () => {
    document.documentElement.setAttribute(WEBSITE_THEME_ATTRIBUTE, 'dark')
    mockThemeParam(null)

    render(<ThemeProvider />)

    expect(currentTheme()).toBeNull()
  })

  it('ignores unsupported values', () => {
    document.documentElement.setAttribute(WEBSITE_THEME_ATTRIBUTE, 'dark')
    mockThemeParam('Light')

    render(<ThemeProvider />)

    expect(currentTheme()).toBeNull()
  })

  it('follows the device dark preference when theme=auto', () => {
    prefersDark = true
    setupMatchMedia()
    mockThemeParam('auto')

    render(<ThemeProvider />)

    expect(currentTheme()).toBe('dark')
  })

  it('follows the device light preference when theme=auto', () => {
    prefersDark = false
    setupMatchMedia()
    mockThemeParam('auto')

    render(<ThemeProvider />)

    expect(currentTheme()).toBe('light')
  })

  it('reacts to device color scheme changes when theme=auto', () => {
    mockThemeParam('auto')

    render(<ThemeProvider />)

    expect(currentTheme()).toBe('light')

    act(() => {
      for (const listener of mediaQueryListeners) {
        listener({ matches: true } as MediaQueryListEvent)
      }
    })

    expect(currentTheme()).toBe('dark')
  })

  it('removes the override on unmount', () => {
    mockThemeParam('light')

    const { unmount } = render(<ThemeProvider />)

    expect(currentTheme()).toBe('light')

    unmount()

    expect(currentTheme()).toBeNull()
  })
})
