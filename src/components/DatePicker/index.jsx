import React, { useState } from 'react'
import styles from './DatePicker.module.css'
import Calendar from './Calendar'
import getTranslations from './translate'
import { formatDatePickerDate } from './utils'
import { CalendarIcon } from './Icons'
import Button from './Button'

function CalendarButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className={styles.calendarButton}
      icon={CalendarIcon}
    />
  )
}

function DatePicker({
  name,
  value,
  onChange,
  useIcons = false,
  language = 'en',
  dateFormat = 'DD-MM-YYYY', // Valeur par défaut pour le format de date
}) {
  const [showCalendar, setShowCalendar] = useState(false)
  const translations = getTranslations(language)
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerInput}>
        <input
          type="text"
          value={formatDatePickerDate(value, dateFormat) || ''}
          readOnly
        />
        <CalendarButton onClick={toggleCalendar} />
      </div>
      {showCalendar && (
        <Calendar
          selectDate={(date) => {
            const actualDate = typeof date === 'string' ? new Date(date) : date
            const formattedDate = formatDatePickerDate(actualDate, dateFormat)

            console.log('Date sélectionnée (brute):', actualDate)
            console.log('Date sélectionnée (formatée):', formattedDate)

            setShowCalendar(false)
            onChange({
              target: {
                name,
                value: formattedDate, // Assurez-vous d'utiliser la date formatée ici
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
