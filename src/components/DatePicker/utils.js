function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function generateRegex(format, separator) {
  const formatMapping = {
    'DD-MM-YYYY': `^(\\d{2})${separator}(\\d{2})${separator}(\\d{4})$`,
    'MM-DD-YYYY': `^(\\d{2})${separator}(\\d{2})${separator}(\\d{4})$`,
    'YYYY-MM-DD': `^(\\d{4})${separator}(\\d{2})${separator}(\\d{2})$`,
  }
  return formatMapping[format]
}

export function isValidDate(
  dateString,
  format = 'DD-MM-YYYY',
  minYear = 1900,
  maxYear = 2100,
) {
  let day, month, year
  const separator = dateString.includes('/') ? '/' : '-'

  const regex = generateRegex(format, separator)
  if (!new RegExp(regex).test(dateString)) return false

  switch (format) {
    case 'DD-MM-YYYY':
      ;[day, month, year] = dateString.split(separator).map(Number)
      break
    case 'MM-DD-YYYY':
      ;[month, day, year] = dateString.split(separator).map(Number)
      break
    case 'YYYY-MM-DD':
      ;[year, month, day] = dateString.split(separator).map(Number)
      break
    default:
      return false // format non pris en charge
  }

  if (isNaN(day) || isNaN(month) || isNaN(year)) return false
  if (day < 1 || day > 31 || month < 1 || month > 12) return false
  if (year < minYear || year > maxYear) return false

  if (month === 2) {
    if (isLeapYear(year) && day > 29) return false
    if (!isLeapYear(year) && day > 28) return false
  } else {
    const daysInMonth = new Date(year, month, 0).getDate()
    if (day > daysInMonth) return false
  }

  return true
}
