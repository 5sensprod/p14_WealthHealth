import { getDaysInMonth } from './dateFunctions'
export const DAYS = 'days'
export const MONTHS = 'months'
export const YEARS = 'years'

export function switchToMonthView(view) {
  return view === DAYS ? MONTHS : view
}

export function toggleYearView(view) {
  return view === YEARS ? MONTHS : YEARS
}

export function resetToCurrentDate() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function reorderDays(days, startDayIndex) {
  if (startDayIndex < 0 || startDayIndex > 6) return days
  return [...days.slice(startDayIndex), ...days.slice(0, startDayIndex)]
}

export const FORWARD = 'forward'
export const BACKWARD = 'backward'

export const updateMonth = (currentMonth, direction) => {
  const newMonth = new Date(currentMonth)
  const increment = direction === FORWARD ? 1 : -1
  newMonth.setMonth(currentMonth.getMonth() + increment)
  return newMonth
}

export const handleTabKey = (e, day, index, currentMonth) => {
  const daysInCurrentMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
  )
  const isLastDayOfCurrentMonth =
    day.number === daysInCurrentMonth && !day.isGrayed
  const isFirstDayOfCurrentMonth = day.number === 1 && !day.isGrayed

  if (!e.shiftKey && isLastDayOfCurrentMonth) {
    e.preventDefault()
    return { direction: FORWARD }
  } else if (e.shiftKey && isFirstDayOfCurrentMonth) {
    e.preventDefault()
    return { direction: BACKWARD }
  }

  return {}
}
