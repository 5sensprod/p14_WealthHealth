import React, { useState, useEffect, forwardRef } from 'react'
// import { isValidDate } from './utils'
import { DEFAULT_CONFIG } from './config/defaultConfig'

// Utility function to format value to the desired mask
function formatToMask(value, format) {
  let maskedValue = value.replace(/\D/g, '')
  const insertSeparator = (position) => {
    if (maskedValue.length > position) {
      maskedValue = `${maskedValue.substring(
        0,
        position,
      )}/${maskedValue.substring(position)}`
    }
  }
  switch (format) {
    case DEFAULT_CONFIG.DATE_FORMATS.DEFAULT:
    case DEFAULT_CONFIG.DATE_FORMATS.US:
      insertSeparator(2)
      insertSeparator(5)
      break
    case DEFAULT_CONFIG.DATE_FORMATS.ISO:
      insertSeparator(4)
      insertSeparator(7)
      break
    default:
      break
  }
  return maskedValue
}

const MaskedInput = forwardRef(
  ({ value, onChange, format = DEFAULT_CONFIG.DATE_FORMAT, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(
      formatToMask(value, format),
    )

    useEffect(() => {
      setDisplayValue(formatToMask(value, format))
    }, [value, format])

    function handleChange(e) {
      let newValue = e.target.value

      // If user just added a slash, keep it and format on the next change
      if (
        newValue.charAt(newValue.length - 1) === '/' &&
        newValue.length > displayValue.length
      ) {
        setDisplayValue(newValue)
        return
      }

      // Format the value
      newValue = formatToMask(newValue, format)
      setDisplayValue(newValue)

      // Inform the parent about the change
      onChange && onChange({ target: { value: newValue } })
    }

    return (
      <input
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        {...props}
      />
    )
  },
)

export default MaskedInput
