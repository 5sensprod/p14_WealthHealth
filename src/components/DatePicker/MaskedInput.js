import React, { useState, useEffect } from 'react'
import { isValidDate } from './utils'

function MaskedInput({ value, onChange, format = 'DD-MM-YYYY', ...props }) {
  const [displayValue, setDisplayValue] = useState(formatToMask(value, format))

  useEffect(() => {
    setDisplayValue(formatToMask(value, format))
  }, [value, format])

  function formatToMask(value, format) {
    const separator = format.includes('-') ? '-' : '/'
    let maskedValue = value.replace(/\D/g, '')

    const insertSeparator = (position) => {
      if (maskedValue.length > position) {
        maskedValue = `${maskedValue.substring(
          0,
          position,
        )}${separator}${maskedValue.substring(position)}`
      }
    }

    switch (format) {
      case 'DD-MM-YYYY':
      case 'MM-DD-YYYY':
        insertSeparator(2)
        insertSeparator(5)
        break
      case 'YYYY-MM-DD':
        insertSeparator(4)
        insertSeparator(7)
        break
      default:
        break
    }

    return maskedValue
  }

  function handleChange(e) {
    const newValue = formatToMask(e.target.value, format)
    setDisplayValue(newValue)
    const isValid = isValidDate(newValue, format)
    onChange && onChange(newValue, isValid)
  }

  return <input value={displayValue} onChange={handleChange} {...props} />
}

export default MaskedInput
