import { expect, test } from '@jest/globals'
import { render } from '@testing-library/react'

import ErrorPage from './_error'

test('ErrorPage renders', () => {
  const { container } = render(
    <ErrorPage
      code="404"
      title="Page not found."
      description="Sorry, we couldn't find the page you're looking for."
    />
  )
  const error = container.firstElementChild

  // Added so expect is not called with null.
  if (!error) {
    throw new Error('Element not found')
  }

  expect(error).toMatchSnapshot()
})
