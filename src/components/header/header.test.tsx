import { render } from '@testing-library/react'
import { expect, test } from 'vite-plus/test'

import Header from '@/src/components/header/header'

test('Header renders', () => {
  const { container } = render(<Header />)
  const header = container.firstElementChild!

  expect(header).toMatchSnapshot()
})
