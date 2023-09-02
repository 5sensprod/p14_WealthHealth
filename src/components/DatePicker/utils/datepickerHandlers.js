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
    outputFormat,
  ) =>
  (date) => {
    const actualDate = typeof date === 'string' ? new Date(date) : date

    setInput(actualDate)
    setSelectedDate(actualDate)
    closeCalendar()

    // Valide la nouvelle valeur ici avec le format d'affichage (dateFormat)
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
