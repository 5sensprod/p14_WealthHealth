import { useState } from 'react'
import { isValidDate } from '../utils/dateUtils'
import { DEFAULT_CONFIG } from '../config/defaultConfig'

function useDateValidation(
  dateFormat,
  minYear,
  maxYear,
  errorMessage = 'Date format is invalid',
) {
  const [error, setError] = useState(null)

  function validate(value) {
    const formatKey =
      dateFormat in DEFAULT_CONFIG.DATE_FORMATS
        ? dateFormat
        : DEFAULT_CONFIG.DATE_FORMAT
    if (isValidDate(value, formatKey, minYear, maxYear)) {
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
