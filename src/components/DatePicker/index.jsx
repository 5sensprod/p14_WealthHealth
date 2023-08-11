import React, { useState } from 'react'
import styles from './DatePicker.module.css'
import Calendar from './Calendar'

function DatePicker() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerInput}>
        <input type="text" value={selectedDate || ''} readOnly />
        <button onClick={toggleCalendar} className={styles.calendarButton}>
          📅
        </button>
      </div>
      {showCalendar && (
        <Calendar selectDate={setSelectedDate} closeCalendar={toggleCalendar} />
      )}
    </div>
  )
}

export default DatePicker
