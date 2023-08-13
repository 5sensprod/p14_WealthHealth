import React from 'react'

function NavSelector({
  currentMonth,
  setCurrentMonth,
  months,
  years,
  useIcons,
  view,
  setView,
  yearsBlock,
}) {
  const handleMonthClick = () => {
    if (view === 'days') {
      setView('months')
    } else if (view === 'months') {
      setView('days')
    }
  }

  const handleYearClick = () => {
    if (view === 'days' || view === 'months') {
      setView('years')
    } else if (view === 'years') {
      setView('months') // ou 'days' si vous voulez revenir directement à la vue des jours
    }
  }

  ;<button onClick={handleYearClick}>
    {view === 'years'
      ? `${yearsBlock[0]}-${yearsBlock[yearsBlock.length - 1]}`
      : currentMonth.getFullYear()}
  </button>

  return (
    <div>
      <span>
        {view === 'days' && (
          <button onClick={handleMonthClick}>
            {months[currentMonth.getMonth()]}
          </button>
        )}
        <select
          value={currentMonth.getFullYear()}
          onChange={(e) =>
            setCurrentMonth(
              new Date(Number(e.target.value), currentMonth.getMonth()),
            )
          }
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {view !== 'years' && (
          <button onClick={handleYearClick}>
            {useIcons ? '📅' : 'Voir les années'}
          </button>
        )}
      </span>
    </div>
  )
}

export default NavSelector
