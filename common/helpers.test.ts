import { getHeroPattern } from '@/common/helpers'
import { Pattern, Theme } from '@/common/types/configType'

describe('getHeroPattern', () => {
  test('returns a transparent background for transparent pattern', () => {
    expect(getHeroPattern(Pattern.transparent, Theme.light)).toStrictEqual({
      backgroundColor: '#fff',
    })
    expect(getHeroPattern(Pattern.transparent, Theme.dark)).toStrictEqual({
      backgroundColor: '#000',
    })
  })

  test('returns a themed solid background for solid pattern', () => {
    expect(getHeroPattern(Pattern.solid, Theme.light)).toStrictEqual({
      backgroundColor: '#fff',
    })
    expect(getHeroPattern(Pattern.solid, Theme.dark)).toStrictEqual({
      backgroundColor: '#000',
    })
  })
})
