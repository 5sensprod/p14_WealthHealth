import React, { useRef } from 'react'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils'

function DaysView({ totalSlots, chooseDate, reorderedDays }) {
  const daysRefs = useRef([])

  const handleDayKeyDown = (e, index) => {
    handleNavigationKeys(
      e,
      index,
      totalSlots.length - 1,
      chooseDate,
      daysRefs.current,
    )
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
          tabIndex={0}
        >
          {day.number}
        </div>
      ))}
    </div>
  )
}

export default DaysView
