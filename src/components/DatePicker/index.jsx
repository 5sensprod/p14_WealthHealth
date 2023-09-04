// 1. Imports: Dependencies
import React, { useRef, useState, useEffect } from 'react'

// 2. Imports: Styles
import styles from './DatePicker.module.css'

// 3. Imports: Components
import Calendar from './Calendar'
import CalendarButton from './CalendarButton'
import MaskedInput from './MaskedInput'

// 4. Imports: Hooks
import useDateValidation from './hooks/useDateValidation'
import useEscapeKey from './hooks/useEscapeKey'
import useDatePickerState from './hooks/useDatePickerState'
import useOutsideInteractions from './hooks/useOutsideInteractions'

// 5. Imports: Utilities and Handlers
import getTranslations from './utils/translate'
import { reorderDays } from './utils/viewUtils'
import {
  formatDatePickerDate,
  convertFormattedStringToDate,
} from './utils/dateFunctions'
import { handlePropsAndConfig } from './utils/propsAndConfig'
import {
  toggleCalendarVisibility,
  handleDateSelect,
  createEscapeHandler,
  updateInput,
  handleEmptyInput,
  handleValidDate,
  handleIncompleteInput,
} from './utils/dateInputHandlers'

// 6. Component Definition
function DatePicker({
  id,
  name,
  value,
  onChange,
  language: propLanguage,
  minYear: propMinYear,
  maxYear: propMaxYear,
  manualInputEnabled: propManualInputEnabled,
  dateFormat: propDateFormat,
  yearBlockSize: propYearBlockSize,
  designType: propDesignType,
  onClose,
  ...configProps
}) {
  // console.log(typeof value, value)
  // 6.1 Configuration and State Initialization
  const {
    language,
    useIcons,
    dateFormat,
    customStyles,
    startOfWeek,
    manualInputEnabled,
    minYear,
    maxYear,
    yearBlockSize,
    designType,
  } = handlePropsAndConfig({
    ...configProps,
    language: propLanguage,
    minYear: propMinYear,
    maxYear: propMaxYear,
    manualInputEnabled: propManualInputEnabled,
    yearBlockSize: propYearBlockSize,
    designType: propDesignType,
    dateFormat: propDateFormat,
  })

  // 6.3 Validation Hooks
  const [error, validate, setError] = useDateValidation(
    dateFormat,
    minYear,
    maxYear,
    language,
  )

  // Définition de checkError
  const checkError = () => error !== null
  const { showCalendar, inputValue, toggleCalendar, closeCalendar, setInput } =
    useDatePickerState(value, dateFormat, onClose, checkError, setError)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const calendarRef = useRef(null)
  const buttonRef = useRef(null)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (error) {
      setSelectedDate(new Date())
    }
  }, [error])

  useEscapeKey(createEscapeHandler(closeCalendar, inputRef))
  useOutsideInteractions(calendarRef, buttonRef, closeCalendar)

  // 6.5 Handlers
  const onDateSelect = handleDateSelect(
    setInput,
    setSelectedDate,
    closeCalendar,
    validate,
    formatDatePickerDate,
    dateFormat,
    onChange,
    name,
  )

  const handleInputChange = (e) => {
    const newValue = e.target.value
    updateInput(setInput, newValue)

    if (!newValue) {
      handleEmptyInput(name, onChange, setError, setSelectedDate)
      return
    }

    if (newValue.length >= 10) {
      if (validate(newValue)) {
        handleValidDate(
          newValue,
          name,
          onChange,
          setError,
          setSelectedDate,
          convertFormattedStringToDate,
          dateFormat,
        )
        closeCalendar()
        inputRef.current.blur()
        toggleCalendar()
      }
    } else {
      handleIncompleteInput(newValue, name, onChange, setError)
    }
  }

  const onToggleCalendarVisibility = toggleCalendarVisibility(toggleCalendar)

  // 6.6 Derived Data & Effects
  const translations = getTranslations(language)
  const reorderedDays = reorderDays(translations.days, startOfWeek)

  // 5. Component Render
  return (
    <div ref={containerRef} className={styles.container} style={customStyles}>
      <div className={styles.inputContainer} style={customStyles}>
        <MaskedInput
          id={id}
          ref={inputRef}
          value={inputValue}
          format={dateFormat}
          onBlur={manualInputEnabled ? handleInputChange : null}
          placeholder={translations.placeholder}
          aria-label="Selected date"
          readOnly={!manualInputEnabled}
          className={error ? styles.errorInput : ''}
          onClick={onToggleCalendarVisibility}
          onChange={handleInputChange}
          maxLength={10}
        />

        <CalendarButton ref={buttonRef} onClick={onToggleCalendarVisibility} />
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {showCalendar && (
        <Calendar
          designType={designType}
          startOfWeek={startOfWeek}
          selectDate={onDateSelect}
          closeCalendar={closeCalendar}
          useIcons={useIcons}
          translations={translations}
          language={language}
          reorderedDays={reorderedDays}
          ref={calendarRef}
          role="grid"
          isCalendarVisible={showCalendar}
          selectedDate={selectedDate}
          minYear={minYear}
          maxYear={maxYear}
          yearBlockSize={yearBlockSize}
        />
      )}
    </div>
  )
}

export default DatePicker
