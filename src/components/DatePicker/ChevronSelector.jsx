import React, { useCallback } from 'react'
import styles from './Calendar.module.css'
import { ChevronIcon } from './Icons'
import { getNewData } from './utils/dateNavigations'
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
      setCurrentMonth((prev) => {
        const { newDate, newYearBlock } = getNewData(
          view,
          direction,
          yearsBlock,
          prev,
        )
        setYearsBlock(newYearBlock)
        setAnimationKey((prevKey) => prevKey + 1)
        return newDate
      })
    },
    [view, setYearsBlock, yearsBlock, setAnimationKey, setCurrentMonth],
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
