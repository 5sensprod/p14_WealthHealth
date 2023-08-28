import React, { useRef, useEffect, useState } from 'react'

import { DEFAULT_CONFIG } from './config/defaultConfig'

import styles from './DatePicker.module.css'

import Calendar from './Calendar'
import CalendarButton from './CalendarButton'
import MaskedInput from './MaskedInput'

import useDateValidation from './hooks/useDateValidation'
import useEscapeKey from './hooks/useEscapeKey'
import useDatePickerState from './hooks/useDatePickerState'

import getTranslations from './translate'
import { reorderDays } from './utils/viewUtils'
import {
  formatDatePickerDate,
  convertFormattedStringToDate,
} from './utils/dateFunctions'

import useOutsideClick from './hooks/useOutsideClick'

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
  const [selectedDate, setSelectedDate] = useState(new Date())

  const calendarRef = useRef(null)
  const buttonRef = useRef(null)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  const [error, validate, setError] = useDateValidation(
    dateFormat,
    minYear,
    maxYear,
    language,
  )

  useEffect(() => {
    setInput(value)
  }, [value, setInput])

  // 3. Handlers
  const handleDateSelect = (date) => {
    const actualDate = typeof date === 'string' ? new Date(date) : date

    console.log('Selected Date:', actualDate)

    setInput(actualDate)
    setSelectedDate(actualDate)
    closeCalendar()

    // Validez la nouvelle valeur ici
    validate(formatDatePickerDate(actualDate, dateFormat))

    onChange({
      target: {
        name,
        value: formatDatePickerDate(actualDate, dateFormat, onClose),
      },
    })
  }

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setInput(newValue) // Mettre à jour la valeur de l'input

    if (!newValue) {
      setError(null)
      onChange({ target: { name, value: '' } }) // Envoi de la valeur vide lors de l'effacement
      return
    }

    if (newValue.length >= 10) {
      if (validate(newValue)) {
        setError(null)

        // Convertissez 'newValue' en objet Date
        const dateObject = convertFormattedStringToDate(newValue, dateFormat)
        setSelectedDate(dateObject)

        closeCalendar()
        inputRef.current.blur()
        toggleCalendar()
      }
    } else {
      setError(null)
    }
    onChange({ target: { name, value: newValue } })
  }

  const toggleCalendarVisibility = (event) => {
    event.stopPropagation()
    toggleCalendar()
  }

  // 4. Derived Data & Effects
  const translations = getTranslations(language)
  const reorderedDays = reorderDays(translations.days, startOfWeek)
  useOutsideClick(calendarRef, buttonRef, closeCalendar)

  const handleEscape = () => {
    if (inputRef.current) {
      inputRef.current.blur()
    }
    closeCalendar()
  }

  useEscapeKey(handleEscape)

  useEffect(() => {
    let timeoutId
    let isClicking = false

    const handleFocusOut = () => {
      timeoutId = setTimeout(() => {
        if (
          !isClicking &&
          containerRef.current &&
          !containerRef.current.contains(document.activeElement)
        ) {
          closeCalendar()
        }
      }, 0)
    }

    const handleFocusIn = () => {
      clearTimeout(timeoutId)
    }

    const handleClick = (event) => {
      if (event.type === 'mousedown') {
        isClicking = true
      } else if (event.type === 'mouseup') {
        isClicking = false
      }
    }

    const currentRef = containerRef.current
    if (currentRef) {
      currentRef.addEventListener('focusout', handleFocusOut)
      currentRef.addEventListener('focusin', handleFocusIn)
      currentRef.addEventListener('mousedown', handleClick)
      currentRef.addEventListener('mouseup', handleClick)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('focusout', handleFocusOut)
        currentRef.removeEventListener('focusin', handleFocusIn)
        currentRef.removeEventListener('mousedown', handleClick)
        currentRef.removeEventListener('mouseup', handleClick)
      }
    }
  }, [closeCalendar])

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
          selectedDate={selectedDate}
        />
      )}
    </div>
  )
}

export default DatePicker
