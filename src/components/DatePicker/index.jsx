import React, { useState, useRef, forwardRef, useEffect } from 'react'
import styles from './DatePicker.module.css'
import Calendar from './Calendar'
import getTranslations from './translate'
import { formatDatePickerDate, reorderDays, isValidDate } from './utils'
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
  manualInputEnabled = true,
}) {
  const [showCalendar, setShowCalendar] = useState(false)
  const [inputValue, setInputValue] = useState(
    formatDatePickerDate(value, dateFormat),
  )
  const [error, setError] = useState(null)

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
    setInputValue(formattedDate)
    closeCalendar()
    onChange({
      target: {
        name,
        value: formattedDate,
      },
    })
  }

  function handleInputChange(e) {
    const newValue = e.target.value
    setInputValue(newValue)

    if (isValidDate(newValue)) {
      setError(null)
      onChange({
        target: {
          name,
          value: newValue,
        },
      })
    } else {
      setError('Date format is invalid')
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeCalendar()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className={styles.container} style={customStyles}>
      <div className={styles.containerInput}>
        <input
          type="text"
          value={inputValue}
          onChange={manualInputEnabled ? handleInputChange : null} // N'appeler handleInputChange que si manualInputEnabled est true
          placeholder={translations.placeholder}
          aria-label="Selected date"
          readOnly={!manualInputEnabled} // Si manualInputEnabled est false, l'input est en mode readOnly
          className={error ? styles.errorInput : ''}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
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
          role="grid"
        />
      )}
    </div>
  )
}

export default DatePicker
