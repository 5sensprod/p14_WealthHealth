import React, { useState, useEffect } from 'react'
import { isValidDate } from './utils'

function MaskedInput({ value, onChange, format = 'DD-MM-YYYY' }) {
  const [displayValue, setDisplayValue] = useState(formatToMask(value, format))

  useEffect(() => {
    setDisplayValue(formatToMask(value, format))
  }, [value, format])

  function formatToMask(value, format) {
    let maskedValue = value.replace(/\D/g, '') // retire tout sauf les chiffres

    switch (format) {
      case 'DD-MM-YYYY':
      case 'MM-DD-YYYY':
        if (maskedValue.length > 2) {
          maskedValue =
            maskedValue.substring(0, 2) + '/' + maskedValue.substring(2)
        }
        if (maskedValue.length > 5) {
          maskedValue =
            maskedValue.substring(0, 5) + '/' + maskedValue.substring(5)
        }
        break
      case 'YYYY-MM-DD':
        if (maskedValue.length > 4) {
          maskedValue =
            maskedValue.substring(0, 4) + '/' + maskedValue.substring(4)
        }
        if (maskedValue.length > 7) {
          maskedValue =
            maskedValue.substring(0, 7) + '/' + maskedValue.substring(7)
        }
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

  return <input value={displayValue} onChange={handleChange} />
}

export default MaskedInput
