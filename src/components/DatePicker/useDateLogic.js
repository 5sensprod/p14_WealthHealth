import { START_YEAR, END_YEAR } from './utils'

const useDateLogic = () => {
  const today = new Date()
  const thisYear = today.getFullYear()
  const initialMonth = new Date(thisYear, today.getMonth())

  // Bloc actuel de 16 ans basé sur l'année courante
  const yearBlockStart = END_YEAR - ((END_YEAR - START_YEAR) % 16)

  const yearsBlock = Array.from({ length: 16 }, (_, i) => yearBlockStart + i)

  // Génération du tableau des années
  const years = Array.from(
    { length: END_YEAR - START_YEAR + 1 },
    (_, i) => START_YEAR + i,
  )

  return { today, thisYear, initialMonth, years, yearsBlock }
}

export default useDateLogic
