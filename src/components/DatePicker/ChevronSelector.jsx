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
      onMouseDown={(e) => e.preventDefault()} // Empêcher le blur de l'input
      className={styles.chevronButton}
      icon={() => useIcons && <ChevronIcon direction={direction} />}
      {...props}
    >
      {!useIcons && label}
    </Button>
  ),
)

function ChevronButtons({
  setViewedDate,
  useIcons,
  view,
  setYearsBlock,
  yearsBlock,
  setAnimationKey,
  minYear,
  maxYear,
}) {
  const handleDateChange = (direction) => {
    setViewedDate((prev) => {
      const { newDate, newYearBlock } = calculateNewDate(
        view,
        direction,
        yearsBlock,
        prev,
        minYear,
        maxYear,
      )

      setYearsBlock(newYearBlock)
      setAnimationKey((prevKey) => prevKey + 1)
      return newDate
    })
  }

  const prevButtonRef = useKeyboardAccessibility((direction) => {
    handleDateChange(direction === 'down' ? 'prev' : 'next')
  })

  const nextButtonRef = useKeyboardAccessibility((direction) => {
    handleDateChange(direction === 'down' ? 'prev' : 'next')
  })

  return (
    <div className={styles.chevronContainer}>
      <ChevronButton
        direction="down"
        onClick={() => handleDateChange('prev')}
        useIcons={useIcons}
        label="Previous"
        ref={prevButtonRef}
        tabIndex={0}
      />
      <ChevronButton
        direction="up"
        onClick={() => handleDateChange('next')}
        useIcons={useIcons}
        label="Next"
        ref={nextButtonRef}
        tabIndex={0}
      />
    </div>
  )
}

export default ChevronButtons
