import { useState } from 'react'
import { getNewData } from '../utils/dateNavigations'

export const VIEWS = {
  DAYS: 'days',
  MONTHS: 'months',
  YEARS: 'years',
}

export function useCalendarNavigation(
  initialDate = new Date(),
  setAnimationKey,
) {
  const [currentView, setCurrentView] = useState(VIEWS.DAYS)
  const [currentDate, setCurrentDate] = useState(initialDate)
  const [yearsBlock, setYearsBlock] = useState([]) // Initialiser l'état ici

  const switchToMonthView = () => {
    if (currentView === VIEWS.DAYS) {
      setCurrentView(VIEWS.MONTHS)
    }
  }

  const toggleYearView = () => {
    setCurrentView((prev) =>
      prev === VIEWS.YEARS ? VIEWS.MONTHS : VIEWS.YEARS,
    )
  }

  const resetToCurrentDate = () => {
    setCurrentDate(new Date())
    setCurrentView(VIEWS.DAYS)
  }

  const handleDateChange = (direction, view) => {
    const { newDate, newYearBlock } = getNewData(
      view,
      direction,
      yearsBlock,
      currentDate,
    )
    setYearsBlock(newYearBlock)
    setAnimationKey((prevKey) => prevKey + 1)
    setCurrentDate(newDate)
  }

  return {
    currentView,
    currentDate,
    switchToMonthView,
    toggleYearView,
    resetToCurrentDate,
    setCurrentDate,
    handleDateChange,
    setYearsBlock,
    yearsBlock,
  }
}
