import React, { useRef } from 'react'
import styles from '../Calendar.module.css'
import { abbreviateMonth } from '../utils/dateFunctions'
import { handleNavigationKeys } from '../utils/handleNavigationKeys'

function MonthsView({ handleMonthClick, selectedDate, translations }) {
  const monthsRefs = useRef([])

  const handleMonthKeyDown = (e, index) => {
    handleNavigationKeys(e, index, 11, handleMonthClick, monthsRefs.current)
  }

  return (
    <div className={styles.monthsContainer}>
      {translations.shortMonths.map((month, index) => (
        <div
          key={month}
          className={`${styles.month} ${
            index === selectedDate.getMonth() ? styles.selectedMonth : ''
          }`}
          onClick={(event) => {
            event.stopPropagation()
            handleMonthClick(index)
          }}
          onKeyDown={(e) => handleMonthKeyDown(e, index)}
          ref={(el) => (monthsRefs.current[index] = el)}
          tabIndex={0}
        >
          {abbreviateMonth(month)}
        </div>
      ))}
    </div>
  )
}

export default MonthsView
