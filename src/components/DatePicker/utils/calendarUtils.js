import { getDaysInMonth } from './dateFunctions'

const DAYS_IN_A_WEEK = 7

const adjustStartOfWeek = (dayIndex, startOfWeek) => {
  const adjustedIndex = dayIndex - startOfWeek
  return adjustedIndex < 0 ? adjustedIndex + DAYS_IN_A_WEEK : adjustedIndex
}

const generateDays = (start, end, isGrayed = false) =>
  new Array(end - start + 1).fill(null).map((_, index) => ({
    number: start + index,
    isGrayed,
  }))

export function generateTotalSlots(currentMonth, startOfWeek = 0) {
  const currentYear = currentMonth.getFullYear()
  const currentMonthIndex = currentMonth.getMonth()

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonthIndex)
  const daysInPreviousMonth = getDaysInMonth(currentYear, currentMonthIndex - 1)

  const firstDayOfCurrentMonth = adjustStartOfWeek(
    new Date(currentYear, currentMonthIndex, 1).getDay(),
    startOfWeek,
  )

  const leadingDaysCount = firstDayOfCurrentMonth
  const trailingDaysCount =
    (DAYS_IN_A_WEEK -
      ((leadingDaysCount + daysInCurrentMonth) % DAYS_IN_A_WEEK)) %
    DAYS_IN_A_WEEK

  const leadingDaysFromPreviousMonth = generateDays(
    daysInPreviousMonth - leadingDaysCount + 1,
    daysInPreviousMonth,
    true,
  )
  const daysOfCurrentMonth = generateDays(1, daysInCurrentMonth)
  const trailingDaysForNextMonth = generateDays(1, trailingDaysCount, true)

  return [
    ...leadingDaysFromPreviousMonth,
    ...daysOfCurrentMonth,
    ...trailingDaysForNextMonth,
  ]
}
