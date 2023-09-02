import React, { useRef, useState, useEffect } from 'react'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils/dateNavigations'
import { updateMonth, handleTabKey, BACKWARD } from '../utils/viewUtils.js'

function DaysView({
  totalSlots,
  chooseDate,
  reorderedDays,
  setCurrentMonth,
  currentMonth,
  selectedDate,
  // viewedDate = null,
}) {
  const daysRefs = useRef([])
  const [hasBeenHovered, setHasBeenHovered] = useState(false)
  const [changedMonth, setChangedMonth] = useState(null)

  const resetHoveredState = () => setHasBeenHovered(false)

  const handleDayHover = () => setHasBeenHovered(true)

  const today = new Date()

  useEffect(() => {
    if (changedMonth === 'next') {
      daysRefs.current[0]?.focus()
    } else if (changedMonth === 'prev') {
      daysRefs.current[daysRefs.current.length - 1]?.focus()
    }
  }, [changedMonth])

  const handleDayKeyDown = (e, index) => {
    if (e.key === 'Tab') {
      let direction
      if (e.shiftKey && index === 0) {
        e.preventDefault()
        direction = BACKWARD
        setCurrentMonth(updateMonth(currentMonth, direction))
        setChangedMonth('prev')
        return
      }

      if (!e.shiftKey && index === totalSlots.length - 1) {
        direction = 'forward'
        setCurrentMonth(updateMonth(currentMonth, direction))
        setChangedMonth('next')
        return
      }

      const result = handleTabKey(e, totalSlots[index], index, currentMonth)
      if (result.direction) {
        e.preventDefault()
        setCurrentMonth(updateMonth(currentMonth, result.direction))
      }
    } else {
      handleNavigationKeys(
        e,
        index,
        totalSlots.length - 1,
        (selectedIndex) => chooseDate(totalSlots[selectedIndex].number),
        daysRefs.current,
      )
    }
  }

  return (
    <div className={styles.daysContainer} onMouseLeave={resetHoveredState}>
      {reorderedDays.map((day) => (
        <div className={styles.header} key={day}>
          {day}
        </div>
      ))}
      {totalSlots.map((day, index) => {
        const todayIsThisDay =
          !day.isGrayed &&
          today.getDate() === day.number &&
          today.getMonth() === currentMonth.getMonth() &&
          today.getFullYear() === currentMonth.getFullYear()

        const isSelectedDate =
          !day.isGrayed &&
          selectedDate.getDate() === day.number &&
          selectedDate.getMonth() === currentMonth.getMonth() &&
          selectedDate.getFullYear() === currentMonth.getFullYear()

        let highlightedClass = ''
        if (isSelectedDate) {
          highlightedClass = styles.active
        } else if (todayIsThisDay && !hasBeenHovered) {
          highlightedClass = styles.today
        }

        const dayClass = day.isGrayed ? styles.grayedDay : styles.day

        return (
          <div
            key={index}
            className={`${dayClass} ${highlightedClass}`}
            onClick={(event) => {
              event.stopPropagation()
              if (!day.isGrayed) chooseDate(day.number)
            }}
            onKeyDown={(e) => handleDayKeyDown(e, index)}
            onMouseEnter={handleDayHover}
            ref={(el) => (daysRefs.current[index] = el)}
            tabIndex={day.isGrayed ? -1 : 0}
          >
            {day.number}
          </div>
        )
      })}
    </div>
  )
}

export default DaysView
