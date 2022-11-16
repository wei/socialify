/**
 * @jest-environment node
 */

import { SatoriOptions } from 'satori'
import { getFont } from './renderCard'
import { Font } from './types/configType'

describe('Verify Fonts', () => {
  for (const item in Font) {
    const fontName = Font[item as keyof typeof Font]

    for (const weight of [200, 400, 500]) {
      test(`Check font '${fontName}', ${weight} exists`, async () => {
        const { data } = await getFont(
          fontName,
          weight as SatoriOptions['fonts'][0]['weight']
        )
        expect(data).toBeTruthy()
      })
    }
  }
})
