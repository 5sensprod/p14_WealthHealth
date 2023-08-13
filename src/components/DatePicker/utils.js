export const START_YEAR = 1930
export const END_YEAR = new Date().getFullYear() + 2

export function abbreviateMonth(month) {
  return month.length > 5 ? month.substring(0, 4) + '.' : month
}

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
  const newStartYear = yearsBlock[0] + 16
  const baseYear = newStartYear > END_YEAR ? START_YEAR : newStartYear
  return Array.from({ length: 16 }, (_, i) => baseYear + i)
}

export const goToPreviousYearBlock = (yearsBlock) => {
  const newStartYear = yearsBlock[0] - 16
  const baseYear = newStartYear < START_YEAR ? END_YEAR - 15 : newStartYear
  return Array.from({ length: 16 }, (_, i) => baseYear + i)
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
