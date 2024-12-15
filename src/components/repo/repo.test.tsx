import { render } from '@testing-library/react'

import Repo from '@/src/components/repo/repo'

test('Repo renders', () => {
  const { container } = render(<Repo />)
  const repo = container.firstElementChild!

  expect(repo).toMatchSnapshot()
})
