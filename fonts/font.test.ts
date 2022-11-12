/**
 * @jest-environment node
 */

import { getFont } from '../common/renderCard'
import { Font } from '../common/types/configType'

describe('Verify Fonts', () => {
  it('Check that all fonts exist', () => {
    for (const item in Font) {
      expect(
        getFont(Font[item as keyof typeof Font], 400, 'normal').data
      ).toBeTruthy()
    }
  })
})
