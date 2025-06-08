import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import InputWrapper, { type InputProps } from './inputWrapper'

// Mock use-debounce for testing
jest.mock('use-debounce', () => ({
  useDebouncedCallback: (fn: Function, _delay: number) => {
    // Return the function directly for immediate testing
    return fn
  },
}))

describe('Renders input wrapper correctly', () => {
  const mockHandleChange = jest.fn()

  const baseProps: InputProps = {
    title: 'Test Input Label',
    keyName: 'name',
    value: '',
    placeholder: 'Test Placeholder',
    handleChange: mockHandleChange,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

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

  describe('Debouncing functionality', () => {
    test('uses direct updates when debounceMs is not provided', () => {
      render(<InputWrapper {...baseProps} />)

      const inputElement = screen.getByPlaceholderText('Test Placeholder')
      fireEvent.change(inputElement, { target: { value: 'Test Input' } })

      expect(mockHandleChange).toHaveBeenCalledWith(
        { val: 'Test Input', required: true },
        'name'
      )
    })

    test('uses internal state when debounceMs is provided', async () => {
      render(<InputWrapper {...baseProps} debounceMs={300} />)

      const inputElement = screen.getByPlaceholderText(
        'Test Placeholder'
      ) as HTMLInputElement
      fireEvent.change(inputElement, { target: { value: 'Test Input' } })

      // Input should show the new value immediately
      expect(inputElement.value).toBe('Test Input')

      // With our mock, handleChange should be called
      await waitFor(() => {
        expect(mockHandleChange).toHaveBeenCalledWith(
          { val: 'Test Input', required: true },
          'name'
        )
      })
    })

    test('syncs internal value when external value changes with debouncing', () => {
      const { rerender } = render(
        <InputWrapper {...baseProps} value="initial" debounceMs={300} />
      )

      const inputElement = screen.getByPlaceholderText(
        'Test Placeholder'
      ) as HTMLInputElement
      expect(inputElement.value).toBe('initial')

      // Simulate external value change (e.g., from URL params)
      rerender(
        <InputWrapper
          {...baseProps}
          value="updated from url"
          debounceMs={300}
        />
      )

      expect(inputElement.value).toBe('updated from url')
    })

    test('handles maxLength correctly with debouncing', () => {
      render(<InputWrapper {...baseProps} maxlen={10} debounceMs={300} />)

      const inputElement = screen.getByPlaceholderText('Test Placeholder')
      expect(inputElement).toHaveAttribute('maxlength', '10')
    })
  })
})
