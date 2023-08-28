// ========== DATE UTILITIES ==========

export function formatDatePickerDate(value, dateFormat = 'DD-MM-YYYY') {
  if (!(value instanceof Date)) {
    return value
  }

  const day = value.getDate()
  const month = value.getMonth() + 1
  const year = value.getFullYear()

  switch (dateFormat) {
    case 'YYYY-MM-DD':
      return `${year}/${month.toString().padStart(2, '0')}/${day
        .toString()
        .padStart(2, '0')}`
    case 'MM-DD-YYYY':
      return `${month.toString().padStart(2, '0')}/${day
        .toString()
        .padStart(2, '0')}/${year}`
    case 'DD-MM-YYYY':
      return `${day.toString().padStart(2, '0')}/${month
        .toString()
        .padStart(2, '0')}/${year}`
    default:
      return value
  }
}

export function abbreviateMonth(month) {
  return month.length > 5 ? month.substring(0, 4) + '.' : month
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

export function convertFormattedStringToDate(dateString, format) {
  const parts = dateString.split('/')

  switch (format) {
    case 'DD-MM-YYYY':
      return new Date(
        parseInt(parts[2]),
        parseInt(parts[1]) - 1,
        parseInt(parts[0]),
      )
    case 'MM-DD-YYYY':
      return new Date(
        parseInt(parts[2]),
        parseInt(parts[0]) - 1,
        parseInt(parts[1]),
      )
    case 'YYYY-MM-DD':
      return new Date(
        parseInt(parts[0]),
        parseInt(parts[1]) - 1,
        parseInt(parts[2]),
      )
    default:
      throw new Error(`Invalid date format: ${format}`)
  }
}
