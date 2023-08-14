// ========== CONSTANTS ==========

export const START_YEAR = 1930
export const END_YEAR = new Date().getFullYear() + 2

// ========== DATE UTILITIES ==========

export function formatDatePickerDate(value, dateFormat = 'DD-MM-YYYY') {
  console.log('Format utilisé dans formatDate:', dateFormat)
  if (!(value instanceof Date)) {
    console.log("La valeur n'est pas une instance de Date:", value)
    return value
  }

  const day = value.getDate()
  const month = value.getMonth() + 1
  const year = value.getFullYear()

  console.log('Jour:', day, 'Mois:', month, 'Année:', year)

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
