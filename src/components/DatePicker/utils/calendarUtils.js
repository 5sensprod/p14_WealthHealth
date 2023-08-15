import { getDaysInMonth } from './dateFunctions'

const DAYS_IN_A_WEEK = 7

/**
 * Generates the total slots for a calendar based on the given month.
 * This includes days from the current month as well as leading days
 * from the previous month and trailing days for the next month.
 *
 * @param {Date} currentMonth - The current month's Date object.
 * @returns {Array} - An array of day objects to fill the calendar grid.
 */
export function generateTotalSlots(currentMonth) {
  const daysInCurrentMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
  )

  const firstDayOfCurrentMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay()

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
