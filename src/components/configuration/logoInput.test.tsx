import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LogoInput from './logoInput'

describe('Renders logo input correctly', () => {
  const mockHandleChange = jest.fn()

  const baseProps = {
    title: 'Test Input Label',
    keyName: 'testKeyName' as any,
    value: '',
    placeholder: 'Test Placeholder',
    handleChange: mockHandleChange,
    error: 'URI is too long, please use an SVG image URL instead.',
    maxlen: 1601,
  }

  test('renders error message when uri is greater than 1600 characters', () => {
    render(<LogoInput {...baseProps} />)

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    fireEvent.change(inputElement, { target: { value: 'a'.repeat(1601) } })
    expect(inputElement).toHaveClass('input-error')
    const errorElement = screen.getByText(
      'URI is too long, please use an SVG image URL instead.'
    )
    expect(errorElement).toBeInTheDocument()
  })

  test('does not renders error message when uri is less than 1601 characters', () => {
    render(<LogoInput {...baseProps} />)

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    fireEvent.change(inputElement, { target: { value: 'a'.repeat(1600) } })
    expect(inputElement).not.toHaveClass('input-error')
    const errorElement = screen.queryByText(
      'URI is too long, please use an SVG image URL instead.'
    )
    expect(errorElement).not.toBeInTheDocument()
  })
})
