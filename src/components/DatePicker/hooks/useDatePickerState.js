import { useState } from 'react'
import { formatDatePickerDate } from '../utils/dateFunctions'

function useDatePickerState(
  initialValue,
  dateFormat,
  onClose,
  checkError,
  setError,
  // error,
) {
  // Gestion de l'affichage du calendrier
  const [showCalendar, setShowCalendar] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [lastDateBeforeHomeClick, setLastDateBeforeHomeClick] = useState(null)

  // Gestion de la valeur saisie
  const [inputValue, setInputValue] = useState(
    formatDatePickerDate(initialValue, dateFormat),
  )

  // Fonction pour basculer l'affichage du calendrier
  function toggleCalendar() {
    setShowCalendar((prev) => !prev)
  }

  // Fonction pour fermer le calendrier
  function closeCalendar() {
    const hasError = checkError ? checkError() : false

    if (hasError) {
      setInput('') // Réinitialise la valeur d'entrée en cas d'erreur
      setError(null) // Réinitialise l'état de l'erreur
    }

    if (onClose) {
      onClose(hasError)
    }

    setShowCalendar(false)
  }

  // Fonction pour mettre à jour la valeur saisie
  function setInput(date) {
    if (date === '') {
      setInputValue('') // Autoriser une valeur vide
    } else {
      setInputValue(formatDatePickerDate(date, dateFormat))
    }
  }
  // Fonction pour gérer l'obtention du focus
  function handleFocus() {
    setIsFocused(true)
    setShowCalendar(true) // Afficher le calendrier lorsque l'input obtient le focus
  }

  // Fonction pour gérer la perte du focus
  function handleBlur() {
    setIsFocused(false)
    setShowCalendar(false) // Masquer le calendrier lorsque l'input perd le focus
    if (onClose) {
      onClose()
    }
  }

  function saveLastDateBeforeHomeClick(date) {
    setLastDateBeforeHomeClick(date)
  }

  return {
    showCalendar,
    inputValue,
    isFocused,
    toggleCalendar,
    closeCalendar,
    setInput,
    handleFocus,
    handleBlur,
    lastDateBeforeHomeClick,
    saveLastDateBeforeHomeClick,
  }
}

export default useDatePickerState
