import { render } from '@testing-library/react'

import Error from './error'

test('Error renders', () => {
  const { container } = render(
    <Error
      code="404"
      title="Page not found."
      description="Sorry, we couldn't find the page you're looking for."
    />
  )
  const error = container.firstElementChild!

  expect(error).toMatchSnapshot()
})
