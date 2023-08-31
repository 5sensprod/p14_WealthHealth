import { DEFAULT_CONFIG } from '../config/defaultConfig'

// Fonction de traitement plus stricte pour les configurations d'années
const processYearConfig = (yearConfig, currentYear) => {
  if (typeof yearConfig === 'number') return yearConfig

  if (typeof yearConfig === 'string') {
    const match = yearConfig.match(/(auto|actual)([+-]\d+)?/)
    if (match) {
      const base = currentYear // Redondance éliminée
      const offset = parseInt(match[2], 10) || 0
      return base + offset
    }
  }

  return currentYear
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
  console.log(
    'Valeur traitée de minYear dans goToNextMonth:',
    applyYearConfig(minYear),
  )
  console.log(
    'Valeur traitée de maxYear dans goToNextMonth:',
    applyYearConfig(maxYear),
  )
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
  console.log(
    'Valeur traitée de minYear dans goToPreviousMonth:',
    applyYearConfig(minYear),
  )
  console.log(
    'Valeur traitée de maxYear dans goToPreviousMonth:',
    applyYearConfig(maxYear),
  )
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

export const goToNextYearBlock = (yearsBlock, minYear, maxYear) => {
  const maxProcessedYear = applyYearConfig(maxYear, new Date().getFullYear())
  const newStartYear = Math.min(
    yearsBlock[0] + DEFAULT_CONFIG.YEAR_BLOCK_SIZE,
    maxProcessedYear,
  )

  return Array.from({ length: DEFAULT_CONFIG.YEAR_BLOCK_SIZE }, (_, i) => {
    const year = newStartYear + i
    return year <= maxProcessedYear ? year : null // null ou un autre marqueur pour des années non-cliquables
  }).filter(Boolean) // Retirer cette ligne pour garder des places vides
}

export const goToPreviousYearBlock = (yearsBlock, minYear, maxYear) => {
  const minProcessedYear = applyYearConfig(minYear, new Date().getFullYear())
  const newStartYear = Math.max(
    yearsBlock[0] - DEFAULT_CONFIG.YEAR_BLOCK_SIZE,
    minProcessedYear,
  )

  return Array.from({ length: DEFAULT_CONFIG.YEAR_BLOCK_SIZE }, (_, i) => {
    const year = newStartYear + i
    return year >= minProcessedYear ? year : null // null ou un autre marqueur pour des années non-cliquables
  }).filter(Boolean) // Retirer cette ligne pour garder des places vides
}

export const calculateNewDate = (
  view,
  direction,
  yearsBlock,
  prev,
  minYear,
  maxYear,
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
            )
          : goToNextYearBlock(yearsBlock, minProcessedYear, maxProcessedYear)
      break
    default:
      break
  }

  return { newDate, newYearBlock }
}
