import React from 'react'
import { render } from '@testing-library/react'
// import App from './App'

test('placeholder', () => {
  const { getByText } = render(<span>placeholder</span>)
  const placeholderElement = getByText(/placeholder/)
  expect(placeholderElement).toBeInTheDocument()
})
