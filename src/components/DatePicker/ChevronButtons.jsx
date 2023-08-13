import React, { useCallback } from 'react'
import styles from './Calendar.module.css'
import { ChevronIcon } from './Icons'
import {
  goToNextMonth,
  goToPreviousMonth,
  goToNextYear,
  goToPreviousYear,
  goToNextYearBlock,
  goToPreviousYearBlock,
  START_YEAR,
  END_YEAR,
} from './utils'

function ChevronButton({ direction, onClick, useIcons, label }) {
  return (
    <button className={styles.chevronButton} onClick={onClick}>
      {useIcons ? <ChevronIcon direction={direction} /> : label}
    </button>
  )
}

function ChevronButtons({
  setCurrentMonth,
  useIcons,
  view,
  setYearsBlock,
  yearsBlock,
  setAnimationKey,
}) {
  const handleDateChange = useCallback(
    (getNewMonth, getNewYearBlock) => {
      if (view === 'months') {
        setCurrentMonth((prev) => getNewMonth(prev))
      } else if (view === 'years') {
        setYearsBlock(getNewYearBlock(yearsBlock))
        setAnimationKey((prevKey) => prevKey + 1)
      } else {
        setCurrentMonth((prev) => getNewMonth(prev))
      }
    },
    [view, setCurrentMonth, setYearsBlock, yearsBlock, setAnimationKey],
  )

  const handlePrevClick = useCallback(() => {
    handleDateChange(
      (prev) => {
        if (view === 'months')
          return goToPreviousYear(prev, START_YEAR, END_YEAR)
        if (view === 'days') return goToPreviousMonth(prev)
        return prev // default
      },
      () => goToPreviousYearBlock(yearsBlock, new Date().getFullYear()),
    )
  }, [handleDateChange, yearsBlock, view])

  const handleNextClick = useCallback(() => {
    handleDateChange(
      (prev) => {
        if (view === 'months') return goToNextYear(prev, END_YEAR)
        if (view === 'days') return goToNextMonth(prev)
        return prev // default
      },
      () => goToNextYearBlock(yearsBlock, new Date().getFullYear()),
    )
  }, [handleDateChange, yearsBlock, view])

  return (
    <div className={styles.chevronContainer}>
      <ChevronButton
        direction="down"
        onClick={handlePrevClick}
        useIcons={useIcons}
        label="Previous"
      />
      <ChevronButton
        direction="up"
        onClick={handleNextClick}
        useIcons={useIcons}
        label="Next"
      />
    </div>
  )
}

export default ChevronButtons
