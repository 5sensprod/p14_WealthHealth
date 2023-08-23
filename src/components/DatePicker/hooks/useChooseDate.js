const useChooseDate = (selectDate, closeCalendar, currentMonth) => {
  const chooseDate = (day) => {
    selectDate(
      `${currentMonth.getFullYear()}-${String(
        currentMonth.getMonth() + 1,
      ).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    )
    closeCalendar()
  }

  return chooseDate
}

export default useChooseDate
