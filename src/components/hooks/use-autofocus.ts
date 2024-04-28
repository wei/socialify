// ./src/app/components/hooks/use-autofocus.ts
//
// Hook to focus the user input element once mounted.
import { useCallback } from 'react'

export default function useAutoFocus() {
  return useCallback((inputElement: HTMLInputElement | null) => {
    if (inputElement) {
      inputElement.focus()
    }
  }, [])
}
