import React from 'react'
import ChevronDownSVG from './assets/chevron-down.svg'

function ChevronIcon({ direction = 'down' }) {
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
      width="28"
      height="28"
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  )
}

export default ChevronIcon
