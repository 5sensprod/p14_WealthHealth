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
  return new Date()
}

export function reorderDays(days, startDayIndex) {
  if (startDayIndex < 0 || startDayIndex > 6) return days
  return [...days.slice(startDayIndex), ...days.slice(0, startDayIndex)]
}
