export function handleNavigationKeys(
  e,
  index,
  maxIndex,
  action,
  refsArray,
  getItem,
  closeCalendar,
  setCurrentMonth,
  getCurrentMonth,
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
      // console.log('Enter or Space pressed')
      const item = getItem ? getItem(index) : index
      action(item)
      e.preventDefault()
      break

    case 'Tab':
      // Ne faites rien ici, nous traiterons la logique de Tab dans handleDayKeyDown.
      break
    default:
      break
  }
}
