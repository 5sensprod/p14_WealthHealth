import { useState } from 'react'
import { generateTotalSlots } from './utils/calendarUtils'

function useCalendarLogic(initialMonth) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth)

  const totalSlots = generateTotalSlots(currentMonth)

  return {
    currentMonth,
    setCurrentMonth,
    totalSlots,
  }
}

export default useCalendarLogic
