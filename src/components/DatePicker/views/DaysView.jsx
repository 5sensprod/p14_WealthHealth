import React, { useRef, useEffect, useState } from 'react'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils'
import { getDaysInMonth } from '../utils/dateFunctions'

function DaysView({
  totalSlots,
  chooseDate,
  reorderedDays,
  setCurrentMonth,
  currentMonth,
}) {
  const daysRefs = useRef([])
  const [focusedDay, setFocusedDay] = useState(null)

  useEffect(() => {
    if (focusedDay !== null) {
      setTimeout(() => {
        daysRefs.current[focusedDay]?.focus()
        setFocusedDay(null) // Reset pour la prochaine utilisation
      }, 0)
    }
  }, [focusedDay])

  useEffect(() => {
    if (focusedDay === 0) {
      setTimeout(() => {
        daysRefs.current[0]?.focus()
      }, 0)
    }
  }, [currentMonth, focusedDay])

  const handleDayKeyDown = (e, index) => {
    console.log(`Touche ${e.key} pressée sur le jour ${index}`)

    handleNavigationKeys(
      e,
      index,
      totalSlots.length - 1,
      (selectedIndex) => chooseDate(totalSlots[selectedIndex].number),
      daysRefs.current,
    )

    const day = totalSlots[index]
    const daysInCurrentMonth = getDaysInMonth(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
    )

    const isLastDayOfCurrentMonth =
      day.number === daysInCurrentMonth && !day.isGrayed
    const isFirstDayOfCurrentMonth = day.number === 1 && !day.isGrayed

    if (e.key === 'Tab' && !e.shiftKey) {
      if (isLastDayOfCurrentMonth) {
        e.preventDefault()
        setCurrentMonth((prevMonth) => {
          const newMonth = new Date(prevMonth)
          newMonth.setMonth(prevMonth.getMonth() + 1)
          return newMonth
        })
        setFocusedDay(0) // Focus sur le premier jour du mois suivant
      } else {
        // Navigate to the next non-grayed day
        for (let i = index + 1; i < totalSlots.length; i++) {
          if (!totalSlots[i].isGrayed) {
            e.preventDefault()
            setFocusedDay(i)
            break
          }
        }
      }
    } else if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault() // Pour empêcher le comportement par défaut

      if (isFirstDayOfCurrentMonth) {
        setCurrentMonth((prevMonth) => {
          const newMonth = new Date(prevMonth)
          newMonth.setMonth(prevMonth.getMonth() - 1)
          return newMonth
        })

        const daysInPrevMonth = getDaysInMonth(
          currentMonth.getFullYear(),
          currentMonth.getMonth() - 1,
        )
        // Trouvez le dernier jour non-grisé du mois précédent
        for (let i = daysInPrevMonth - 1; i >= 0; i--) {
          if (!totalSlots[i].isGrayed) {
            setFocusedDay(i)
            break
          }
        }
      } else {
        for (let i = index - 1; i >= 0; i--) {
          if (!totalSlots[i].isGrayed) {
            setFocusedDay(i)
            break
          }
        }
      }
    }
  }

  return (
    <div className={styles.daysContainer}>
      {reorderedDays.map((day) => (
        <div className={styles.header} key={day}>
          {day}
        </div>
      ))}

      {totalSlots.map((day, index) => (
        <div
          key={index}
          className={day.isGrayed ? styles.grayedDay : styles.day}
          onClick={(event) => {
            event.stopPropagation()
            if (!day.isGrayed) chooseDate(day.number)
          }}
          onKeyDown={(e) => handleDayKeyDown(e, index)}
          ref={(el) => (daysRefs.current[index] = el)}
          tabIndex={day.isGrayed ? -1 : 0}
        >
          {day.number}
        </div>
      ))}
    </div>
  )
}

export default DaysView
