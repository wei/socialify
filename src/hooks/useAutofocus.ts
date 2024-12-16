import { useCallback } from 'react'

const useAutoFocus = () => {
  const inputRef = useCallback((inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus()
    }
  }, [])

  return inputRef
}

export default useAutoFocus
