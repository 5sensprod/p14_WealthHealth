import React, { forwardRef } from 'react'
import Button from './Button'
import { CalendarIcon } from './Icons'
import styles from './DatePicker.module.css'

const CalendarButton = forwardRef(
  ({ onClick, showCalendar, ...props }, ref) => (
    <Button
      onClick={onClick}
      className={styles.calendarButton}
      icon={CalendarIcon}
      ref={ref}
      aria-expanded={showCalendar}
      aria-label="Toggle date picker"
      {...props}
    />
  ),
)

export default CalendarButton
