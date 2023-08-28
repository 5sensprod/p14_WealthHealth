import { useState } from 'react'
import { isValidDate } from '../utils/dateUtils'
import { DEFAULT_CONFIG } from '../config/defaultConfig'
import getTranslations from '../translate'

function useDateValidation(
  dateFormat,
  minYear = DEFAULT_CONFIG.MIN_YEAR,
  maxYear = DEFAULT_CONFIG.MAX_YEAR,
  language = 'fr',
) {
  const [error, setError] = useState(null)
  const translations = getTranslations(language)

  function validate(value) {
    if (isValidDate(value, dateFormat, minYear, maxYear)) {
      setError(null)
      return true
    } else {
      // Message d'erreur pour une plage de dates non valide.
      const formattedError = translations.errors.invalidDateRange
        .replace('{minYear}', minYear.toString())
        .replace('{maxYear}', maxYear.toString())
      setError(formattedError)

      return false
    }
  }

  return [error, validate, setError]
}

export default useDateValidation
