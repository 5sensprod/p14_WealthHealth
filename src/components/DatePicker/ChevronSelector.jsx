import React, { useCallback, useRef } from 'react'
import styles from './Calendar.module.css'
import { ChevronIcon } from './Icons'
import { getNewData } from './utils/dateNavigations'
import Button from './Button'
import { handleNavigationKeys } from './utils'

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
  const chevronRefs = useRef([])

  const handleChevronKeyDown = (e, index) => {
    console.log('Key pressed:', e.key)
    if (e.key === 'Enter') {
      e.preventDefault()
    }
    handleNavigationKeys(
      e,
      index,
      1, // Il y a deux boutons, donc l'index maximum est 1
      (selectedIndex) => {
        if (selectedIndex === 0) {
          handleDateChange('prev')
        } else if (selectedIndex === 1) {
          handleDateChange('next')
        }
      },
      chevronRefs.current,
    )
  }
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
        onKeyDown={(e) => handleChevronKeyDown(e, 0)}
        ref={(el) => (chevronRefs.current[0] = el)}
        tabIndex={0}
      />
      <ChevronButton
        direction="up"
        onClick={handleNextClick}
        useIcons={useIcons}
        label="Next"
        onKeyDown={(e) => handleChevronKeyDown(e, 1)}
        ref={(el) => (chevronRefs.current[1] = el)}
        tabIndex={0}
      />
    </div>
  )
}

export default ChevronButtons
