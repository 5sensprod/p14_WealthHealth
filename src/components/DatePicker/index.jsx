import React, { useRef, useState } from 'react'
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
import { DEFAULT_CONFIG } from './config/defaultConfig'

function DatePicker({
  name,
  value,
  onChange,
  useIcons = DEFAULT_CONFIG.USE_ICONS,
  language = DEFAULT_CONFIG.LANGUAGE,
  dateFormat = DEFAULT_CONFIG.DATE_FORMAT,
  customStyles = DEFAULT_CONFIG.CUSTOM_STYLES,
  onClose,
  startOfWeek = DEFAULT_CONFIG.START_OF_WEEK,
  manualInputEnabled = DEFAULT_CONFIG.MANUAL_INPUT_ENABLED,
  minYear = DEFAULT_CONFIG.MIN_YEAR,
  maxYear = DEFAULT_CONFIG.MAX_YEAR,
}) {
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

  const setClickedInside = useOutsideClick(calendarRef, buttonRef, () => {
    closeCalendar()
    setClosedByOutsideClick(true)
  })

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

    // Si la valeur est vide, réinitialisez l'erreur et sortez de la fonction
    if (!newValue) {
      setError(null)
      return
    }

    if (!validate(newValue)) {
      setError('Format de date invalide')
    } else {
      onChange({
        target: {
          name,
          value: newValue,
        },
      })
      setError(null)
    }
  }
  function handleInputTyping(e) {
    setInput(e.target.value)
  }

  useEscapeKey(closeCalendar)

  const [closedByOutsideClick, setClosedByOutsideClick] = useState(false)

  useOutsideClick(calendarRef, buttonRef, () => {
    closeCalendar()
    setClosedByOutsideClick(true)
  })

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
          onClick={() => {
            setClickedInside(true) // Mise à jour ici
            if (closedByOutsideClick) {
              setClosedByOutsideClick(false)
            } else {
              toggleCalendar()
            }
          }}
          onChange={handleInputTyping}
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
