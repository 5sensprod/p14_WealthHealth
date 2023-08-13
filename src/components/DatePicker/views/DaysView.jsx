import React from 'react'
import styles from '../Calendar.module.css'

function DaysView({ totalSlots, chooseDate, translations }) {
  return (
    <div className={styles.daysContainer}>
      {translations.days.map((day) => (
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
        >
          {day.number}
        </div>
      ))}
    </div>
  )
}

export default DaysView
