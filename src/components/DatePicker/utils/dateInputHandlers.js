// Pas besoin d'importer convertFormattedStringToDate ici, car c'est un argument.

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
