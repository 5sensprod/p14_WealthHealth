import React, { useState } from 'react'
import styles from './DatePicker.module.css'
import Calendar from './Calendar'

function DatePicker({ value, onChange }) {
  const [showCalendar, setShowCalendar] = useState(false)

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const handleDateChange = (date) => {
    onChange(date)
    setShowCalendar(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerInput}>
        <input type="text" value={value || ''} readOnly />
        <button onClick={toggleCalendar} className={styles.calendarButton}>
          📅
        </button>
      </div>
      {showCalendar && (
        <Calendar
          selectDate={handleDateChange}
          closeCalendar={toggleCalendar}
        />
      )}
    </div>
  )
}

export default DatePicker
