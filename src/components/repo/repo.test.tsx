import { render } from '@testing-library/react'

// Unit test target.
import Repo from './repo'

test('Repo renders', () => {
  const { container } = render(<Repo />)
  const repo = container.firstElementChild!

  expect(repo).toMatchSnapshot()
})
