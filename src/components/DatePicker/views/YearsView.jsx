import React, { useRef } from 'react'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils/dateNavigations'

function YearsView({
  handleYearClick,
  selectedDate,
  yearsBlock,
  yearBlockSize,
}) {
  const yearsRefs = useRef([])

  const displayedYears = yearsBlock.slice(0, yearBlockSize)

  const handleYearKeyDown = (e, index) => {
    handleNavigationKeys(
      e,
      index,
      displayedYears.length - 1,
      handleYearClick,
      yearsRefs.current,
      (i) => displayedYears[i],
    )
  }

  return (
    <div className={styles.yearsContainer}>
      {displayedYears.map((year, index) => (
        <div
          key={year || index}
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
