import { useState } from 'react'
import { generateTotalSlots } from '../utils/calendarUtils'

function useCalendarLogic(initialMonth, selectedDate, startOfWeek = 0) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || initialMonth)

  const totalSlots = generateTotalSlots(currentMonth, startOfWeek)

  return {
    currentMonth,
    setCurrentMonth,
    totalSlots,
    selectedDate,
  }
}

export default useCalendarLogic
