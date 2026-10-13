export function objectifySearchParamsString(
  searchParamsString: string
): Record<string, string> {
  const params = new URLSearchParams(searchParamsString)
  const obj: Record<string, string> = {}
  for (const [key, value] of params.entries()) {
    obj[key] = value
  }
  return obj
}

/**
 * Website theme values accepted via the `?theme` query parameter.
 *
 * These are intentionally lowercase so they do not collide with the
 * capitalized image theme values (`Light`, `Dark`, `Auto`) that are also
 * carried in the `theme` query parameter on repository pages.
 */
export const WEBSITE_THEMES = ['light', 'dark', 'auto'] as const

export type WebsiteTheme = (typeof WEBSITE_THEMES)[number]

/**
 * Resolves a raw `?theme` query parameter value into a supported website
 * theme. Unknown or missing values return `null` so callers can fall back
 * to the default behavior.
 */
export function resolveWebsiteTheme(
  value: string | null | undefined
): WebsiteTheme | null {
  for (const theme of WEBSITE_THEMES) {
    if (theme === value) {
      return theme
    }
  }
  return null
}
