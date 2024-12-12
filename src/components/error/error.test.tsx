import { render } from '@testing-library/react'

import ErrorContent from './error'

test('Error renders', () => {
  const { container } = render(
    <ErrorContent
      code="404"
      title="Page not found."
      description="Sorry, we couldn't find the page you're looking for."
    />
  )

  expect(container.firstElementChild).toMatchSnapshot()
})
