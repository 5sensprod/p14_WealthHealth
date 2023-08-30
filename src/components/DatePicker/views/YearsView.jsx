import React, { useRef } from 'react'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils/handleNavigationKeys'

function YearsView({ handleYearClick, selectedDate, yearsBlock }) {
  const yearsRefs = useRef([])

  const handleYearKeyDown = (e, index) => {
    handleNavigationKeys(
      e,
      index,
      yearsBlock.length - 1,
      handleYearClick,
      yearsRefs.current,
      (i) => yearsBlock[i],
    )
  }

  return (
    <div className={styles.yearsContainer}>
      {console.log(yearsBlock)}
      {yearsBlock.map((year, index) => (
        <div
          key={year || index} // Utilisez l'index si l'année est invalide (NaN ou undefined)
          className={`${styles.year} ${
            index === selectedDate.getYear() ? styles.selectedYear : ''
          }`}
          onClick={(event) => {
            event.stopPropagation()
            handleYearClick(year)
          }}
          onKeyDown={(e) => handleYearKeyDown(e, index)}
          ref={(el) => (yearsRefs.current[index] = el)}
          tabIndex={0}
        >
          {year}
        </div>
      ))}
    </div>
  )
}

export default YearsView
