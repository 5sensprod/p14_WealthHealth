import { useState } from 'react'
import { generateTotalSlots } from '../utils/calendarUtils'

function useCalendarLogic(initialMonth, startOfWeek = 0) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth)

  const totalSlots = generateTotalSlots(currentMonth, startOfWeek)

  return {
    currentMonth,
    setCurrentMonth,
    totalSlots,
  }
}

export default useCalendarLogic
