import { expect, jest, test } from '@jest/globals'
import { render } from '@testing-library/react'

import Header from './header'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

test('Header renders', () => {
  const { container } = render(<Header />)
  const header = container.firstElementChild

  // Added so expect is not called with null.
  if (!header) {
    throw new Error('Element not found')
  }

  expect(header).toMatchSnapshot()
})
