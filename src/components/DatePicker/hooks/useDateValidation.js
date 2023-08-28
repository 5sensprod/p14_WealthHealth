import { useState } from 'react'
import { isValidDate } from '../utils/dateUtils'
import { DEFAULT_CONFIG } from '../config/defaultConfig'
import getTranslations from '../translate'

function useDateValidation(
  dateFormat = DEFAULT_CONFIG.DATE_FORMAT,
  minYear = DEFAULT_CONFIG.MIN_YEAR,
  maxYear = DEFAULT_CONFIG.MAX_YEAR,
  language = DEFAULT_CONFIG.LANGUAGE,
) {
  const [error, setError] = useState(null)
  const translations = getTranslations(language)

  function validate(value) {
    const formatKey = Object.values(DEFAULT_CONFIG.DATE_FORMATS).includes(
      dateFormat,
    )
      ? Object.keys(DEFAULT_CONFIG.DATE_FORMATS).find(
          (key) => DEFAULT_CONFIG.DATE_FORMATS[key] === dateFormat,
        )
      : DEFAULT_CONFIG.DATE_FORMAT

    if (isValidDate(value, formatKey, minYear, maxYear)) {
      setError(null)
      return true
    } else {
      const formattedError = translations.errors.invalidDateRange
        .replace('{minYear}', minYear ? minYear.toString() : 'N/A')
        .replace('{maxYear}', maxYear ? maxYear.toString() : 'N/A')
      setError(formattedError)
      return false
    }
  }

  return [error, validate, setError]
}

export default useDateValidation
