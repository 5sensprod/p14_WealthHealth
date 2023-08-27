import { useState, useEffect } from 'react'
import { generateTotalSlots } from '../utils/calendarUtils'

function useCalendarLogic(initialMonth, selectedDate, startOfWeek = 0) {
  const [viewedDate, setViewedDate] = useState(selectedDate || initialMonth)

  const totalSlots = generateTotalSlots(viewedDate, startOfWeek)

  useEffect(() => {
    if (selectedDate) {
      setViewedDate(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth()),
      )
    }
  }, [selectedDate, setViewedDate])

  return {
    viewedDate,
    setViewedDate,
    totalSlots,
    selectedDate,
  }
}

export default useCalendarLogic
