/**
 * @jest-environment node
 */

import fs from 'fs'
import path from 'path'
import { Font } from '../common/types/configType'

describe('Verify Fonts', () => {
  for (const item in Font) {
    const fontName = Font[item as keyof typeof Font]
    const fontSlug = fontName.replace(/\s/g, '-').toLowerCase()

    test(`Check font '${fontName}' exists`, async () => {
      for (const weight of [200, 400, 500]) {
        expect(
          fs.existsSync(
            path.join(
              process.cwd(),
              `fonts/${fontSlug}-all-${weight}-normal.woff`
            )
          )
        ).toBe(true)
      }
    })
  }
})
