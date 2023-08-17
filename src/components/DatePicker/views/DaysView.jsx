import React, { useRef, useState, useEffect } from 'react'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils'
import {
  updateMonth,
  handleTabKey,
  FORWARD,
  BACKWARD,
} from '../utils/DaysViewUtils'
import { getDaysInMonth } from '../utils/dateFunctions'

function useFocusOnFirstDay(totalSlots, daysRefs) {
  useEffect(() => {
    const firstNonGrayedDayIndex = totalSlots.findIndex((day) => !day.isGrayed)
    if (firstNonGrayedDayIndex !== -1) {
      setTimeout(() => {
        daysRefs.current[firstNonGrayedDayIndex]?.focus()
      }, 0)
    }
  }, [totalSlots, daysRefs])
}

function useNavigationDirectionFocus(
  navigationDirection,
  currentMonth,
  daysRefs,
) {
  useEffect(() => {
    if (navigationDirection === FORWARD) {
      setTimeout(() => {
        daysRefs.current[0]?.focus()
      }, 0)
    } else if (navigationDirection === BACKWARD) {
      const daysInPrevMonth = getDaysInMonth(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
      )
      setTimeout(() => {
        daysRefs.current[daysInPrevMonth - 1]?.focus()
      }, 0)
    }
  }, [navigationDirection, currentMonth, daysRefs])
}

function DaysView({
  totalSlots,
  chooseDate,
  reorderedDays,
  setCurrentMonth,
  currentMonth,
}) {
  const daysRefs = useRef([])
  const [navigationDirection, setNavigationDirection] = useState(null)

  useFocusOnFirstDay(totalSlots, daysRefs)
  useNavigationDirectionFocus(navigationDirection, currentMonth, daysRefs)

  const handleDayKeyDown = (e, index) => {
    handleNavigationKeys(
      e,
      index,
      totalSlots.length - 1,
      (selectedIndex) => chooseDate(totalSlots[selectedIndex].number),
      daysRefs.current,
    )

    if (e.key === 'Tab') {
      const { direction } = handleTabKey(
        e,
        totalSlots[index],
        index,
        currentMonth,
      )
      if (direction) {
        const newMonth = updateMonth(currentMonth, direction)
        setCurrentMonth(newMonth)
        setNavigationDirection(direction)
      }
    }
  }

  return (
    <div className={styles.daysContainer}>
      {reorderedDays.map((day) => (
        <div className={styles.header} key={day}>
          {day}
        </div>
      ))}
      {totalSlots.map((day, index) => (
        <div
          key={index}
          className={day.isGrayed ? styles.grayedDay : styles.day}
          onClick={(event) => {
            event.stopPropagation()
            if (!day.isGrayed) chooseDate(day.number)
          }}
          onKeyDown={(e) => handleDayKeyDown(e, index)}
          ref={(el) => (daysRefs.current[index] = el)}
          tabIndex={day.isGrayed ? -1 : 0}
        >
          {day.number}
        </div>
      ))}
    </div>
  )
}

export default DaysView
