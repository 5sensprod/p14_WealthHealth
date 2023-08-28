import { DEFAULT_CONFIG } from '../config/defaultConfig'

// ========== DATE NAVIGATION ==========

const adjustDate = (currentDate, yearAdjustment, monthAdjustment) => {
  const year = currentDate.getFullYear() + yearAdjustment
  const month = (currentDate.getMonth() + monthAdjustment + 12) % 12
  return new Date(year, month)
}

export const goToNextMonth = (currentDate) => {
  if (
    currentDate.getMonth() === 11 &&
    currentDate.getFullYear() === DEFAULT_CONFIG.MAX_YEAR
  ) {
    return new Date(DEFAULT_CONFIG.MIN_YEAR, 0)
  }
  return adjustDate(currentDate, currentDate.getMonth() === 11 ? 1 : 0, 1)
}

export const goToPreviousMonth = (currentDate) => {
  if (
    currentDate.getMonth() === 0 &&
    currentDate.getFullYear() === DEFAULT_CONFIG.MIN_YEAR
  ) {
    return new Date(DEFAULT_CONFIG.MAX_YEAR, 11)
  }
  return adjustDate(currentDate, currentDate.getMonth() === 0 ? -1 : 0, -1)
}

export const goToNextYear = (currentDate) => {
  return currentDate.getFullYear() === DEFAULT_CONFIG.MAX_YEAR
    ? new Date(DEFAULT_CONFIG.MIN_YEAR, currentDate.getMonth())
    : adjustDate(currentDate, 1, 0)
}

export const goToPreviousYear = (currentDate) => {
  return currentDate.getFullYear() === DEFAULT_CONFIG.MIN_YEAR
    ? new Date(DEFAULT_CONFIG.MAX_YEAR, currentDate.getMonth())
    : adjustDate(currentDate, -1, 0)
}

export const goToNextYearBlock = (yearsBlock) => {
  const newStartYear = yearsBlock[0] + DEFAULT_CONFIG.YEAR_BLOCK_SIZE
  const baseYear =
    newStartYear > DEFAULT_CONFIG.MAX_YEAR
      ? DEFAULT_CONFIG.MIN_YEAR
      : newStartYear
  return Array.from(
    { length: DEFAULT_CONFIG.YEAR_BLOCK_SIZE },
    (_, i) => baseYear + i,
  )
}

export const goToPreviousYearBlock = (yearsBlock) => {
  const newStartYear = yearsBlock[0] - DEFAULT_CONFIG.YEAR_BLOCK_SIZE
  const baseYear =
    newStartYear < DEFAULT_CONFIG.MIN_YEAR
      ? DEFAULT_CONFIG.MAX_YEAR - DEFAULT_CONFIG.YEAR_BLOCK_SIZE + 1
      : newStartYear
  return Array.from(
    { length: DEFAULT_CONFIG.YEAR_BLOCK_SIZE },
    (_, i) => baseYear + i,
  )
}

// ========== DATE NAVIGATION ==========
export function calculateNewDate(view, direction, yearsBlock, prev) {
  let newDate = prev
  let newYearBlock = yearsBlock

  switch (view) {
    case 'months':
      newDate =
        direction === 'prev'
          ? goToPreviousYear(
              prev,
              DEFAULT_CONFIG.MIN_YEAR,
              DEFAULT_CONFIG.MAX_YEAR,
            )
          : goToNextYear(prev, DEFAULT_CONFIG.MAX_YEAR)
      break
    case 'days':
      newDate =
        direction === 'prev' ? goToPreviousMonth(prev) : goToNextMonth(prev)
      break
    case 'years':
      newYearBlock =
        direction === 'prev'
          ? goToPreviousYearBlock(yearsBlock, new Date().getFullYear())
          : goToNextYearBlock(yearsBlock, new Date().getFullYear())
      break
    default:
      break
  }

  return { newDate, newYearBlock }
}
