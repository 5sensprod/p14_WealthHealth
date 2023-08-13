import React from 'react'
import HomeIcon from './HomeIcon'
import ChevronButtons from './ChevronButtons'
import styles from './Calendar.module.css'

const VIEWS = {
  DAYS: 'days',
  MONTHS: 'months',
  YEARS: 'years',
}

function MonthSelector({ currentMonth, months, view, setView }) {
  if (view !== VIEWS.DAYS) return null

  return (
    <button className={styles.navButton} onClick={() => setView(VIEWS.MONTHS)}>
      {months[currentMonth.getMonth()]}
    </button>
  )
}

function YearSelector({ currentMonth, view, setView, yearsBlock }) {
  return (
    <button
      className={styles.navButton}
      onClick={() => setView(view === VIEWS.YEARS ? VIEWS.MONTHS : VIEWS.YEARS)}
    >
      {view === VIEWS.YEARS
        ? `${yearsBlock[0]}-${yearsBlock[yearsBlock.length - 1]}`
        : currentMonth.getFullYear()}
    </button>
  )
}

function HomeButton({ setCurrentMonth, setView }) {
  return (
    <button
      className={styles.navButton}
      onClick={() => {
        setCurrentMonth(new Date())
        setView(VIEWS.DAYS)
      }}
    >
      <HomeIcon />
    </button>
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
