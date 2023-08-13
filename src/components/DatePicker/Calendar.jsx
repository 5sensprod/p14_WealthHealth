import React, { useState } from 'react'
import enTranslations from './translations/en.json'
import frTranslations from './translations/fr.json'
import styles from './Calendar.module.css'
import useCalendarLogic from './useCalendarLogic'
import useDateLogic from './useDateLogic'
import NavSelector from './NavSelector'
import ChevronButtons from './ChevronButtons'
import DayGrid from './DayGrid'
import useChooseDate from './useChooseDate'

function Calendar({ selectDate, closeCalendar, useIcons, language = 'en' }) {
  const translations = language === 'fr' ? frTranslations : enTranslations
  const { initialMonth, years } = useDateLogic()
  const { currentMonth, setCurrentMonth, totalSlots } =
    useCalendarLogic(initialMonth)
  const chooseDate = useChooseDate(selectDate, closeCalendar, currentMonth)

  const [view, setView] = useState('days') // 'days', 'months', or 'years'

  // Ajoutez ces lignes ici :
  const startYear = 1930
  const currentYear = new Date().getFullYear()
  const [yearsBlock, setYearsBlock] = useState(() => {
    const yearBlockStart = currentYear - ((currentYear - startYear) % 16)
    return Array.from({ length: 16 }, (_, i) => yearBlockStart + i)
  })

  const handleChangeView = (newView) => {
    if (view !== newView) {
      setView(newView)
    }
  }
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
          setView={handleChangeView}
          yearsBlock={yearsBlock} // Ajouté ceci
        />
        <div className={styles.chevronContainer}>
          <ChevronButtons
            setCurrentMonth={setCurrentMonth}
            useIcons={useIcons}
            view={view}
            setView={handleChangeView}
            yearsBlock={yearsBlock} // Ajouté ceci
            setYearsBlock={setYearsBlock}
          />
        </div>
      </div>

      <DayGrid
        key={`${currentMonth.getMonth()}-${currentMonth.getFullYear()}`}
        totalSlots={totalSlots}
        chooseDate={chooseDate}
        translations={translations}
        view={view}
        setView={handleChangeView}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        yearsBlock={yearsBlock} // Ajouté ceci
      />
    </div>
  )
}

export default Calendar
