import { useState } from 'react'
import { isValidDate } from './utils'

function useDateValidation(dateFormat, minYear, maxYear) {
  const [error, setError] = useState(null)

  function validate(value) {
    if (isValidDate(value, dateFormat, minYear, maxYear)) {
      setError(null)
      return true
    } else {
      setError('Date format is invalid')
      return false
    }
  }

  return [error, validate]
}

export default useDateValidation
