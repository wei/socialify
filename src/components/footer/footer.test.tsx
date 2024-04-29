import { expect, test } from '@jest/globals'
import { render } from '@testing-library/react'

import Footer from './footer'

test('Footer renders', () => {
  const { container } = render(<Footer />)
  const footer = container.firstElementChild

  // Added so expect is not called with null.
  if (!footer) {
    throw new Error('Element not found')
  }

  expect(footer).toMatchSnapshot()
})
