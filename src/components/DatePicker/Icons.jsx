import React from 'react'
import HomeSVG from './assets/home-house.svg'
import CalendarSVG from './assets/calendar-alt.svg'
import ChevronDownSVG from './assets/chevron-down.svg'

export function HomeIcon() {
  return <img src={HomeSVG} alt="Home Icon" width="18" height="18" />
}

export function CalendarIcon() {
  return <img src={CalendarSVG} alt="Calendar Icon" width="18" height="18" />
}

export function ChevronIcon({ direction = 'down' }) {
  const rotationMap = {
    up: '0',
    right: '90',
    down: '180',
    left: '270',
  }

  const rotation = rotationMap[direction] || '0'

  return (
    <img
      src={ChevronDownSVG}
      alt="Chevron Icon"
      width="30"
      height="30"
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  )
}
