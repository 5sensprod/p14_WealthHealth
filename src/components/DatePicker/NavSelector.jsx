import React from 'react'
import { HomeIcon } from './Icons'
import ChevronButtons from './ChevronSelector'
import styles from './Calendar.module.css'
import Button from './Button'

import {
  DAYS,
  YEARS,
  switchToMonthView,
  toggleYearView,
  resetToCurrentDate,
} from './utils/viewUtils'

// Selecteur de mois
function MonthSelector({ currentMonth, months, view, setView }) {
  if (view !== DAYS) return null

  const handleMonthSelect = () => {
    setView(switchToMonthView(view))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Space') {
      handleMonthSelect()
      e.preventDefault()
    }
  }

  return (
    <Button
      onClick={handleMonthSelect}
      onKeyDown={handleKeyDown}
      className={styles.navButton}
      tabIndex={0}
    >
      {months[currentMonth.getMonth()]}
    </Button>
  )
}

// Selecteur d'année
function YearSelector({ currentMonth, view, setView, yearsBlock }) {
  const handleYearSelect = () => {
    setView(toggleYearView(view))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Space') {
      handleYearSelect()
      e.preventDefault()
    }
  }

  return (
    <Button
      onClick={handleYearSelect}
      onKeyDown={handleKeyDown}
      className={styles.navButton}
      tabIndex={0}
    >
      {view === YEARS
        ? `${yearsBlock[0]}-${yearsBlock[yearsBlock.length - 1]}`
        : currentMonth.getFullYear()}
    </Button>
  )
}

// Bouton pour revenir au mois courant
function HomeButton({ setCurrentMonth, setView }) {
  const handleHomeClick = () => {
    setCurrentMonth(resetToCurrentDate())
    setView(DAYS)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Space') {
      handleHomeClick()
      e.preventDefault() // Pour éviter le comportement par défaut de la touche 'Space'
    }
  }

  return (
    <Button
      onClick={handleHomeClick}
      onKeyDown={handleKeyDown}
      icon={HomeIcon}
      className={styles.navButton}
      tabIndex={0}
    />
  )
}

function NavSelector(props) {
  return (
    <>
      <div className={styles.NavSelector}>
        <MonthSelector {...props} />
        <YearSelector {...props} />
      </div>
      <div className={styles.homeSelector}>
        <HomeButton {...props} />
      </div>
      <ChevronButtons {...props} />
    </>
  )
}

export default NavSelector
