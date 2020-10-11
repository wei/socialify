/**
 * @jest-environment node
 */

import fontNames from './fonts.json'

import { Font } from '../types/configType'

describe('Verify Fonts', () => {
  it('Check that all fonts exist', () => {
    for (const item in Font) {
      expect(item in fontNames).toBeTruthy()
    }
  })
})
