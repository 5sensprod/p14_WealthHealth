import React from 'react'
import styles from './Calendar.module.css'
import { ChevronIcon } from './Icons'
import Button from './Button'
import { calculateNewDate } from './utils/dateNavigations'
import useKeyboardAccessibility from './hooks/useKeyboardAccessibility'

const ChevronButton = React.forwardRef(
  ({ direction, onClick, useIcons, label, ...props }, ref) => (
    <Button
      ref={ref}
      onClick={onClick}
      className={styles.chevronButton}
      icon={() => useIcons && <ChevronIcon direction={direction} />}
      {...props}
    >
      {!useIcons && label}
    </Button>
  ),
)

function ChevronButtons({
  setCurrentMonth,
  useIcons,
  view,
  setYearsBlock,
  yearsBlock,
  setAnimationKey,
}) {
  const handleDateChange = (direction) => {
    setCurrentMonth((prev) => {
      const { newDate, newYearBlock } = calculateNewDate(
        view,
        direction,
        yearsBlock,
        prev,
      )
      setYearsBlock(newYearBlock)
      setAnimationKey((prevKey) => prevKey + 1)
      return newDate
    })
  }

  const buttonRef = useKeyboardAccessibility((direction) => {
    handleDateChange(direction === 'down' ? 'prev' : 'next')
  })

  return (
    <div className={styles.chevronContainer}>
      <ChevronButton
        direction="down"
        onClick={() => handleDateChange('prev')}
        useIcons={useIcons}
        label="Previous"
        ref={buttonRef}
        tabIndex={0}
      />
      <ChevronButton
        direction="up"
        onClick={() => handleDateChange('next')}
        useIcons={useIcons}
        label="Next"
        ref={buttonRef}
        tabIndex={0}
      />
    </div>
  )
}

export default ChevronButtons
