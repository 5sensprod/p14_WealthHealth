import { getDaysInMonth } from './dateFunctions'

const DAYS_IN_A_WEEK = 7

const adjustStartOfWeek = (dayIndex, startOfWeek) => {
  const adjustedIndex = dayIndex - startOfWeek
  return adjustedIndex < 0 ? adjustedIndex + DAYS_IN_A_WEEK : adjustedIndex
}

/**
 * Generates the total slots for a calendar based on the given month.
 * This includes days from the current month as well as leading days
 * from the previous month and trailing days for the next month.
 *
 * @param {Date} currentMonth - The current month's Date object.
 * @param {Number} startOfWeek - Index for the start day of the week (0 for Sunday, 1 for Monday, ... 6 for Saturday).
 * @returns {Array} - An array of day objects to fill the calendar grid.
 */
export function generateTotalSlots(currentMonth, startOfWeek = 0) {
  const daysInCurrentMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
  )

  const firstDayOfCurrentMonth = adjustStartOfWeek(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay(),
    startOfWeek,
  )

  const daysOfCurrentMonth = new Array(daysInCurrentMonth)
    .fill(null)
    .map((_, index) => ({ number: index + 1, isGrayed: false }))

  const daysInPreviousMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth() - 1,
  )

  const leadingDaysFromPreviousMonth = new Array(firstDayOfCurrentMonth)
    .fill(null)
    .map((_, idx) => ({
      number: daysInPreviousMonth - firstDayOfCurrentMonth + idx + 1,
      isGrayed: true,
    }))

  const trailingDaysForNextMonthCount =
    DAYS_IN_A_WEEK -
    ((leadingDaysFromPreviousMonth.length + daysOfCurrentMonth.length) %
      DAYS_IN_A_WEEK)

  const trailingDaysForNextMonth =
    trailingDaysForNextMonthCount < DAYS_IN_A_WEEK
      ? new Array(trailingDaysForNextMonthCount)
          .fill(null)
          .map((_, index) => ({ number: index + 1, isGrayed: true }))
      : []

  return [
    ...leadingDaysFromPreviousMonth,
    ...daysOfCurrentMonth,
    ...trailingDaysForNextMonth,
  ]
}
