import { expect, test } from '@jest/globals'
import { render } from '@testing-library/react'

import Repo from './repo'

test('Repo renders', () => {
  const { container } = render(<Repo />)
  const repo = container.firstElementChild

  // Added so expect is not called with null.
  if (repo) {
    expect(repo).toMatchSnapshot()
  } else {
    throw new Error('Element not found')
  }
})
