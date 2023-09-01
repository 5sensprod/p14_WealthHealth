import React, { useState, forwardRef, useEffect } from 'react'
import styles from './Calendar.module.css'
import alternativeStyles from './AlternativeCalendar.module.css'
import useCalendarLogic from './hooks/useCalendarLogic'
import useYearLogic from './hooks/useYearLogic'
import NavSelector from './NavSelector'
import DateGrid from './DateGrid'
import useChooseDate from './hooks/useChooseDate'
import getTranslations from './translate'
import { DEFAULT_CONFIG } from './config/defaultConfig'

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
      minYear,
      maxYear,
      yearBlockSize,
      designType = DEFAULT_CONFIG.DESIGN_TYPE,
    },
    ref,
  ) => {
    const translations = getTranslations(language)
    const selectedStyles = designType === 'default' ? styles : alternativeStyles
    const designClass =
      designType === 'neuro' ? 'neuro' : designType === 'glass' ? 'glass' : ''

    const { initialMonth, years, yearsBlock, setYearsBlock } = useYearLogic(
      minYear,
      maxYear,
    )

    const { viewedDate, setViewedDate, totalSlots } = useCalendarLogic(
      initialMonth,
      selectedDate,
      startOfWeek,
      yearBlockSize,
    )

    const chooseDate = useChooseDate(selectDate, closeCalendar, viewedDate)
    const [currentDate, setCurrentDate] = useState(new Date())

    const [view, setView] = useState('days')
    const [animationKey, setAnimationKey] = useState(0)

    // Mettre à jour le mois en cours lorsque la date sélectionnée change
    useEffect(() => {
      if (selectedDate) {
        setViewedDate(
          new Date(selectedDate.getFullYear(), selectedDate.getMonth()),
        )
      }
    }, [selectedDate, setViewedDate])

    return (
      <div
        className={`${selectedStyles.calendar} ${selectedStyles[designClass]}`}
        ref={ref}
      >
        <div className={styles.calendarNav}>
          <NavSelector
            currentMonth={viewedDate}
            setViewedDate={setViewedDate}
            months={translations.shortMonths}
            years={years}
            useIcons={useIcons}
            view={view}
            setView={setView}
            yearsBlock={yearsBlock}
            setYearsBlock={setYearsBlock}
            animationKey={animationKey}
            setAnimationKey={setAnimationKey}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            minYear={minYear}
            maxYear={maxYear}
          />
        </div>
        <DateGrid
          key={`${viewedDate.getMonth()}-${viewedDate.getFullYear()}`}
          totalSlots={totalSlots}
          chooseDate={chooseDate}
          translations={translations}
          view={view}
          setView={setView}
          currentMonth={viewedDate}
          setCurrentMonth={setViewedDate}
          yearsBlock={yearsBlock}
          animationKey={animationKey}
          reorderedDays={reorderedDays}
          selectedDate={selectedDate}
          viewedDate={viewedDate}
          currentDate={currentDate}
          yearBlockSize={yearBlockSize}
          designClass={selectedStyles[designClass]}
        />
      </div>
    )
  },
)

export default Calendar
