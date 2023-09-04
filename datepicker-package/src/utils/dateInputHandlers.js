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
  convertFormattedStringToDate,
  dateFormat,
) => {
  setError(null)
  const dateObject = convertFormattedStringToDate(newValue, dateFormat)
  setSelectedDate(dateObject)

  // Formater la date pour l'hôte en format 'YYYY-MM-DD'
  const formattedForHost = `${dateObject.getFullYear()}-${String(
    dateObject.getMonth() + 1,
  ).padStart(2, '0')}-${String(dateObject.getDate()).padStart(2, '0')}`

  onChange({ target: { name, value: formattedForHost } }) // nous passons cette valeur à l'hôte
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

    const formattedForDisplay = formatDatePickerDate(actualDate, dateFormat)
    validate(formattedForDisplay)

    // Maintenant, nous formaterons toujours la date pour l'hôte en format 'YYYY-MM-DD'
    const formattedForHost = `${actualDate.getFullYear()}-${String(
      actualDate.getMonth() + 1,
    ).padStart(2, '0')}-${String(actualDate.getDate()).padStart(2, '0')}`

    onChange({
      target: {
        name,
        value: formattedForHost, // nous passons cette valeur à l'hôte
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
