import React from 'react'
import HomeIcon from './HomeIcon'
import styles from './Calendar.module.css'

function NavSelector({
  setCurrentMonth,
  currentMonth,
  months,
  view,
  setView,
  yearsBlock,
}) {
  const handleMonthClick = () => {
    if (view === 'days') {
      setView('months')
    } else if (view === 'months') {
      setView('days')
    }
  }

  const handleYearClick = () => {
    if (view === 'days' || view === 'months') {
      setView('years')
    } else if (view === 'years') {
      setView('months')
    }
  }
  const handleHomeClick = () => {
    setCurrentMonth(new Date()) // Réglage sur le mois/année actuels
    setView('days') // Changer la vue pour montrer le jour
  }
  return (
    <>
      <div className={styles.NavSelector}>
        {view === 'days' && (
          <button className={styles.navButton} onClick={handleMonthClick}>
            {months[currentMonth.getMonth()]}
          </button>
        )}
        <button className={styles.navButton} onClick={handleYearClick}>
          {view === 'years'
            ? `${yearsBlock[0]}-${yearsBlock[yearsBlock.length - 1]}`
            : currentMonth.getFullYear()}
        </button>
      </div>
      <div className={styles.homeSelector}>
        <button className={styles.navButton} onClick={handleHomeClick}>
          <HomeIcon />
        </button>
      </div>
    </>
  )
}

export default NavSelector
