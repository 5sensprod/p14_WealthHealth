import React from 'react'
import styles from './DatePicker.module.css'
import { startYear, months } from './constants'
import useCalendarLogic from './useCalendarLogic'

function Calendar({ selectDate, closeCalendar }) {
  const today = new Date()
  const thisYear = today.getFullYear()
  const initialMonth = new Date(thisYear, today.getMonth())

  // Utilisation du hook personnalisé pour gérer la logique du calendrier
  const { currentMonth, setCurrentMonth, totalSlots } =
    useCalendarLogic(initialMonth)

  // Logique pour générer les années
  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i,
  )

  const rows = []
  let cells = []

  totalSlots.forEach((day, index) => {
    if (index % 7 !== 0 || index === 0) {
      cells.push(
        <td
          key={index}
          className={day.isGrayed ? styles.grayedDay : styles.day}
          onClick={() => {
            if (!day.isGrayed) {
              chooseDate(day.number)
            }
          }}
        >
          {day.number}
        </td>,
      )
    } else {
      rows.push(cells)
      cells = []
      cells.push(
        <td
          key={index}
          className={day.isGrayed ? styles.grayedDay : styles.day}
          onClick={() => {
            if (!day.isGrayed) {
              chooseDate(day.number)
            }
          }}
        >
          {day.number}
        </td>,
      )
    }
    if (index === totalSlots.length - 1) {
      // Pour le dernier élément
      rows.push(cells)
    }
  })

  const chooseDate = (day) => {
    selectDate(
      `${currentMonth.getFullYear()}-${String(
        currentMonth.getMonth() + 1,
      ).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    )
    closeCalendar()
  }

  return (
    <div className={styles.calendar}>
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
          <select
            value={currentMonth.getFullYear()}
            onChange={(e) =>
              setCurrentMonth(
                new Date(Number(e.target.value), currentMonth.getMonth()),
              )
            }
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
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
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((d, index) => (
            <tr key={index}>{d}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Calendar
