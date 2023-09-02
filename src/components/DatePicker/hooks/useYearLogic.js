import { useState } from 'react'
import { DEFAULT_CONFIG } from '../config/defaultConfig'

const useYearLogic = (
  minYear = DEFAULT_CONFIG.MIN_YEAR,
  maxYear = DEFAULT_CONFIG.MAX_YEAR,
  yearBlockSize = DEFAULT_CONFIG.YEAR_BLOCK_SIZE,
) => {
  const today = new Date()
  const thisYear = today.getFullYear()
  const initialMonth = new Date(thisYear, today.getMonth())

  // Bloc actuel basé sur l'année courante
  const calculateYearBlockStart = (currentYear) => {
    const yearsSinceStart = currentYear - minYear
    return currentYear - (yearsSinceStart % yearBlockSize)
  }

  const [yearsBlock, setYearsBlock] = useState(() => {
    const yearBlockStart = calculateYearBlockStart(thisYear)
    return Array.from({ length: yearBlockSize }, (_, i) => yearBlockStart + i)
  })

  // Génération du tableau des années
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i,
  )

  return {
    today,
    thisYear,
    initialMonth,
    years,
    yearsBlock,
    setYearsBlock,
    yearBlockSize,
  }
}

export default useYearLogic
