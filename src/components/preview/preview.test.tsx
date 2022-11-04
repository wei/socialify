/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'

import Preview from './preview'

beforeAll(() => {
  window.HTMLCanvasElement.prototype.toDataURL = () => ''
})

test('Preview renders', () => {
  // Silence error:
  // Warning: [antd: Dropdown] `overlay` is deprecated.Please use `menu` instead.
  console.error = jest.fn()

  const { container } = render(<Preview />)
  const preview = container.firstElementChild!

  expect(preview).toMatchSnapshot()
})
