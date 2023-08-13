import { startYear } from './constants' // Si startYear est défini dans un autre fichier

const useDateLogic = () => {
  const today = new Date()
  const thisYear = today.getFullYear()
  const initialMonth = new Date(thisYear, today.getMonth())
  const currentYear = new Date().getFullYear()
  const endYear = currentYear + 2 // L'année actuelle + 2
  // Bloc actuel de 16 ans basé sur l'année courante
  const yearBlockStart = currentYear - ((currentYear - startYear) % 16)

  const yearsBlock = Array.from({ length: 16 }, (_, i) => yearBlockStart + i)

  // Génération du tableau des années
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i,
  )

  return { today, thisYear, initialMonth, currentYear, years, yearsBlock }
}

export default useDateLogic
