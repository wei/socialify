import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import InputWrapper from './inputWrapper'

describe('svg data uri error checking', () => {
  const mockHandleChange = jest.fn()

  const baseProps = {
    title: 'SVG Logo',
    keyName: 'logo' as any,
    value: '',
    placeholder: 'SVG Data URI',
    handleChange: mockHandleChange,
  }

  test('shows error message for svg data uri having more that 1600 characters', () => {
    const invalidInput = 'a'.repeat(1601)

    render(
      <InputWrapper
        {...baseProps}
        isError={true}
        errorMessage="URI is too long, please use an SVG image URL instead."
      />
    )

    const input = screen.getByPlaceholderText('SVG Data URI')
    fireEvent.change(input, { target: { value: invalidInput } })

    const errorMessage = screen.getByText(
      'URI is too long, please use an SVG image URL instead.'
    )
    expect(errorMessage).toBeInTheDocument()
  })

  test('does not show error message for svg data uri having less than 1601 characters', () => {
    const validInput = 'a'.repeat(1600)

    render(<InputWrapper {...baseProps} isError={false} />)

    const input = screen.getByPlaceholderText('SVG Data URI')
    fireEvent.change(input, { target: { value: validInput } })

    const errorMessage = screen.queryByText(
      /URI is too long, please use an SVG image URL instead./i
    )
    expect(errorMessage).not.toBeInTheDocument()
  })
})
