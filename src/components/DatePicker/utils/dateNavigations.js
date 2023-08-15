import { START_YEAR, END_YEAR, YEAR_BLOCK_SIZE } from '../config/defaultConfig'
// ========== MONTH NAVIGATION ==========

export const goToNextMonth = (currentDate) => {
  if (currentDate.getMonth() === 11 && currentDate.getFullYear() === END_YEAR) {
    return new Date(START_YEAR, 0) // Return to January of START_YEAR
  }
  const year =
    currentDate.getMonth() === 11
      ? currentDate.getFullYear() + 1
      : currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1) % 12
  return new Date(year, month)
}

export const goToPreviousMonth = (currentDate) => {
  if (
    currentDate.getMonth() === 0 &&
    currentDate.getFullYear() === START_YEAR
  ) {
    return new Date(END_YEAR, 11) // Retour à décembre de END_YEAR
  }
  const year =
    currentDate.getMonth() === 0
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear()
  const month = (currentDate.getMonth() - 1 + 12) % 12
  return new Date(year, month)
}

// ========== YEAR NAVIGATION ==========
export const goToNextYear = (currentDate) => {
  const year =
    currentDate.getFullYear() === END_YEAR
      ? START_YEAR
      : currentDate.getFullYear() + 1
  return new Date(year, currentDate.getMonth())
}

export const goToPreviousYear = (currentDate) => {
  if (currentDate.getFullYear() === START_YEAR) {
    return new Date(END_YEAR, currentDate.getMonth())
  }
  const year = currentDate.getFullYear() - 1
  return new Date(year, currentDate.getMonth())
}

export const goToNextYearBlock = (yearsBlock) => {
  const newStartYear = yearsBlock[0] + YEAR_BLOCK_SIZE
  const baseYear = newStartYear > END_YEAR ? START_YEAR : newStartYear
  return Array.from({ length: YEAR_BLOCK_SIZE }, (_, i) => baseYear + i)
}

export const goToPreviousYearBlock = (yearsBlock) => {
  const newStartYear = yearsBlock[0] - YEAR_BLOCK_SIZE
  const baseYear =
    newStartYear < START_YEAR ? END_YEAR - YEAR_BLOCK_SIZE + 1 : newStartYear
  return Array.from({ length: YEAR_BLOCK_SIZE }, (_, i) => baseYear + i)
}

export function getNewDate(view, direction, yearsBlock, prev) {
  if (view === 'months') {
    return direction === 'prev'
      ? goToPreviousYear(prev, START_YEAR, END_YEAR)
      : goToNextYear(prev, END_YEAR)
  }
  if (view === 'days') {
    return direction === 'prev' ? goToPreviousMonth(prev) : goToNextMonth(prev)
  }
  return prev // default
}

export function getNewYearBlock(view, direction, yearsBlock) {
  if (view !== 'years') return yearsBlock
  return direction === 'prev'
    ? goToPreviousYearBlock(yearsBlock, new Date().getFullYear())
    : goToNextYearBlock(yearsBlock, new Date().getFullYear())
}
