import { useEffect } from 'react'
import { getDaysInMonth } from '../utils/dateFunctions'

export function useInitialFocusEffect(currentMonth, totalSlots, daysRefs) {
  useEffect(() => {
    // const firstNonGrayedDayIndex = totalSlots.findIndex((day) => !day.isGrayed)
    // if (firstNonGrayedDayIndex !== -1) {
    //   setTimeout(() => {
    //     daysRefs.current[firstNonGrayedDayIndex]?.focus()
    //   }, 0)
    // }
  }, [currentMonth, totalSlots, daysRefs])
}

export function useNavigationDirectionEffect(
  navigationDirection,
  currentMonth,
  daysRefs,
  setNavigationDirection,
) {
  useEffect(() => {
    if (navigationDirection === 'forward') {
      setTimeout(() => {
        daysRefs.current[0]?.focus()
        setNavigationDirection(null)
      }, 0)
    } else if (navigationDirection === 'backward') {
      const daysInPrevMonth = getDaysInMonth(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
      )
      setTimeout(() => {
        daysRefs.current[daysInPrevMonth - 1]?.focus()
        setNavigationDirection(null)
      }, 0)
    }
  }, [navigationDirection, currentMonth, daysRefs, setNavigationDirection])
}
