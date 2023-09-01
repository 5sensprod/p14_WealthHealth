// 1. Imports: Dependencies
import React, { useRef, useState } from 'react'

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
import useOutsideClick from './hooks/useOutsideClick'
import useFocusAndClickOutside from './hooks/useFocusAndClickOutside'

// 5. Imports: Utilities and Handlers
import getTranslations from './translate'
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
} from './utils/datepickerHandlers'
import {
  updateInput,
  handleEmptyInput,
  handleValidDate,
  handleIncompleteInput,
} from './utils/dateInputHandlers'

// 6. Component Definition
function DatePicker({
  name,
  value,
  onChange,
  language: propLanguage,
  minYear: propMinYear, // renommez ces
  maxYear: propMaxYear, // deux lignes
  manualInputEnabled: propManualInputEnabled,
  dateFormat: propDateFormat,
  yearBlockSize: propYearBlockSize,
  designType: propDesignType,
  onClose,
  ...configProps
}) {
  // 6.1 Configuration and State Initialization
  const {
    language,
    useIcons,
    dateFormat,
    outputFormat,
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
  })
  // 6.2 State & Refs Initialization

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

  // 6.4 Effects
  // useEffect(() => {
  //   setInput(value)
  // }, [value, setInput])

  useOutsideClick(calendarRef, buttonRef, closeCalendar)
  useEscapeKey(createEscapeHandler(closeCalendar, inputRef))
  useFocusAndClickOutside(containerRef, closeCalendar)

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
    outputFormat,
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
