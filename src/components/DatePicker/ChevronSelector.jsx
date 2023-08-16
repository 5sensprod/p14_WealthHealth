import React, { useCallback } from 'react'
import styles from './Calendar.module.css'
import { ChevronIcon } from './Icons'
import Button from './Button'
import { getNewData } from './utils/dateNavigations'
import useKeyboardAccessibility from './useKeyboardAccessibility'

const ChevronButton = React.forwardRef(
  ({ direction, onClick, useIcons, label, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        onClick={onClick}
        className={styles.chevronButton}
        icon={() => useIcons && <ChevronIcon direction={direction} />}
        {...props}
      >
        {!useIcons && label}
      </Button>
    )
  },
)

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

  const handlePrevClickRef = useKeyboardAccessibility(handlePrevClick)
  const handleNextClickRef = useKeyboardAccessibility(handleNextClick)

  return (
    <div className={styles.chevronContainer}>
      <ChevronButton
        direction="down"
        onClick={handlePrevClick}
        useIcons={useIcons}
        label="Previous"
        ref={handlePrevClickRef}
        tabIndex={0}
      />
      <ChevronButton
        direction="up"
        onClick={handleNextClick}
        useIcons={useIcons}
        label="Next"
        ref={handleNextClickRef}
        tabIndex={0}
      />
    </div>
  )
}

export default ChevronButtons
