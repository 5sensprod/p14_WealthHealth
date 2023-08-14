import React from 'react'
import styles from '../Calendar.module.css'

function DaysView({ totalSlots, chooseDate, reorderedDays }) {
  return (
    <div className={styles.daysContainer}>
      {/* Utiliser reorderedDays pour afficher les jours dans l'ordre souhaité */}
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
        >
          {day.number}
        </div>
      ))}
    </div>
  )
}

export default DaysView
