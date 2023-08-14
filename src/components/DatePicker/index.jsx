import React, { useState } from 'react'
import styles from './DatePicker.module.css'
import Calendar from './Calendar'
import getTranslations from './translate'
import { formatDatePickerDate } from './utils'
import { CalendarIcon } from './Icons'
import Button from './Button'
import { reorderDays } from './utils'

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
  dateFormat = 'DD-MM-YYYY',
  customStyles = {},
  onClose,
  startOfWeek = 'Monday',
}) {
  const [showCalendar, setShowCalendar] = useState(false)
  const translations = getTranslations(language)

  const reorderedDays = reorderDays(translations.days, startOfWeek)

  const toggleCalendar = () => {
    const newState = !showCalendar
    setShowCalendar(newState)
    if (!newState && onClose) {
      onClose()
    }
  }
  return (
    <div className={styles.container} style={customStyles}>
      <div className={styles.containerInput}>
        <input
          type="text"
          value={formatDatePickerDate(value, dateFormat) || ''}
          readOnly
          placeholder={translations.placeholder || 'Select a date'}
        />
        <CalendarButton onClick={toggleCalendar} />
      </div>
      {showCalendar && (
        <Calendar
          selectDate={(date) => {
            const actualDate = typeof date === 'string' ? new Date(date) : date
            const formattedDate = formatDatePickerDate(actualDate, dateFormat)

            setShowCalendar(false)
            onChange({
              target: {
                name,
                value: formattedDate,
              },
            })
          }}
          closeCalendar={() => setShowCalendar(false)}
          useIcons={useIcons}
          translations={translations}
          language={language}
          reorderedDays={reorderedDays}
        />
      )}
    </div>
  )
}

export default DatePicker
