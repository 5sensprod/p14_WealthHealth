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
