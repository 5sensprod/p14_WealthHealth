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
  selectedDate,
  viewedDate,
  currentDate,
  yearBlockSize,
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
          selectedDate={selectedDate}
          viewedDate={viewedDate}
          currentDate={currentDate}
        />
      )}

      {view === 'months' && (
        <MonthsView
          translations={translations}
          handleMonthClick={handleMonthClick}
          selectedDate={selectedDate}
        />
      )}

      {view === 'years' && (
        <YearsView
          currentMonth={currentMonth}
          yearsBlock={yearsBlock}
          animationKey={animationKey}
          handleYearClick={handleYearClick}
          selectedDate={selectedDate}
          yearBlockSize={yearBlockSize}
        />
      )}
    </>
  )
}

export default DateGrid
