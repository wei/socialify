import { render } from '@testing-library/react'

import Header from './header'

test('Header renders', () => {
  const { container } = render(<Header />)
  const header = container.firstElementChild!

  expect(header).toMatchSnapshot()
})
