import React, { useRef } from 'react'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils'

function YearsView({ handleYearClick, yearsBlock }) {
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
      {yearsBlock.map((year, index) => (
        <div
          key={year}
          className={styles.year}
          onClick={() => handleYearClick(year)}
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
