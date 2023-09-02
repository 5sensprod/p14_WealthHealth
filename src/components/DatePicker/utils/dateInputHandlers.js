export const updateInput = (setInput, newValue) => {
  setInput(newValue)
}

export const handleEmptyInput = (name, onChange, setError, setSelectedDate) => {
  setError(null)
  onChange({ target: { name, value: '' } })
  setSelectedDate(new Date())
}

export const handleValidDate = (
  newValue,
  name,
  onChange,
  setError,
  setSelectedDate,
  convertFormattedStringToDate, // Déjà un argument
  dateFormat,
) => {
  setError(null)
  const dateObject = convertFormattedStringToDate(newValue, dateFormat)
  setSelectedDate(dateObject)
  onChange({ target: { name, value: dateObject } })
}

export const handleInvalidDate = (name, onChange) => {
  onChange({ target: { name, value: '' } })
}

export const handleIncompleteInput = (newValue, name, onChange, setError) => {
  setError(null)
  onChange({ target: { name, value: newValue } })
}

export const toggleCalendarVisibility = (toggleCalendar) => (event) => {
  event.stopPropagation()
  toggleCalendar()
}

export const handleDateSelect =
  (
    setInput,
    setSelectedDate,
    closeCalendar,
    validate,
    formatDatePickerDate,
    dateFormat,
    onChange,
    name,
  ) =>
  (date) => {
    const actualDate = typeof date === 'string' ? new Date(date) : date

    setInput(actualDate)
    setSelectedDate(actualDate)
    closeCalendar()

    validate(formatDatePickerDate(actualDate, dateFormat))

    onChange({
      target: {
        name,
        value: formatDatePickerDate(actualDate, dateFormat),
      },
    })
  }

export const createEscapeHandler = (closeCalendar, inputRef) => {
  return () => {
    if (inputRef && inputRef.current) {
      inputRef.current.blur()
    }
    closeCalendar()
  }
}
