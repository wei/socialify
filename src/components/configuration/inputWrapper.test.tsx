import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import InputWrapper, { type InputProps } from './inputWrapper'

describe('Renders input wrapper correctly', () => {
  const mockHandleChange = jest.fn()

  const baseProps: InputProps = {
    title: 'Test Input Label',
    keyName: 'name',
    value: '',
    placeholder: 'Test Placeholder',
    handleChange: mockHandleChange,
  }

  test('renders the label correctly', () => {
    render(<InputWrapper {...baseProps} />)

    const labelElement = screen.getByText('Test Input Label')
    expect(labelElement).toBeInTheDocument()
    expect(labelElement).toHaveClass('label-text')
  })

  test('renders the alt label correctly', () => {
    render(<InputWrapper {...baseProps} alt="Test Alt Label" />)

    const altLabelElement = screen.getByText('Test Alt Label')
    expect(altLabelElement).toBeInTheDocument()
    expect(altLabelElement).toHaveClass('label-text-alt')
  })

  test('renders the placeholder correctly', () => {
    render(<InputWrapper {...baseProps} />)

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(inputElement).toBeInTheDocument()
  })

  test('renders disabled input correctly', () => {
    render(<InputWrapper {...baseProps} disabled />)

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(inputElement).toBeDisabled()
  })

  test('renders input changes correctly', () => {
    render(<InputWrapper {...baseProps} />)

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    fireEvent.change(inputElement, { target: { value: 'Test Input' } })
    expect(mockHandleChange).toHaveBeenCalledWith(
      { val: 'Test Input', required: true },
      'name'
    )
  })

  test('renders error correctly', () => {
    render(<InputWrapper {...baseProps} error="Test Error" />)

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(inputElement).toHaveClass('input-error')
    const errorElement = screen.getByText('Test Error')
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveClass('text-red-400')
  })
})
