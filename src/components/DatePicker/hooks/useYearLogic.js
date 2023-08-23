import { useState } from 'react'
import { START_YEAR, END_YEAR, YEAR_BLOCK_SIZE } from '../config/defaultConfig'

const useYearLogic = () => {
  const today = new Date()
  const thisYear = today.getFullYear()
  const initialMonth = new Date(thisYear, today.getMonth())

  // Bloc actuel de 16 ans (ou la valeur de YEAR_BLOCK_SIZE) basé sur l'année courante
  const calculateYearBlockStart = () => {
    return END_YEAR - ((END_YEAR - START_YEAR) % YEAR_BLOCK_SIZE)
  }

  const [yearsBlock, setYearsBlock] = useState(() => {
    const yearBlockStart = calculateYearBlockStart()
    return Array.from({ length: YEAR_BLOCK_SIZE }, (_, i) => yearBlockStart + i)
  })

  // Génération du tableau des années
  const years = Array.from(
    { length: END_YEAR - START_YEAR + 1 },
    (_, i) => START_YEAR + i,
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
