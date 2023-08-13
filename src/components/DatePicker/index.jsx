import React, { useState } from 'react'
import styles from './DatePicker.module.css'
import Calendar from './Calendar'
import getTranslations from './translate'
import { formatDate } from './utils'
import { CalendarIcon } from './Icons'

function CalendarButton({ onClick }) {
  return (
    <button onClick={onClick} className={styles.calendarButton}>
      <CalendarIcon />
    </button>
  )
}

function DatePicker({
  name,
  value,
  onChange,
  useIcons = false,
  language = 'en',
}) {
  const [showCalendar, setShowCalendar] = useState(false)
  const translations = getTranslations(language)
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerInput}>
        <input type="text" value={formatDate(value) || ''} readOnly />
        <CalendarButton onClick={toggleCalendar} />
      </div>
      {showCalendar && (
        <Calendar
          selectDate={(date) => {
            setShowCalendar(false)
            onChange({
              target: {
                name,
                value: date,
              },
            })
          }}
          closeCalendar={() => setShowCalendar(false)}
          useIcons={useIcons}
          translations={translations}
          language={language}
        />
      )}
    </div>
  )
}

export default DatePicker
