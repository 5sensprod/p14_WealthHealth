import React, { useState } from 'react'
import styles from './Calendar.module.css'
import { abbreviateMonth } from './utils'

function DayGrid({
  totalSlots,
  chooseDate,
  translations,
  view,
  setView,
  setCurrentMonth,
  currentMonth,
  yearsBlock,
}) {
  const [forceRender, setForceRender] = useState(false)
  const handleMonthClick = (monthIndex) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex))
    setView('days')
    setForceRender(!forceRender) // Toggle pour forcer un rerendu
  }

  const handleYearClick = (selectedYear) => {
    setCurrentMonth(new Date(selectedYear, currentMonth.getMonth()))
    setView('months') // ou 'days' si vous voulez revenir directement à la vue des jours
  }

  return (
    <div className={styles.gridContainer}>
      {view === 'days' && (
        <>
          {translations.days.map((day) => (
            <div className={styles.header} key={day}>
              {day}
            </div>
          ))}
          {totalSlots.map((day, index) => (
            <div
              key={index}
              className={day.isGrayed ? styles.grayedDay : styles.day}
              onClick={() => !day.isGrayed && chooseDate(day.number)}
            >
              {day.number}
            </div>
          ))}
        </>
      )}

      {view === 'months' && (
        <div className={styles.monthsContainer}>
          {translations.shortMonths.map((month, index) => (
            <div key={month} onClick={() => handleMonthClick(index)}>
              {abbreviateMonth(month)}
            </div>
          ))}
        </div>
      )}

      {view === 'years' && (
        <div className={styles.yearsContainer}>
          {yearsBlock.map((year) => (
            <div
              key={year}
              className={styles.year}
              onClick={() => handleYearClick(year)}
            >
              {year}
            </div>
          ))}
        </div>
      )}
    </div> // Fermeture de la balise gridContainer
  )
}

export default DayGrid
