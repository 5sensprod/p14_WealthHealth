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

    setInput(actualDate) // Ceci affecte la valeur à l'input visuel, donc utilisez `dateFormat`
    setSelectedDate(actualDate)
    closeCalendar()

    // Validez la nouvelle valeur ici avec le format d'affichage (dateFormat)
    validate(formatDatePickerDate(actualDate, dateFormat))

    // Quand vous envoyez la valeur en dehors, utilisez `outputFormat`
    onChange({
      target: {
        name,
        value: formatDatePickerDate(actualDate, outputFormat),
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
