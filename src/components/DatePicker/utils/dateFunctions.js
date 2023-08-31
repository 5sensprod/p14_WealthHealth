import { DEFAULT_CONFIG } from '../config/defaultConfig'
// ========== DATE UTILITIES ==========

export function abbreviateMonth(month) {
  return month.length > 5 ? month.substring(0, 4) + '.' : month
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

export function formatDatePickerDate(
  value,
  dateFormat = DEFAULT_CONFIG.DATE_FORMATS.DEFAULT,
) {
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

export function convertFormattedStringToDate(
  dateString,
  format = DEFAULT_CONFIG.DATE_FORMATS.DEFAULT,
) {
  const parts = dateString.split('/')

  switch (format) {
    case 'DD-MM-YYYY':
      return new Date(
        Date.UTC(
          parseInt(parts[2]),
          parseInt(parts[1]) - 1,
          parseInt(parts[0]),
        ),
      )
    case 'MM-DD-YYYY':
      return new Date(
        Date.UTC(
          parseInt(parts[2]),
          parseInt(parts[0]) - 1,
          parseInt(parts[1]),
        ),
      )
    case 'YYYY-MM-DD':
      return new Date(
        Date.UTC(
          parseInt(parts[0]),
          parseInt(parts[1]) - 1,
          parseInt(parts[2]),
        ),
      )
    default:
      throw new Error(`Invalid date format: ${format}`)
  }
}
