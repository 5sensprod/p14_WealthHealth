import React from 'react'
import styles from '../Calendar.module.css'

function YearsView({
  handleYearClick,
  currentMonth,
  yearsBlock,
  animationKey,
}) {
  return (
    <div key={animationKey} className={styles.yearsContainer}>
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
  )
}

export default YearsView
