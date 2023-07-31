import { useCallback, useRef } from 'react'

const useDebouncedValidation = (
  validateFunction,
  delay,
  setError,
  clearError,
) => {
  const timer = useRef()

  const debouncedValidation = useCallback(
    (name, value) => {
      if (timer.current) {
        clearTimeout(timer.current)
      }

      timer.current = setTimeout(() => {
        const error = validateFunction(name, value)
        if (error) {
          setError(name, error)
        } else {
          clearError(name)
        }
      }, delay)
    },
    [delay, validateFunction, setError, clearError],
  )

  return debouncedValidation
}

export default useDebouncedValidation
