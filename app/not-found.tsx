import { JSX } from 'react'

import ErrorContent from '@/src/components/error/error'

export default function NotFoundPage(): JSX.Element {
  return (
    <ErrorContent
      code="404"
      title="Page not found."
      description="Sorry, we couldn't find the page you're looking for."
    />
  )
}
