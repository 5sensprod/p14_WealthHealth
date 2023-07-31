export const debounce = (func, delay) => {
  let inDebounce

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(inDebounce)
      func(...args)
    }

    clearTimeout(inDebounce)
    inDebounce = setTimeout(later, delay)
  }
}
