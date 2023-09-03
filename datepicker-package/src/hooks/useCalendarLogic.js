import { useState } from 'react'
import { generateTotalSlots } from '../utils/dateFunctions'

function useCalendarLogic(initialMonth, selectedDate, startOfWeek = 0) {
  const [viewedDate, setViewedDate] = useState(selectedDate || initialMonth)

  const totalSlots = generateTotalSlots(viewedDate, startOfWeek)

  return {
    viewedDate,
    setViewedDate,
    totalSlots,
    selectedDate,
  }
}

export default useCalendarLogic
