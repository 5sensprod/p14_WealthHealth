import { useState } from 'react'
import { isValidDate } from '../utils/dateUtils'
import { DEFAULT_CONFIG } from '../config/defaultConfig'
import getTranslations from '../translate'

function useDateValidation(dateFormat, minYear, maxYear, language = 'fr') {
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
      setError(translations.errors.invalidDateFormat)
      return false
    }
  }

  return [error, validate, setError]
}

export default useDateValidation
