import { render } from '@testing-library/react'
import { expect, test, vi } from 'vite-plus/test'

import Footer from '@/src/components/footer/footer'

vi.mock('@/common/helpers', () => ({
  version: '0.0.0',
}))

test('Footer renders', () => {
  const { container } = render(<Footer />)
  const footer = container.firstElementChild!

  expect(footer).toMatchSnapshot()
})
