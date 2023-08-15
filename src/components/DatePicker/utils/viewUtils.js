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

export function reorderDays(days, startDay) {
  const startDayAbbr = startDay.length > 3 ? startDay.slice(0, 3) : startDay
  const startIndex = days.findIndex(
    (day) => day.toLowerCase() === startDayAbbr.toLowerCase(),
  )
  if (startIndex === -1) return days
  return [...days.slice(startIndex), ...days.slice(0, startIndex)]
}
