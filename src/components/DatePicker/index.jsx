import React, { useRef, useEffect } from 'react'
import styles from './DatePicker.module.css'
import Calendar from './Calendar'
import getTranslations from './translate'
import useDateValidation from './useDateValidation'
import { reorderDays } from './utils/viewUtils'
import { formatDatePickerDate } from './utils/dateFunctions'
import useEscapeKey from './useEscapeKey'
import CalendarButton from './CalendarButton'
import useDatePickerState from './useDatePickerState'
import { DEFAULT_CONFIG } from './config/defaultConfig'

function DatePicker({
  name,
  value,
  onChange,
  language,
  onClose,
  ...props // Décomposition pour tous les autres props
}) {
  const {
    useIcons,
    dateFormat,
    customStyles,
    startOfWeek,
    manualInputEnabled,
    minYear,
    maxYear,
  } = { ...DEFAULT_CONFIG, ...props }

  const { showCalendar, inputValue, toggleCalendar, closeCalendar, setInput } =
    useDatePickerState(value, dateFormat, onClose)

  const [error, validate, setError] = useDateValidation(
    dateFormat,
    minYear,
    maxYear,
  )
  const translations = getTranslations(language)
  const reorderedDays = reorderDays(translations.days, startOfWeek)

  const calendarRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const inputRef = event.target.closest(`.${styles.containerInput}`)
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        !inputRef
      ) {
        closeCalendar()
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [closeCalendar])

  const handleDateSelect = (date) => {
    const actualDate = typeof date === 'string' ? new Date(date) : date
    setInput(actualDate)
    closeCalendar()
    onChange({
      target: {
        name,
        value: formatDatePickerDate(actualDate, dateFormat, onClose),
      },
    })
  }

  const handleInputChange = (e) => {
    const newValue = e.target.value
    if (!newValue) {
      setError(null)
      return
    }
    if (!validate(newValue)) setError('Format de date invalide')
    else {
      onChange({ target: { name, value: newValue } })
      setError(null)
    }
  }

  useEscapeKey(closeCalendar)

  return (
    <div className={styles.container} style={customStyles}>
      <div className={styles.containerInput}>
        <input
          type="text"
          value={inputValue}
          onBlur={manualInputEnabled ? handleInputChange : null}
          placeholder={translations.placeholder}
          aria-label="Selected date"
          readOnly={!manualInputEnabled}
          className={error ? styles.errorInput : ''}
          onClick={toggleCalendar}
          onChange={(e) => setInput(e.target.value)}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <CalendarButton ref={buttonRef} onClick={toggleCalendar} />
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
