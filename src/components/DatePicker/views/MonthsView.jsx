import React from 'react'
import styles from '../Calendar.module.css'
import { abbreviateMonth } from '../utils'

function MonthsView({ handleMonthClick, currentMonth, translations }) {
  return (
    <div className={styles.monthsContainer}>
      {translations.shortMonths.map((month, index) => (
        <div
          key={month}
          className={styles.month}
          onClick={() => handleMonthClick(index)}
        >
          {abbreviateMonth(month)}
        </div>
      ))}
    </div>
  )
}

export default MonthsView
