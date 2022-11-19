import { render } from '@testing-library/react'

import Header from './header'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

test('Header renders', () => {
  const { container } = render(<Header />)
  const header = container.firstElementChild!

  expect(header).toMatchSnapshot()
})
