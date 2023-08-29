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

export const handleInputChange =
  (
    setInput,
    setError,
    onChange,
    validate,
    dateFormat,
    convertFormattedStringToDate,
    name,
    closeCalendar,
    inputRef,
    toggleCalendar,
  ) =>
  (e) => {
    const newValue = e.target.value
    setInput(newValue) // Mettre à jour la valeur de l'input

    if (!newValue) {
      setError(null)
      onChange({ target: { name, value: '' } }) // Envoi de la valeur vide lors de l'effacement
      setInput(new Date()) // Réinitialiser à la date du jour
      return
    }

    if (newValue.length >= 10) {
      if (validate(newValue)) {
        setError(null)
        const dateObject = convertFormattedStringToDate(newValue, dateFormat)
        setInput(dateObject)
        onChange({ target: { name, value: dateObject } }) // Si valide, renvoyez la date

        closeCalendar()
        inputRef.current.blur()
        toggleCalendar()
      } else {
        onChange({ target: { name, value: '' } }) // Si invalide, renvoyez une chaîne vide
      }
    } else {
      setError(null)
      onChange({ target: { name, value: newValue } }) // Si incomplet, renvoyez la valeur actuelle
    }
  }
