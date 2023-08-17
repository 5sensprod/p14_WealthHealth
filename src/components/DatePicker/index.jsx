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
import useOutsideClick from './useOutsideClick'
import { DEFAULT_CONFIG } from './config/defaultConfig'

function DatePicker({ name, value, onChange, language, onClose, ...props }) {
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

  const setClickedInside = useOutsideClick(
    calendarRef,
    buttonRef,
    closeCalendar,
  )

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

  const inputRef = useRef(null)

  useEffect(() => {
    if (!showCalendar && manualInputEnabled) {
      inputRef.current?.focus()
    }
  }, [showCalendar, manualInputEnabled])

  useEscapeKey(closeCalendar)

  return (
    <div className={styles.container} style={customStyles}>
      <div className={styles.containerInput}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onBlur={manualInputEnabled ? handleInputChange : null}
          placeholder={translations.placeholder}
          aria-label="Selected date"
          readOnly={!manualInputEnabled}
          className={error ? styles.errorInput : ''}
          onClick={() => {
            setClickedInside(true)
            toggleCalendar()
          }}
          onChange={(e) => setInput(e.target.value)}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <CalendarButton
          ref={buttonRef}
          onClick={() => {
            setClickedInside(true)
            toggleCalendar()
          }}
        />
      </div>
      {showCalendar && (
        <Calendar
          startOfWeek={startOfWeek}
          selectDate={handleDateSelect}
          closeCalendar={closeCalendar}
          useIcons={useIcons}
          translations={translations}
          language={language}
          reorderedDays={reorderedDays}
          ref={calendarRef}
          role="grid"
          isCalendarVisible={showCalendar}
        />
      )}
    </div>
  )
}

export default DatePicker
