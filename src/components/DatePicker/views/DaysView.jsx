import React, { useRef, useState } from 'react'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils/handleNavigationKeys'
import { updateMonth, handleTabKey } from '../utils/DaysViewUtils'
import {
  useInitialFocusEffect,
  useNavigationDirectionEffect,
} from '../hooks/daysViewHooks'

function DaysView({
  totalSlots,
  chooseDate,
  reorderedDays,
  setCurrentMonth,
  currentMonth,
}) {
  const daysRefs = useRef([])
  const [navigationDirection, setNavigationDirection] = useState(null)

  useInitialFocusEffect(currentMonth, totalSlots, daysRefs)
  useNavigationDirectionEffect(
    navigationDirection,
    currentMonth,
    daysRefs,
    setNavigationDirection,
  )

  const handleDayKeyDown = (e, index) => {
    handleNavigationKeys(
      e,
      index,
      totalSlots.length - 1,
      (selectedIndex) => chooseDate(totalSlots[selectedIndex].number),
      daysRefs.current,
    )

    if (e.key === 'Tab') {
      const { direction } = handleTabKey(
        e,
        totalSlots[index],
        index,
        currentMonth,
      )
      if (direction) {
        const newMonth = updateMonth(currentMonth, direction)
        setCurrentMonth(newMonth)
        setNavigationDirection(direction)
      }
    }
  }

  return (
    <div className={styles.daysContainer}>
      {reorderedDays.map((day) => (
        <DayHeader key={day} day={day} />
      ))}
      {totalSlots.map((day, index) => (
        <Day
          key={index}
          day={day}
          onDayClick={(event) => {
            event.stopPropagation()
            if (!day.isGrayed) chooseDate(day.number)
          }}
          onDayKeyDown={(e) => handleDayKeyDown(e, index)}
          refElement={(el) => (daysRefs.current[index] = el)}
        />
      ))}
    </div>
  )
}

function DayHeader({ day }) {
  return <div className={styles.header}>{day}</div>
}

function Day({ day, onDayClick, onDayKeyDown, refElement }) {
  const className = day.isGrayed ? styles.grayedDay : styles.day
  return (
    <div
      className={className}
      onClick={onDayClick}
      onKeyDown={onDayKeyDown}
      ref={refElement}
      tabIndex={day.isGrayed ? -1 : 0}
    >
      {day.number}
    </div>
  )
}

export default DaysView
