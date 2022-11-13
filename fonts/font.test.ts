/**
 * @jest-environment node
 */

import { getFont } from '../common/renderCard'
import { Font } from '../common/types/configType'

describe('Verify Fonts', () => {
  it('Check that all fonts exist', async () => {
    for (const item in Font) {
      expect(
        (await getFont(Font[item as keyof typeof Font], 400, 'normal')).data
      ).toBeTruthy()
    }
  })
})
