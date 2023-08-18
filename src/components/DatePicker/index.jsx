import React, { useRef, useEffect } from 'react'

import { DEFAULT_CONFIG } from './config/defaultConfig'

import styles from './DatePicker.module.css'

import Calendar from './Calendar'
import CalendarButton from './CalendarButton'
import MaskedInput from './MaskedInput'

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
  language,
  onClose,
  ...configProps
}) {
  // 1. Destructuring & Default Props
  let {
    useIcons,
    dateFormat,
    customStyles,
    startOfWeek,
    manualInputEnabled,
    minYear,
    maxYear,
  } = { ...DEFAULT_CONFIG, ...configProps }

  // Interprétation de la clé 'dateFormat' comme une référence aux formats définis dans DEFAULT_CONFIG.DATE_FORMATS
  if (DEFAULT_CONFIG.DATE_FORMATS[dateFormat]) {
    dateFormat = DEFAULT_CONFIG.DATE_FORMATS[dateFormat]
  }

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

  useEffect(() => {
    setInput(value)
  }, [value, setInput])

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
    setInput(newValue)
    if (!newValue) {
      setError(null)
      return
    }
    if (newValue.length >= 10) {
      if (validate(newValue)) {
        setError(null)
        closeCalendar()
        inputRef.current.blur()
        toggleCalendar()
      }
    } else {
      setError(null)
    }
    onChange({ target: { name, value: newValue } })
  }
  const toggleCalendarVisibility = () => {
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
        <MaskedInput
          ref={inputRef}
          value={inputValue}
          format={dateFormat}
          onBlur={manualInputEnabled ? handleInputChange : null}
          placeholder={translations.placeholder}
          aria-label="Selected date"
          readOnly={!manualInputEnabled}
          className={error ? styles.errorInput : ''}
          onClick={toggleCalendarVisibility}
          onChange={handleInputChange}
        />

        <CalendarButton ref={buttonRef} onClick={toggleCalendarVisibility} />
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
