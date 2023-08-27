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
    const formatKey = Object.values(DEFAULT_CONFIG.DATE_FORMATS).includes(
      dateFormat,
    )
      ? Object.keys(DEFAULT_CONFIG.DATE_FORMATS).find(
          (key) => DEFAULT_CONFIG.DATE_FORMATS[key] === dateFormat,
        )
      : DEFAULT_CONFIG.DATE_FORMAT

    console.log('Provided dateFormat:', dateFormat) // Ce log affichera le format fourni
    console.log('Computed formatKey:', formatKey)
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
