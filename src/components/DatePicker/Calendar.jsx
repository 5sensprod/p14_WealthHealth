import React, { useState, forwardRef } from 'react'
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
    },
    ref,
  ) => {
    const translations = getTranslations(language)

    const { initialMonth, years, yearsBlock, setYearsBlock } = useYearLogic()

    const { currentMonth, setCurrentMonth, totalSlots } = useCalendarLogic(
      initialMonth,
      startOfWeek,
    )

    const chooseDate = useChooseDate(selectDate, closeCalendar, currentMonth)

    const [view, setView] = useState('days')
    const [animationKey, setAnimationKey] = useState(0)

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
        />
      </div>
    )
  },
)

export default Calendar
