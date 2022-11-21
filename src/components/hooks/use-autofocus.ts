import { useCallback } from 'react'

const useAutoFocus = () => {
  const inputRef = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus()
    }
  }, [])

  return inputRef
}

export default useAutoFocus
