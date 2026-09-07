/**
 * @jest-environment node
 */

import { getHeroPattern } from '@/common/helpers'
import { Pattern, Theme } from '@/common/types/configType'

describe('getHeroPattern', () => {
  describe('yyy pattern', () => {
    for (const theme of [Theme.light, Theme.dark]) {
      test(`returns backgroundImage and backgroundSize for ${theme}`, () => {
        const result = getHeroPattern(Pattern.yyy, theme)
        expect(result.backgroundImage).toBeTruthy()
        expect(result.backgroundSize).toBe('60px 96px')
        expect(result.backgroundRepeat).toBe('repeat')
      })
    }
  })
})
