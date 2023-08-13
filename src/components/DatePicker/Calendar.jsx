import React, { useState } from 'react'
import enTranslations from './translations/en.json'
import frTranslations from './translations/fr.json'
import styles from './Calendar.module.css'
import useCalendarLogic from './useCalendarLogic'
import useDateLogic from './useDateLogic'
import NavSelector from './NavSelector'
import ChevronButtons from './ChevronButtons'
import DateGrid from './DateGrid'
import useChooseDate from './useChooseDate'
import { START_YEAR, END_YEAR } from './utils'

function Calendar({ selectDate, closeCalendar, useIcons, language = 'en' }) {
  const translations = language === 'fr' ? frTranslations : enTranslations
  const { initialMonth, years } = useDateLogic()
  const { currentMonth, setCurrentMonth, totalSlots } =
    useCalendarLogic(initialMonth)
  const chooseDate = useChooseDate(selectDate, closeCalendar, currentMonth)

  const [view, setView] = useState('days') // 'days', 'months', or 'years'

  const [yearsBlock, setYearsBlock] = useState(() => {
    const yearBlockStart = END_YEAR - ((END_YEAR - START_YEAR) % 16)
    return Array.from({ length: 16 }, (_, i) => yearBlockStart + i)
  })

  const [animationKey, setAnimationKey] = useState(0)

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarNav}>
        <NavSelector
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          months={translations.shortMonths}
          years={years}
          useIcons={useIcons}
          view={view}
          setView={setView}
          yearsBlock={yearsBlock}
        />

        <ChevronButtons
          setCurrentMonth={setCurrentMonth}
          useIcons={useIcons}
          view={view}
          setView={setView}
          yearsBlock={yearsBlock}
          setYearsBlock={setYearsBlock}
          animationKey={animationKey}
          setAnimationKey={setAnimationKey}
        />
      </div>

      <DateGrid
        key={`${currentMonth.getMonth()}-${currentMonth.getFullYear()}`}
        totalSlots={totalSlots}
        chooseDate={chooseDate}
        translations={translations}
        view={view}
        setView={setView}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        yearsBlock={yearsBlock}
        animationKey={animationKey}
      />
    </div>
  )
}

export default Calendar
