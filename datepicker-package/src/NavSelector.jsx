import React from 'react'
import { HomeIcon } from './Icons'
import ChevronButtons from './ChevronSelector'
import styles from './Calendar.module.css'
import Button from './Button'
import useKeyboardAccessibility from './hooks/useKeyboardAccessibility'

import {
  DAYS,
  YEARS,
  switchToMonthView,
  toggleYearView,
  resetToCurrentDate,
} from './utils/viewUtils'

// Selecteur de mois
function MonthSelector({ currentMonth, months, view, setView }) {
  const handleMonthSelect = () => {
    setView(switchToMonthView(view))
  }

  const ref = useKeyboardAccessibility(handleMonthSelect)

  if (view === YEARS) return null

  return (
    <Button
      ref={ref}
      onClick={handleMonthSelect}
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

  const ref = useKeyboardAccessibility(handleYearSelect)

  return (
    <Button
      ref={ref}
      onClick={handleYearSelect}
      className={styles.navButton}
      tabIndex={0}
    >
      {view === YEARS
        ? `${yearsBlock[0]}-${yearsBlock[yearsBlock.length - 1]}`
        : currentMonth.getFullYear()}
    </Button>
  )
}

// Bouton pour revenir à la date actuelle
function HomeButton({ setViewedDate, setView, setCurrentDate }) {
  const handleHomeClick = () => {
    const dateToday = resetToCurrentDate()
    setViewedDate(dateToday)
    setCurrentDate(dateToday)
    setView(DAYS)
  }

  const ref = useKeyboardAccessibility(handleHomeClick)

  return (
    <Button
      ref={ref}
      onClick={handleHomeClick}
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
