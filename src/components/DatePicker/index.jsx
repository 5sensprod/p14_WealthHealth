import React, { useRef, useEffect, useState } from 'react'

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
import { handlePropsAndConfig } from './utils/propsAndConfig'

import {
  toggleCalendarVisibility,
  handleDateSelect,
  handleInputChange,
} from './utils/datepickerHandlers'

function DatePicker({
  name,
  value,
  onChange,
  language,
  onClose,
  ...configProps
}) {
  const {
    useIcons,
    dateFormat,
    outputFormat,
    customStyles,
    startOfWeek,
    manualInputEnabled,
    minYear,
    maxYear,
  } = handlePropsAndConfig(configProps)

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
    setInput(newValue) // Mettre à jour la valeur de l'input

    if (!newValue) {
      setError(null)
      onChange({ target: { name, value: '' } }) // Envoi de la valeur vide lors de l'effacement
      setSelectedDate(new Date()) // Réinitialiser à la date du jour
      return
    }

    if (newValue.length >= 10) {
      if (validate(newValue)) {
        console.log('Validation Result:', true)
        setError(null)
        const dateObject = convertFormattedStringToDate(newValue, dateFormat)
        setSelectedDate(dateObject)
        onChange({ target: { name, value: dateObject } }) // Si valide, renvoyez la date

        closeCalendar()
        inputRef.current.blur()
        toggleCalendar()
      } else {
        console.log('Validation Result:', false)
        console.log(error)
        onChange({ target: { name, value: '' } }) // Si invalide, renvoyez une chaîne vide
      }
    } else {
      setError(null)
      onChange({ target: { name, value: newValue } }) // Si incomplet, renvoyez la valeur actuelle
    }
  }

  const onToggleCalendarVisibility = toggleCalendarVisibility(toggleCalendar)

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
          onClick={onToggleCalendarVisibility}
          onChange={handleInputChange}
        />

        <CalendarButton ref={buttonRef} onClick={onToggleCalendarVisibility} />
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {showCalendar && (
        <Calendar
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
        />
      )}
    </div>
  )
}

export default DatePicker
