// ./src/components/header/header.test.tsx
//
// Snapshot testing for the Header component.

// Testing essential imports.
import { expect, jest, test } from '@jest/globals'
import { render } from '@testing-library/react'

// Local component imports.
import Header from '@header/header'

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
