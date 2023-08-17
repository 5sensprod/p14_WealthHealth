import React from 'react'
import DaysView from './views/DaysView'
import MonthsView from './views/MonthsView'
import YearsView from './views/YearsView'

function DateGrid({
  totalSlots,
  chooseDate,
  translations,
  view,
  setView,
  setCurrentMonth,
  currentMonth,
  yearsBlock,
  animationKey,
  reorderedDays,
  closeCalendar,
}) {
  const handleMonthClick = (monthIndex) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex))
    setView('days')
  }

  const handleYearClick = (selectedYear) => {
    setCurrentMonth(new Date(selectedYear, currentMonth.getMonth()))
    setView('months')
  }

  return (
    <>
      {view === 'days' && (
        <DaysView
          totalSlots={totalSlots}
          chooseDate={chooseDate}
          translations={translations}
          reorderedDays={reorderedDays}
          closeCalendar={closeCalendar}
          setCurrentMonth={setCurrentMonth}
          currentMonth={currentMonth}
        />
      )}

      {view === 'months' && (
        <MonthsView
          currentMonth={currentMonth}
          translations={translations}
          handleMonthClick={handleMonthClick}
        />
      )}

      {view === 'years' && (
        <YearsView
          currentMonth={currentMonth}
          yearsBlock={yearsBlock}
          animationKey={animationKey}
          handleYearClick={handleYearClick}
        />
      )}
    </>
  )
}

export default DateGrid
