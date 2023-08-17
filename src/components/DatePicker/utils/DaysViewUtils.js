import { getDaysInMonth } from './dateFunctions'

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
