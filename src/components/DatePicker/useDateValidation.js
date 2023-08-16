import { useState } from 'react'
import { isValidDate } from './utils'

function useDateValidation(
  dateFormat,
  minYear,
  maxYear,
  errorMessage = 'Date format is invalid',
) {
  const [error, setError] = useState(null)

  function validate(value) {
    if (isValidDate(value, dateFormat, minYear, maxYear)) {
      setError(null)
      return true
    } else {
      setError(errorMessage)
      return false
    }
  }

  return [error, validate, setError]
}

export default useDateValidation
