import { DEFAULT_CONFIG } from '../config/defaultConfig'

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function generateRegex(formatKey, separator) {
  const formatMapping = {
    DEFAULT: `^(\\d{2})${separator}(\\d{2})${separator}(\\d{4})$`,
    US: `^(\\d{2})${separator}(\\d{2})${separator}(\\d{4})$`,
    ISO: `^(\\d{4})${separator}(\\d{2})${separator}(\\d{2})$`,
  }
  return formatMapping[formatKey]
}

export function isValidDate(
  dateString,
  formatKey = DEFAULT_CONFIG.DATE_FORMAT,
  minYear = DEFAULT_CONFIG.MIN_YEAR,
  maxYear = DEFAULT_CONFIG.MAX_YEAR,
) {
  let day, month, year
  const separator = dateString.includes('/') ? '/' : '-'
  const format = DEFAULT_CONFIG.DATE_FORMATS[formatKey]

  const regex = generateRegex(formatKey, separator)
  if (!new RegExp(regex).test(dateString))
    return { isValid: false, errorType: 'invalidDate' }

  switch (format) {
    case DEFAULT_CONFIG.DATE_FORMATS.DEFAULT:
      ;[day, month, year] = dateString.split(separator).map(Number)
      break
    case DEFAULT_CONFIG.DATE_FORMATS.US:
      ;[month, day, year] = dateString.split(separator).map(Number)
      break
    case DEFAULT_CONFIG.DATE_FORMATS.ISO:
      ;[year, month, day] = dateString.split(separator).map(Number)
      break
    default:
      return { isValid: false, errorType: 'unsupportedFormat' }
  }

  if (isNaN(day) || isNaN(month) || isNaN(year))
    return { isValid: false, errorType: 'invalidDate' }
  if (day < 1 || day > 31 || month < 1 || month > 12)
    return { isValid: false, errorType: 'invalidDate' }
  if (year < minYear || year > maxYear)
    return { isValid: false, errorType: 'outOfRange' }

  if (month === 2) {
    if (isLeapYear(year) && day > 29)
      return { isValid: false, errorType: 'invalidDate' }
    if (!isLeapYear(year) && day > 28)
      return { isValid: false, errorType: 'invalidDate' }
  } else {
    const daysInMonth = new Date(year, month, 0).getDate()
    if (day > daysInMonth) return { isValid: false, errorType: 'invalidDate' }
  }

  return { isValid: true, errorType: null }
}
