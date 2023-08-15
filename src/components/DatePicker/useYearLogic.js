import { START_YEAR, END_YEAR, YEAR_BLOCK_SIZE } from './config/defaultConfig'

const useYearLogic = () => {
  const today = new Date()
  const thisYear = today.getFullYear()
  const initialMonth = new Date(thisYear, today.getMonth())

  // Bloc actuel de 16 ans basé sur l'année courante
  const yearBlockStart = END_YEAR - ((END_YEAR - START_YEAR) % YEAR_BLOCK_SIZE)

  const yearsBlock = Array.from(
    { length: YEAR_BLOCK_SIZE },
    (_, i) => yearBlockStart + i,
  )

  // Génération du tableau des années
  const years = Array.from(
    { length: END_YEAR - START_YEAR + 1 },
    (_, i) => START_YEAR + i,
  )

  return { today, thisYear, initialMonth, years, yearsBlock }
}

export default useYearLogic
