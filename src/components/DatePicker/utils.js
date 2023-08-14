// ========== CONSTANTS ==========

export const START_YEAR = 1930
export const END_YEAR = new Date().getFullYear() + 2

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

// ========== MONTH NAVIGATION ==========

export const goToNextMonth = (currentDate) => {
  if (currentDate.getMonth() === 11 && currentDate.getFullYear() === END_YEAR) {
    return new Date(START_YEAR, 0) // Return to January of START_YEAR
  }
  const year =
    currentDate.getMonth() === 11
      ? currentDate.getFullYear() + 1
      : currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1) % 12
  return new Date(year, month)
}

export const goToPreviousMonth = (currentDate) => {
  if (
    currentDate.getMonth() === 0 &&
    currentDate.getFullYear() === START_YEAR
  ) {
    return new Date(END_YEAR, 11) // Retour à décembre de END_YEAR
  }
  const year =
    currentDate.getMonth() === 0
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear()
  const month = (currentDate.getMonth() - 1 + 12) % 12
  return new Date(year, month)
}

// ========== YEAR NAVIGATION ==========

export const goToNextYear = (currentDate) => {
  const year =
    currentDate.getFullYear() === END_YEAR
      ? START_YEAR
      : currentDate.getFullYear() + 1
  return new Date(year, currentDate.getMonth())
}

export const goToPreviousYear = (currentDate) => {
  if (currentDate.getFullYear() === START_YEAR) {
    return new Date(END_YEAR, currentDate.getMonth())
  }
  const year = currentDate.getFullYear() - 1
  return new Date(year, currentDate.getMonth())
}

export const goToNextYearBlock = (yearsBlock) => {
  const newStartYear = yearsBlock[0] + 16
  const baseYear = newStartYear > END_YEAR ? START_YEAR : newStartYear
  return Array.from({ length: 16 }, (_, i) => baseYear + i)
}

export const goToPreviousYearBlock = (yearsBlock) => {
  const newStartYear = yearsBlock[0] - 16
  const baseYear = newStartYear < START_YEAR ? END_YEAR - 15 : newStartYear
  return Array.from({ length: 16 }, (_, i) => baseYear + i)
}

// ========== VIEW HELPERS ==========

export const VIEWS = {
  DAYS: 'days',
  MONTHS: 'months',
  YEARS: 'years',
}

export function switchToMonthView(view) {
  return view === VIEWS.DAYS ? VIEWS.MONTHS : view
}

export function toggleYearView(view) {
  return view === VIEWS.YEARS ? VIEWS.MONTHS : VIEWS.YEARS
}

export function resetToCurrentDate() {
  return new Date()
}

export function getNewDate(view, direction, yearsBlock, prev) {
  if (view === 'months') {
    return direction === 'prev'
      ? goToPreviousYear(prev, START_YEAR, END_YEAR)
      : goToNextYear(prev, END_YEAR)
  }
  if (view === 'days') {
    return direction === 'prev' ? goToPreviousMonth(prev) : goToNextMonth(prev)
  }
  return prev // default
}

export function getNewYearBlock(view, direction, yearsBlock) {
  if (view !== 'years') return yearsBlock
  return direction === 'prev'
    ? goToPreviousYearBlock(yearsBlock, new Date().getFullYear())
    : goToNextYearBlock(yearsBlock, new Date().getFullYear())
}

export function reorderDays(days, startDay) {
  // Convert full day name to abbreviation if needed
  const startDayAbbr = startDay.length > 3 ? startDay.slice(0, 3) : startDay

  const startIndex = days.findIndex(
    (day) => day.toLowerCase() === startDayAbbr.toLowerCase(),
  )

  if (startIndex === -1) return days

  return [...days.slice(startIndex), ...days.slice(0, startIndex)]
}

export function handleNavigationKeys(
  e,
  index,
  maxIndex,
  action,
  refsArray,
  getItem,
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
    case 'Enter':
    case 'Space':
      const item = getItem ? getItem(index) : index
      action(item)
      e.preventDefault() // Pour éviter le comportement par défaut de la touche 'Space'
      break
    default:
      break
  }
}
export function isValidDate(dateString, format = 'DD-MM-YYYY') {
  const dateParts = dateString.split('-')
  if (dateParts.length !== 3) return false

  const day = parseInt(dateParts[0], 10)
  const month = parseInt(dateParts[1], 10)
  const year = parseInt(dateParts[2], 10)

  if (isNaN(day) || isNaN(month) || isNaN(year)) return false

  if (day < 1 || day > 31) return false
  if (month < 1 || month > 12) return false
  if (year < 1900 || year > 2100) return false // Ici, j'ai mis une plage de 1900 à 2100, mais vous pouvez la modifier comme vous le souhaitez.

  const daysInMonth = new Date(year, month, 0).getDate()
  if (day > daysInMonth) return false

  if (format === 'DD-MM-YYYY') {
    return /^(\d{2})-(\d{2})-(\d{4})$/.test(dateString)
  }
  // Vous pouvez ajouter d'autres formats si nécessaire

  return true
}
