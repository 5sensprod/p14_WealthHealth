import { useState } from 'react'
import { DEFAULT_CONFIG } from '../config/defaultConfig'

const useYearLogic = () => {
  const today = new Date()
  const thisYear = today.getFullYear()
  const initialMonth = new Date(thisYear, today.getMonth())

  // Bloc actuel basé sur l'année courante
  const calculateYearBlockStart = (currentYear) => {
    const yearsSinceStart = currentYear - DEFAULT_CONFIG.MIN_YEAR
    return currentYear - (yearsSinceStart % DEFAULT_CONFIG.YEAR_BLOCK_SIZE)
  }

  const [yearsBlock, setYearsBlock] = useState(() => {
    const yearBlockStart = calculateYearBlockStart(thisYear)
    return Array.from(
      { length: DEFAULT_CONFIG.YEAR_BLOCK_SIZE },
      (_, i) => yearBlockStart + i,
    )
  })

  // Génération du tableau des années
  const years = Array.from(
    { length: DEFAULT_CONFIG.MAX_YEAR - DEFAULT_CONFIG.MIN_YEAR + 1 },
    (_, i) => DEFAULT_CONFIG.MIN_YEAR + i,
  )

  return {
    today,
    thisYear,
    initialMonth,
    years,
    yearsBlock,
    setYearsBlock,
  }
}

export default useYearLogic
