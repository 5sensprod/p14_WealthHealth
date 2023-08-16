export function handleNavigationKeys(
  e,
  index,
  maxIndex,
  action,
  refsArray,
  getItem,
  closeCalendar,
  setCurrentMonth, // Ajoutez ce paramètre
  currentMonth, // Ajoutez ce paramètre
) {
  switch (e.key) {
    case 'ArrowRight':
      if (index < maxIndex) {
        refsArray[index + 1].focus()
      }
      break
    case 'ArrowLeft':
      if (index > 0) {
        refsArray[index - 1].focus()
      }
      break
    case 'Escape':
      if (typeof closeCalendar === 'function') {
        closeCalendar()
      }
      break
    case 'Enter':
    case 'Space':
      const item = getItem ? getItem(index) : index
      action(item)
      e.preventDefault()
      break

    case 'Tab':
      if (e.shiftKey && index === 0) {
        // Si Shift+Tab est pressé sur le premier jour
        const newMonth = updateMonth(currentMonth, 'backward')
        setCurrentMonth(newMonth)
        // Vous pourriez avoir besoin d'une logique supplémentaire pour déplacer le focus
        // sur le dernier jour du mois précédent une fois que le state est mis à jour.
        // Cela peut nécessiter l'utilisation d'un effet pour surveiller les changements
        // dans `currentMonth`.
      }
      break
    default:
      break
  }
}
function updateMonth(currentMonth, direction) {
  const newDate = new Date(currentMonth)

  if (direction === 'forward') {
    newDate.setMonth(currentMonth.getMonth() + 1)
  } else if (direction === 'backward') {
    newDate.setMonth(currentMonth.getMonth() - 1)
  }

  return newDate
}
