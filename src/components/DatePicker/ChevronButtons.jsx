import React from 'react'
import styles from './Calendar.module.css'
import ChevronIcon from './ChevronIcon'

function ChevronButtons({
  setCurrentMonth,
  useIcons,
  view,
  setYearsBlock,
  yearsBlock,
}) {
  const goToNextMonth = (currentDate) => {
    if (currentDate.getMonth() === 11) {
      return new Date(currentDate.getFullYear() + 1, 0)
    } else {
      return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    }
  }

  const goToPreviousMonth = (currentDate) => {
    if (currentDate.getMonth() === 0) {
      return new Date(currentDate.getFullYear() - 1, 11)
    } else {
      return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    }
  }

  const startYear = 1930

  const endYear = new Date().getFullYear() + 2

  const goToNextYear = (currentDate) => {
    if (currentDate.getFullYear() === endYear) {
      return new Date(startYear, currentDate.getMonth())
    }
    return new Date(currentDate.getFullYear() + 1, currentDate.getMonth())
  }
  const currentYear = new Date().getFullYear()

  const goToNextYearBlock = () => {
    const newStartYear = yearsBlock[0] + 16
    if (newStartYear > currentYear + 2) {
      return Array.from({ length: 16 }, (_, i) => 1930 + i)
    }
    return Array.from({ length: 16 }, (_, i) => newStartYear + i)
  }

  const goToPreviousYearBlock = () => {
    const newStartYear = yearsBlock[0] - 16
    if (newStartYear < 1930) {
      // Calculez le début du bloc contenant l'année currentYear + 2
      const yearBlockStart = currentYear + 2 - ((currentYear + 2 - 1930) % 16)
      return Array.from({ length: 16 }, (_, i) => yearBlockStart + i)
    }
    return Array.from({ length: 16 }, (_, i) => newStartYear + i)
  }

  const goToPreviousYear = (currentDate) => {
    if (currentDate.getFullYear() === startYear) {
      return new Date(endYear, currentDate.getMonth())
    }
    return new Date(currentDate.getFullYear() - 1, currentDate.getMonth())
  }

  return (
    <div className={styles.chevronContainer}>
      <button
        className={styles.chevronButton}
        onClick={() => {
          if (view === 'months') {
            setCurrentMonth((prev) => goToPreviousYear(prev))
          } else if (view === 'years') {
            setYearsBlock(goToPreviousYearBlock)
          } else {
            setCurrentMonth((prev) => goToPreviousMonth(prev))
          }
        }}
      >
        {useIcons ? (
          <ChevronIcon direction="down" style={{ margin: '0 5px' }} />
        ) : (
          'Previous'
        )}
      </button>
      <button
        className={styles.chevronButton}
        onClick={() => {
          if (view === 'months') {
            setCurrentMonth((prev) => goToNextYear(prev))
          } else if (view === 'years') {
            setYearsBlock(goToNextYearBlock)
          } else {
            setCurrentMonth((prev) => goToNextMonth(prev))
          }
        }}
      >
        {useIcons ? <ChevronIcon direction="up" /> : 'Next'}
      </button>
    </div>
  )
}

export default ChevronButtons
