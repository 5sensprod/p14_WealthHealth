export function handleNavigationKeys(
  e,
  index,
  maxIndex,
  action,
  refsArray,
  getItem,
  closeCalendar,
  setCurrentMonth,
  getCurrentMonth,
) {
  switch (e.key) {
    case 'ArrowRight':
      if (index < maxIndex) {
        refsArray[index + 1].focus()
      }
      break
    case 'ArrowLeft':
      if (index > 0) {
        refsArray[index - 1].focus()
      }
      break
    case 'Escape':
      if (typeof closeCalendar === 'function') {
        closeCalendar()
      }
      break
    case 'Enter':
    case 'Space':
      // console.log('Enter or Space pressed')
      const item = getItem ? getItem(index) : index
      action(item)
      e.preventDefault()
      break

    case 'Tab':
      // Ne faites rien ici, nous traiterons la logique de Tab dans handleDayKeyDown.
      break
    default:
      break
  }
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export function isValidDate(
  dateString,
  format = 'DD-MM-YYYY',
  minYear = 1900,
  maxYear = 2100,
) {
  let day, month, year

  const separator = dateString.includes('/') ? '/' : '-'

  switch (format) {
    case 'DD-MM-YYYY':
      ;[day, month, year] = dateString
        .split(separator)
        .map((part) => parseInt(part, 10))
      if (
        !new RegExp(`^(\\d{2})${separator}(\\d{2})${separator}(\\d{4})$`).test(
          dateString,
        )
      )
        return false
      break
    case 'MM-DD-YYYY':
      ;[month, day, year] = dateString
        .split(separator)
        .map((part) => parseInt(part, 10))
      if (
        !new RegExp(`^(\\d{2})${separator}(\\d{2})${separator}(\\d{4})$`).test(
          dateString,
        )
      )
        return false
      break
    case 'YYYY-MM-DD':
      ;[year, month, day] = dateString
        .split(separator)
        .map((part) => parseInt(part, 10))
      if (
        !new RegExp(`^(\\d{4})${separator}(\\d{2})${separator}(\\d{2})$`).test(
          dateString,
        )
      )
        return false
      break
    default:
      return false // format non pris en charge
  }

  if (isNaN(day) || isNaN(month) || isNaN(year)) return false

  if (day < 1 || day > 31) return false
  if (month < 1 || month > 12) return false
  if (year < minYear || year > maxYear) return false

  if (month === 2 && isLeapYear(year) && day > 29) return false // Validation pour le mois de février lors des années bissextiles.
  if (month === 2 && !isLeapYear(year) && day > 28) return false // Validation pour le mois de février hors des années bissextiles.

  const daysInMonth = new Date(year, month, 0).getDate()
  if (day > daysInMonth) return false

  return true
}
