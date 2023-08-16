import React, { useRef } from 'react'
import styles from './DatePicker.module.css'
import Calendar from './Calendar'
import getTranslations from './translate'
import useDateValidation from './useDateValidation'
import { reorderDays } from './utils/viewUtils'
import useOutsideClick from './useOutsideClick'
import { formatDatePickerDate } from './utils/dateFunctions'
import useEscapeKey from './useEscapeKey'
import CalendarButton from './CalendarButton'
import useDatePickerState from './useDatePickerState'

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
  minYear = 1900,
  maxYear = 2100,
}) {
  const { showCalendar, inputValue, toggleCalendar, closeCalendar, setInput } =
    useDatePickerState(value, dateFormat, onClose)

  const [error, validateDate] = useDateValidation(
    inputValue,
    dateFormat,
    minYear,
    maxYear,
  )

  const translations = getTranslations(language)
  const reorderedDays = reorderDays(translations.days, startOfWeek)

  const calendarRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(calendarRef, buttonRef, closeCalendar)

  function handleDateSelect(date) {
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

  function handleInputChange(e) {
    const newValue = e.target.value

    if (validateDate(newValue)) {
      onChange({
        target: {
          name,
          value: newValue,
        },
      })
    }
  }

  useEscapeKey(closeCalendar)

  return (
    <div className={styles.container} style={customStyles}>
      <div className={styles.containerInput}>
        <input
          type="text"
          value={inputValue}
          onChange={manualInputEnabled ? handleInputChange : null}
          placeholder={translations.placeholder}
          aria-label="Selected date"
          readOnly={!manualInputEnabled}
          className={error ? styles.errorInput : ''}
          onClick={toggleCalendar}
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
