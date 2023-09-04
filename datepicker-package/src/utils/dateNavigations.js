import { DEFAULT_CONFIG } from '../config/defaultConfig'

// Fonction pour les configurations d'années
const processYearConfig = (yearConfig, currentYear) => {
  if (typeof yearConfig === 'number') return yearConfig

  if (typeof yearConfig === 'string') {
    const match = yearConfig.match(/(auto|actual)([+-]\d+)?/)
    if (match) {
      const base = currentYear
      const offset = parseInt(match[2], 10) || 0
      return base + offset
    }
  }

  // retourner null si la configuration de l'année n'est pas valide
  return null
}

const adjustDate = (currentDate, yearAdjustment, monthAdjustment) => {
  const year = currentDate.getFullYear() + yearAdjustment
  const month = (currentDate.getMonth() + monthAdjustment + 12) % 12
  return new Date(year, month)
}

export const applyYearConfig = (yearConfig, currentYear) => {
  return processYearConfig(yearConfig, currentYear)
}

export const goToNextMonth = (currentDate, minYear, maxYear) => {
  const nextDate = adjustDate(
    currentDate,
    currentDate.getMonth() === 11 ? 1 : 0,
    1,
  )
  if (nextDate.getFullYear() > applyYearConfig(maxYear)) {
    return new Date(applyYearConfig(maxYear), 11)
  }
  return nextDate
}

export const goToPreviousMonth = (currentDate, minYear, maxYear) => {
  const prevDate = adjustDate(
    currentDate,
    currentDate.getMonth() === 0 ? -1 : 0,
    -1,
  )
  if (prevDate.getFullYear() < applyYearConfig(minYear)) {
    return new Date(applyYearConfig(minYear), 0)
  }
  return prevDate
}

export const goToNextYear = (currentDate, minYear, maxYear) => {
  const nextDate = adjustDate(currentDate, 1, 0)
  if (nextDate.getFullYear() > applyYearConfig(maxYear)) {
    return new Date(applyYearConfig(maxYear), currentDate.getMonth())
  }
  return nextDate
}

export const goToPreviousYear = (currentDate, minYear, maxYear) => {
  const prevDate = adjustDate(currentDate, -1, 0)
  if (prevDate.getFullYear() < applyYearConfig(minYear)) {
    return new Date(applyYearConfig(minYear), currentDate.getMonth())
  }
  return prevDate
}

export const goToPreviousYearBlock = (
  yearsBlock,
  minYear,
  maxYear,
  yearBlockSize,
) => {
  const blockSize = yearBlockSize || DEFAULT_CONFIG.YEAR_BLOCK_SIZE
  const minProcessedYear = applyYearConfig(minYear, new Date().getFullYear())
  const maxProcessedYear = applyYearConfig(maxYear, new Date().getFullYear())

  let newStartYear = yearsBlock[0] - blockSize

  // Si nous sommes en dessous de minYear
  if (newStartYear < minProcessedYear) {
    // Si le premier élément du bloc actuel est déjà minYear, affichez les deux dernières années avant maxYear
    if (yearsBlock[0] === minProcessedYear) {
      newStartYear = maxProcessedYear - 1 // Affichez les 2 dernières années avant maxYear
    } else {
      newStartYear = maxProcessedYear - blockSize + 1 // Commencez par maxYear - blockSize + 1
    }
  }

  return Array.from({ length: blockSize }, (_, i) => newStartYear + i).filter(
    (year) => year >= minProcessedYear && year <= maxProcessedYear,
  )
}

export const goToNextYearBlock = (
  yearsBlock,
  minYear,
  maxYear,
  yearBlockSize,
) => {
  const blockSize = yearBlockSize || DEFAULT_CONFIG.YEAR_BLOCK_SIZE
  const minProcessedYear = applyYearConfig(minYear, new Date().getFullYear())
  const maxProcessedYear = applyYearConfig(maxYear, new Date().getFullYear())

  let newStartYear = yearsBlock[0] + blockSize

  if (newStartYear > maxProcessedYear) {
    newStartYear = minProcessedYear
  }

  return Array.from({ length: blockSize }, (_, i) => newStartYear + i).filter(
    (year) => year >= minProcessedYear && year <= maxProcessedYear,
  )
}

export const calculateNewDate = (
  view,
  direction,
  yearsBlock,
  prev,
  minYear,
  maxYear,
  yearBlockSize,
) => {
  const currentYear = new Date().getFullYear()
  const minProcessedYear = applyYearConfig(minYear, currentYear)
  const maxProcessedYear = applyYearConfig(maxYear, currentYear)

  let newDate = prev
  let newYearBlock = yearsBlock

  switch (view) {
    case 'months':
      newDate =
        direction === 'prev'
          ? goToPreviousYear(prev, minProcessedYear, maxProcessedYear)
          : goToNextYear(prev, minProcessedYear, maxProcessedYear)
      break
    case 'days':
      newDate =
        direction === 'prev'
          ? goToPreviousMonth(prev, minProcessedYear, maxProcessedYear)
          : goToNextMonth(prev, minProcessedYear, maxProcessedYear)
      break
    case 'years':
      newYearBlock =
        direction === 'prev'
          ? goToPreviousYearBlock(
              yearsBlock,
              minProcessedYear,
              maxProcessedYear,
              yearBlockSize,
            )
          : goToNextYearBlock(
              yearsBlock,
              minProcessedYear,
              maxProcessedYear,
              yearBlockSize,
            )
      break
    default:
      break
  }

  return { newDate, newYearBlock }
}

export function handleNavigationKeys(
  e,
  index,
  maxIndex,
  action,
  refsArray,
  getItem,
  closeCalendar,
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
      if (index < maxIndex) {
        refsArray[index + 1].focus()
      }
      break
    default:
      break
  }
}
