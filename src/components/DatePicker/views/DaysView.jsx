import React, { useRef } from 'react'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils/handleNavigationKeys'
import { updateMonth, handleTabKey, BACKWARD } from '../utils/viewUtils.js'

function DaysView({
  totalSlots,
  chooseDate,
  reorderedDays,
  setCurrentMonth,
  currentMonth,
}) {
  const daysRefs = useRef([])

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
