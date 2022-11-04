import { render } from '@testing-library/react'

import Footer from './footer'

test('Footer renders', () => {
  const { container } = render(<Footer />)
  const footer = container.firstElementChild!

  expect(footer).toMatchSnapshot()
})
