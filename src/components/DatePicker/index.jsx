import React, { useState } from 'react'
import styles from './DatePicker.module.css'
import Calendar from './Calendar'
import enTranslations from './translations/en.json'
import frTranslations from './translations/fr.json'

function DatePicker({
  name,
  value,
  onChange,
  useIcons = false,
  language = 'en',
}) {
  const [showCalendar, setShowCalendar] = useState(false)

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const handleDateChange = (date) => {
    // Fermer le calendrier une fois la date sélectionnée
    setShowCalendar(false)

    // Créer un événement standardisé
    const event = {
      target: {
        name: name,
        value: date,
      },
    }
    onChange(event)
  }

  const dateValue =
    value instanceof Date ? value.toISOString().split('T')[0] : value

  const translations = language === 'fr' ? frTranslations : enTranslations

  return (
    <div className={styles.container}>
      <div className={styles.containerInput}>
        <input type="text" value={dateValue || ''} readOnly />
        <button onClick={toggleCalendar} className={styles.calendarButton}>
          📅
        </button>
      </div>
      {showCalendar && (
        <Calendar
          selectDate={handleDateChange}
          closeCalendar={toggleCalendar}
          useIcons={useIcons}
          translations={translations}
          language={language}
        />
      )}
    </div>
  )
}

export default DatePicker
