import { render } from '@testing-library/react'
import { expect, test, vi } from 'vite-plus/test'

import Repo from '@/src/components/repo/repo'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}))

test('Repo renders', () => {
  const { container } = render(<Repo />)
  const repo = container.firstElementChild!

  expect(repo).toMatchSnapshot()
})
