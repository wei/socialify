import {
  objectifySearchParamsString,
  resolveWebsiteTheme,
} from '@/src/components/configuration/configHelpers'

describe('objectifySearchParamsString', () => {
  it('converts a search params string into an object', () => {
    expect(objectifySearchParamsString('a=1&b=two')).toEqual({
      a: '1',
      b: 'two',
    })
  })

  it('returns an empty object for an empty string', () => {
    expect(objectifySearchParamsString('')).toEqual({})
  })
})

describe('resolveWebsiteTheme', () => {
  it.each(['light', 'dark', 'auto'] as const)(
    'accepts the "%s" theme',
    (theme) => {
      expect(resolveWebsiteTheme(theme)).toBe(theme)
    }
  )

  it('returns null for a missing value', () => {
    expect(resolveWebsiteTheme(null)).toBeNull()
    expect(resolveWebsiteTheme(undefined)).toBeNull()
    expect(resolveWebsiteTheme('')).toBeNull()
  })

  it('returns null for unsupported values', () => {
    expect(resolveWebsiteTheme('invalid')).toBeNull()
  })

  it('does not match the capitalized image theme values', () => {
    expect(resolveWebsiteTheme('Light')).toBeNull()
    expect(resolveWebsiteTheme('Dark')).toBeNull()
    expect(resolveWebsiteTheme('Auto')).toBeNull()
  })
})
