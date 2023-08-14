import React, { useState, useRef, forwardRef } from 'react'
import styles from './DatePicker.module.css'
import Calendar from './Calendar'
import getTranslations from './translate'
import { formatDatePickerDate, reorderDays } from './utils'
import { CalendarIcon } from './Icons'
import Button from './Button'
import useOutsideClick from './useOutsideClick'

const CalendarButton = forwardRef(({ onClick, showCalendar }, ref) => (
  <Button
    onClick={onClick}
    className={styles.calendarButton}
    icon={CalendarIcon}
    ref={ref}
    aria-expanded={showCalendar}
    aria-label="Toggle date picker"
  />
))
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
  const calendarRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(calendarRef, buttonRef, closeCalendar)

  function toggleCalendar() {
    if (showCalendar && onClose) {
      onClose()
    }
    setShowCalendar((prev) => !prev)
  }

  function closeCalendar() {
    setShowCalendar(false)
  }

  function handleDateSelect(date) {
    const actualDate = typeof date === 'string' ? new Date(date) : date
    const formattedDate = formatDatePickerDate(actualDate, dateFormat)
    closeCalendar()
    onChange({
      target: {
        name,
        value: formattedDate,
      },
    })
  }

  return (
    <div className={styles.container} style={customStyles}>
      <div className={styles.containerInput}>
        <input
          type="text"
          value={formatDatePickerDate(value, dateFormat)}
          readOnly
          placeholder={translations.placeholder}
          aria-label="Selected date" // Étiquette descriptive pour le champ de date
        />
        <CalendarButton
          ref={buttonRef}
          onClick={toggleCalendar}
          showCalendar={showCalendar}
        />
      </div>
      {showCalendar && (
        <Calendar
          selectDate={handleDateSelect}
          closeCalendar={closeCalendar}
          useIcons={useIcons}
          translations={translations}
          language={language}
          reorderedDays={reorderedDays}
          ref={calendarRef}
          role="grid" // Role pour le calendrier
        />
      )}
    </div>
  )
}

export default DatePicker
