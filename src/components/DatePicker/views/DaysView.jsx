import React, { useRef, useState } from 'react'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils/handleNavigationKeys'
import { updateMonth, handleTabKey, BACKWARD } from '../utils/viewUtils.js'

function DaysView({
  totalSlots,
  chooseDate,
  reorderedDays,
  setCurrentMonth,
  currentMonth,
  selectedDate,
  viewedDate = null, // une valeur par défaut pour éviter 'undefined'
}) {
  const daysRefs = useRef([])
  const [hasBeenHovered, setHasBeenHovered] = useState(false)
  const resetHoveredState = () => setHasBeenHovered(false)
  const handleDayHover = () => {
    setHasBeenHovered(true)
  }
  const today = new Date()

  const handleDayKeyDown = (e, index) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && index === 0) {
        e.preventDefault()
        const newMonth = updateMonth(currentMonth, BACKWARD)
        setCurrentMonth(newMonth)
        return
      }

      if (!e.shiftKey && index === totalSlots.length - 1) {
        return
      }

      const { direction } = handleTabKey(
        e,
        totalSlots[index],
        index,
        currentMonth,
      )
      if (direction) {
        e.preventDefault()
        const newMonth = updateMonth(currentMonth, direction)
        setCurrentMonth(newMonth)
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

        const isViewedDate =
          viewedDate &&
          !day.isGrayed &&
          viewedDate.getDate() === day.number &&
          viewedDate.getMonth() === currentMonth.getMonth() &&
          viewedDate.getFullYear() === currentMonth.getFullYear()

        const dayClassCondition =
          isSelectedDate || (todayIsThisDay && !hasBeenHovered) || isViewedDate

        const activeClass = isSelectedDate || isViewedDate ? styles.active : ''

        const dayClass = day.isGrayed ? styles.grayedDay : styles.day

        return (
          <div
            key={index}
            className={
              dayClassCondition ? `${dayClass} ${activeClass}` : dayClass
            }
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
