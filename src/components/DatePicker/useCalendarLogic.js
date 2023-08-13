import { useState } from 'react'
import { getDaysInMonth } from './utils'

const DAYS_IN_A_WEEK = 7

function useCalendarLogic(initialMonth) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth)

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

  const totalSlots = [
    ...leadingDaysFromPreviousMonth,
    ...daysOfCurrentMonth,
    ...trailingDaysForNextMonth,
  ]

  return {
    currentMonth,
    setCurrentMonth,
    totalSlots,
  }
}

export default useCalendarLogic
