import { useState } from 'react'
import { formatDatePickerDate } from '../utils/dateFunctions'

function useDatePickerState(initialValue, dateFormat, onClose) {
  // Gestion de l'affichage du calendrier
  const [showCalendar, setShowCalendar] = useState(false)

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
    setShowCalendar(false)
    if (onClose) {
      onClose()
    }
  }
  // Fonction pour mettre à jour la valeur saisie
  function setInput(date) {
    if (date === '') {
      setInputValue('') // Autoriser une valeur vide
    } else {
      setInputValue(formatDatePickerDate(date, dateFormat))
    }
  }
  return {
    showCalendar,
    inputValue,
    toggleCalendar,
    closeCalendar,
    setInput,
  }
}

export default useDatePickerState
