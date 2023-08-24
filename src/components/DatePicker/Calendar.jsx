import React, { useState, useEffect, forwardRef } from 'react'
import styles from './Calendar.module.css'
import useCalendarLogic from './hooks/useCalendarLogic'
import useYearLogic from './hooks/useYearLogic'
import NavSelector from './NavSelector'
import DateGrid from './DateGrid'
import useChooseDate from './hooks/useChooseDate'
import getTranslations from './translate'

const Calendar = forwardRef(
  (
    {
      selectDate,
      closeCalendar,
      useIcons,
      language = 'en',
      reorderedDays,
      startOfWeek,
      selectedDate,
    },
    ref,
  ) => {
    const translations = getTranslations(language)

    const { initialMonth, years, yearsBlock, setYearsBlock } = useYearLogic()

    const { currentMonth, setCurrentMonth, totalSlots } = useCalendarLogic(
      initialMonth,
      selectedDate,
      startOfWeek,
    )

    const chooseDate = useChooseDate(selectDate, closeCalendar, currentMonth)

    const [view, setView] = useState('days')
    const [animationKey, setAnimationKey] = useState(0)

    // Mettre à jour le mois en cours lorsque la date sélectionnée change
    useEffect(() => {
      if (selectedDate) {
        setCurrentMonth(
          new Date(selectedDate.getFullYear(), selectedDate.getMonth()),
        )
      }
    }, [selectedDate, setCurrentMonth])

    return (
      <div className={styles.calendar} ref={ref}>
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
            setYearsBlock={setYearsBlock}
            animationKey={animationKey}
            setAnimationKey={setAnimationKey}
            selectedDate={selectedDate}
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
          reorderedDays={reorderedDays}
          selectedDate={selectedDate}
        />
      </div>
    )
  },
)

export default Calendar
