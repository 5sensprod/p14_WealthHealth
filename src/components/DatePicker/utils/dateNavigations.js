import { DEFAULT_CONFIG } from '../config/defaultConfig'

// ========== DATE NAVIGATION ==========

const adjustDate = (currentDate, yearAdjustment, monthAdjustment) => {
  const year = currentDate.getFullYear() + yearAdjustment
  const month = (currentDate.getMonth() + monthAdjustment + 12) % 12
  return new Date(year, month)
}

export const goToNextMonth = (currentDate, minYear, maxYear) => {
  const nextDate = adjustDate(
    currentDate,
    currentDate.getMonth() === 11 ? 1 : 0,
    1,
  )
  if (nextDate.getFullYear() > maxYear) {
    return new Date(maxYear, 11) // ou retourner à minYear, 0 selon votre besoin
  }
  return nextDate
}

export const goToPreviousMonth = (currentDate, minYear, maxYear) => {
  const prevDate = adjustDate(
    currentDate,
    currentDate.getMonth() === 0 ? -1 : 0,
    -1,
  )
  if (prevDate.getFullYear() < minYear) {
    return new Date(minYear, 0) // ou retourner à maxYear, 11 selon votre besoin
  }
  return prevDate
}
export const goToNextYear = (currentDate, minYear, maxYear) => {
  const nextDate = adjustDate(currentDate, 1, 0)
  if (nextDate.getFullYear() > maxYear) {
    return new Date(maxYear, currentDate.getMonth())
  }
  return nextDate
}

export const goToPreviousYear = (currentDate, minYear, maxYear) => {
  const prevDate = adjustDate(currentDate, -1, 0)
  if (prevDate.getFullYear() < minYear) {
    return new Date(minYear, currentDate.getMonth())
  }
  return prevDate
}
export const goToNextYearBlock = (yearsBlock, minYear, maxYear) => {
  if (isNaN(yearsBlock[0])) return yearsBlock
  const newStartYear = yearsBlock[0] + DEFAULT_CONFIG.YEAR_BLOCK_SIZE
  const baseYear = newStartYear > maxYear ? minYear : newStartYear
  return Array.from(
    { length: DEFAULT_CONFIG.YEAR_BLOCK_SIZE },
    (_, i) => baseYear + i,
  )
}

export const goToPreviousYearBlock = (yearsBlock, minYear, maxYear) => {
  if (isNaN(yearsBlock[0])) return yearsBlock
  const newStartYear = yearsBlock[0] - DEFAULT_CONFIG.YEAR_BLOCK_SIZE
  const baseYear =
    newStartYear < minYear
      ? maxYear - DEFAULT_CONFIG.YEAR_BLOCK_SIZE + 1
      : newStartYear
  return Array.from(
    { length: DEFAULT_CONFIG.YEAR_BLOCK_SIZE },
    (_, i) => baseYear + i,
  )
}

// ========== DATE NAVIGATION ==========
export function calculateNewDate(
  view,
  direction,
  yearsBlock,
  prev,
  minYear,
  maxYear,
) {
  let newDate = prev
  let newYearBlock = yearsBlock

  switch (view) {
    case 'months':
      newDate =
        direction === 'prev'
          ? goToPreviousYear(prev, minYear, maxYear)
          : goToNextYear(prev, minYear, maxYear)
      break
    case 'days':
      newDate =
        direction === 'prev'
          ? goToPreviousMonth(prev, minYear, maxYear)
          : goToNextMonth(prev, minYear, maxYear)
      break
    case 'years':
      newYearBlock =
        direction === 'prev'
          ? goToPreviousYearBlock(yearsBlock, minYear, maxYear)
          : goToNextYearBlock(yearsBlock, minYear, maxYear)
      break
    default:
      break
  }

  return { newDate, newYearBlock }
}
