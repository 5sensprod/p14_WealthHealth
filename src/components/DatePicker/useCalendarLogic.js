import { useState } from 'react'

function useCalendarLogic(initialMonth) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth)

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate()

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay()

  const days = new Array(daysInMonth)
    .fill(null)
    .map((_, index) => ({ number: index + 1, isGrayed: false }))

  const daysInPrevMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    0,
  ).getDate()

  const blanksBeforeDays = new Array(firstDayOfMonth)
    .fill(null)
    .map((_, idx) => ({
      number: daysInPrevMonth - firstDayOfMonth + idx + 1,
      isGrayed: true,
    }))

  const daysAfterCurrentMonth =
    7 - ((blanksBeforeDays.length + days.length) % 7)

  const daysAfter =
    daysAfterCurrentMonth < 7
      ? new Array(daysAfterCurrentMonth)
          .fill(null)
          .map((_, index) => ({ number: index + 1, isGrayed: true }))
      : []

  const totalSlots = [...blanksBeforeDays, ...days, ...daysAfter]

  return {
    currentMonth,
    setCurrentMonth,
    totalSlots,
  }
}

export default useCalendarLogic
