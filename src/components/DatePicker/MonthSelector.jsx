import React from 'react'
import { months } from './constants'
import styles from './MonthSelector.module.css'

function MonthSelector({ currentMonth, setCurrentMonth }) {
  return (
    <div className={styles.calendarNav}>
      <button
        onClick={() =>
          setCurrentMonth(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1),
          )
        }
      >
        Previous
      </button>
      <span>
        <select
          value={currentMonth.getMonth()}
          onChange={(e) =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), Number(e.target.value)),
            )
          }
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </span>
      <button
        onClick={() =>
          setCurrentMonth(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1),
          )
        }
      >
        Next
      </button>
    </div>
  )
}

export default MonthSelector
