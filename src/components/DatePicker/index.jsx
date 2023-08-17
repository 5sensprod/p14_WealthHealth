import React, { useRef } from 'react'

import { DEFAULT_CONFIG } from './config/defaultConfig'

import styles from './DatePicker.module.css'

import Calendar from './Calendar'
import CalendarButton from './CalendarButton'

import useDateValidation from './useDateValidation'
import useEscapeKey from './useEscapeKey'
import useDatePickerState from './useDatePickerState'
import useOutsideClick from './useOutsideClick'

import getTranslations from './translate'
import { reorderDays } from './utils/viewUtils'
import { formatDatePickerDate } from './utils/dateFunctions'

function DatePicker({
  name,
  value,
  onChange,
  language = 'en',
  onClose,
  ...configProps
}) {
  // 1. Destructuring & Default Props
  const {
    useIcons,
    dateFormat,
    customStyles,
    startOfWeek,
    manualInputEnabled,
    minYear,
    maxYear,
  } = { ...DEFAULT_CONFIG, ...configProps }

  // 2. State & Refs Initialization
  const { showCalendar, inputValue, toggleCalendar, closeCalendar, setInput } =
    useDatePickerState(value, dateFormat, onClose)

  const calendarRef = useRef(null)
  const buttonRef = useRef(null)
  const inputRef = useRef(null)

  const [error, validate, setError] = useDateValidation(
    dateFormat,
    minYear,
    maxYear,
  )

  // 3. Handlers
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

  const handleInputAndButtonClick = () => {
    setClickedInside(true)
    toggleCalendar()
  }

  // 4. Derived Data & Effects
  const translations = getTranslations(language)
  const reorderedDays = reorderDays(translations.days, startOfWeek)
  const setClickedInside = useOutsideClick(
    calendarRef,
    buttonRef,
    closeCalendar,
  )
  useEscapeKey(closeCalendar)

  // 5. Component Render
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
          onClick={handleInputAndButtonClick}
          onChange={(e) => setInput(e.target.value)}
        />

        <CalendarButton ref={buttonRef} onClick={handleInputAndButtonClick} />
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
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
