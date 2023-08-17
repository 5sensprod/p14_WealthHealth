import React, { useRef, useState, useEffect } from 'react'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils'
import { getDaysInMonth } from '../utils/dateFunctions'

function DaysView({
  totalSlots,
  chooseDate,
  reorderedDays,
  setCurrentMonth,
  currentMonth,
}) {
  const daysRefs = useRef([])
  const [navigationDirection, setNavigationDirection] = useState(null) // 'forward' ou 'backward'

  useEffect(() => {
    // Si le calendrier est visible (ou vient d'être ouvert)
    const firstNonGrayedDayIndex = totalSlots.findIndex((day) => !day.isGrayed)
    if (firstNonGrayedDayIndex !== -1) {
      setTimeout(() => {
        daysRefs.current[firstNonGrayedDayIndex]?.focus()
      }, 0)
    }
  }, [currentMonth, totalSlots])

  useEffect(() => {
    if (navigationDirection === 'forward') {
      setTimeout(() => {
        daysRefs.current[0]?.focus()
        setNavigationDirection(null) // Réinitialisez la direction de navigation
      }, 0)
    } else if (navigationDirection === 'backward') {
      const daysInPrevMonth = getDaysInMonth(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
      )
      setTimeout(() => {
        daysRefs.current[daysInPrevMonth - 1]?.focus()
        setNavigationDirection(null) // Réinitialisez la direction de navigation
      }, 0)
    }
  }, [navigationDirection, currentMonth])
  const handleDayKeyDown = (e, index) => {
    handleNavigationKeys(
      e,
      index,
      totalSlots.length - 1,
      (selectedIndex) => chooseDate(totalSlots[selectedIndex].number),
      daysRefs.current,
    )

    const day = totalSlots[index]
    const daysInCurrentMonth = getDaysInMonth(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
    )

    const isLastDayOfCurrentMonth =
      day.number === daysInCurrentMonth && !day.isGrayed
    const isFirstDayOfCurrentMonth = day.number === 1 && !day.isGrayed

    if (e.key === 'Tab' && !e.shiftKey && isLastDayOfCurrentMonth) {
      e.preventDefault()
      setCurrentMonth((prevMonth) => {
        const newMonth = new Date(prevMonth)
        newMonth.setMonth(prevMonth.getMonth() + 1)
        return newMonth
      })
      setNavigationDirection('forward')
    } else if (e.key === 'Tab' && e.shiftKey && isFirstDayOfCurrentMonth) {
      e.preventDefault()
      setCurrentMonth((prevMonth) => {
        const newMonth = new Date(prevMonth)
        newMonth.setMonth(prevMonth.getMonth() - 1)
        return newMonth
      })
      setNavigationDirection('backward')
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
