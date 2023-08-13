import React from 'react'
import { HomeIcon } from './Icons'
import ChevronButtons from './ChevronSelector'
import styles from './Calendar.module.css'
import Button from './Button'

import {
  VIEWS,
  switchToMonthView,
  toggleYearView,
  resetToCurrentDate,
} from './utils'

function MonthSelector({ currentMonth, months, view, setView }) {
  if (view !== VIEWS.DAYS) return null

  return (
    <Button
      onClick={() => setView(switchToMonthView(view))}
      className={styles.navButton}
    >
      {months[currentMonth.getMonth()]}
    </Button>
  )
}

function YearSelector({ currentMonth, view, setView, yearsBlock }) {
  return (
    <Button
      onClick={() => setView(toggleYearView(view))}
      className={styles.navButton}
    >
      {view === VIEWS.YEARS
        ? `${yearsBlock[0]}-${yearsBlock[yearsBlock.length - 1]}`
        : currentMonth.getFullYear()}
    </Button>
  )
}

function HomeButton({ setCurrentMonth, setView }) {
  return (
    <Button
      onClick={() => {
        setCurrentMonth(resetToCurrentDate())
        setView(VIEWS.DAYS)
      }}
      icon={HomeIcon}
      className={styles.navButton}
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
