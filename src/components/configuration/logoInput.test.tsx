import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import type { InputProps } from './inputWrapper'
import LogoInput from './logoInput'

describe('Renders logo input correctly', () => {
  const mockHandleChange = jest.fn()

  const baseProps: InputProps = {
    title: 'Test Input Label',
    keyName: 'logo',
    value: '',
    placeholder: 'Test Placeholder',
    handleChange: mockHandleChange,
    error: 'URI is too long, please use an SVG image URL instead.',
    maxlen: 1601,
  }

  test('renders error message when uri is greater than 1600 characters', () => {
    render(<LogoInput {...baseProps} value={'a'.repeat(1601)} />)

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(inputElement).toHaveClass('input-error')
    const errorElement = screen.getByText(
      'URI is too long, please use an SVG image URL instead.'
    )
    expect(errorElement).toBeInTheDocument()
  })

  test('does not renders error message when uri is less than 1601 characters', () => {
    render(<LogoInput {...baseProps} value={'a'.repeat(1600)} />)

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(inputElement).not.toHaveClass('input-error')
    const errorElement = screen.queryByText(
      'URI is too long, please use an SVG image URL instead.'
    )
    expect(errorElement).not.toBeInTheDocument()
  })
})
