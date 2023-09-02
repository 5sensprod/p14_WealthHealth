import React, { useState, forwardRef } from 'react'
import styles from './Calendar.module.css'
import NavSelector from './NavSelector'
import DateGrid from './DateGrid'
import getTranslations from './utils/translate'
import useChooseDate from './hooks/useChooseDate'
import useCalendarLogic from './hooks/useCalendarLogic'
import useYearLogic from './hooks/useYearLogic'
import useDesignStyles from './hooks/useDesignStyles'

const Calendar = forwardRef(
  (
    {
      selectDate,
      closeCalendar,
      useIcons,
      language,
      reorderedDays,
      startOfWeek,
      designType,
      ...dateProps
    },
    ref,
  ) => {
    // Translation utility
    const translations = getTranslations(language)

    // Design Styles
    const { selectedStyles, designClass } = useDesignStyles(designType)

    // Year Logic
    const { initialMonth, years, yearsBlock, setYearsBlock } = useYearLogic(
      dateProps.minYear,
      dateProps.maxYear,
    )

    // Calendar Logic
    const { viewedDate, setViewedDate, totalSlots } = useCalendarLogic(
      initialMonth,
      dateProps.selectedDate,
      startOfWeek,
      dateProps.yearBlockSize,
    )

    // Date choosing logic
    const chooseDate = useChooseDate(selectDate, closeCalendar, viewedDate)

    // State Initializations
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState('days')
    const [animationKey, setAnimationKey] = useState(0)

    return (
      <div
        className={`${selectedStyles.calendar} ${selectedStyles[designClass]}`}
        ref={ref}
      >
        {/* Navigation Selector */}
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
            minYear={dateProps.minYear}
            maxYear={dateProps.maxYear}
          />
        </div>

        {/* Date Grid */}
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
          selectedDate={dateProps.selectedDate}
          viewedDate={viewedDate}
          currentDate={currentDate}
          yearBlockSize={dateProps.yearBlockSize}
          designClass={selectedStyles[designClass]}
        />
      </div>
    )
  },
)

export default Calendar
