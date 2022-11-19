import { render } from '@testing-library/react'

import Repo from './repo'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

test('Repo renders', () => {
  const { container } = render(<Repo />)
  const repo = container.firstElementChild!

  expect(repo).toMatchSnapshot()
})
