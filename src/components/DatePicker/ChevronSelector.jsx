import React, { useCallback } from 'react'
import styles from './Calendar.module.css'
import { ChevronIcon } from './Icons'
import { getNewDate, getNewYearBlock } from './utils/dateNavigations'
import Button from './Button'

function ChevronButton({ direction, onClick, useIcons, label }) {
  return (
    <Button
      onClick={onClick}
      className={styles.chevronButton}
      icon={() => useIcons && <ChevronIcon direction={direction} />}
    >
      {!useIcons && label}
    </Button>
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
    (direction) => {
      setCurrentMonth((prev) => getNewDate(view, direction, yearsBlock, prev))
      setYearsBlock((prev) => getNewYearBlock(view, direction, prev))
      setAnimationKey((prevKey) => prevKey + 1)
    },
    [view, setCurrentMonth, setYearsBlock, yearsBlock, setAnimationKey],
  )

  const handlePrevClick = useCallback(() => {
    handleDateChange('prev')
  }, [handleDateChange])

  const handleNextClick = useCallback(() => {
    handleDateChange('next')
  }, [handleDateChange])

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
