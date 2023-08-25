import React, { useState, useEffect, forwardRef } from 'react'
import { DEFAULT_CONFIG } from './config/defaultConfig'

// Utility function to format value to the desired mask
const MASK_FORMATS = {
  [DEFAULT_CONFIG.DATE_FORMATS.DEFAULT]: [2, 5],
  [DEFAULT_CONFIG.DATE_FORMATS.US]: [2, 5],
  [DEFAULT_CONFIG.DATE_FORMATS.ISO]: [4, 7],
}

function formatToMask(value, format, separator = '/') {
  const positions = MASK_FORMATS[format] || []
  let maskedValue = value.replace(/\D/g, '')
  positions.forEach((position) => {
    if (maskedValue.length > position) {
      maskedValue = `${maskedValue.substring(
        0,
        position,
      )}${separator}${maskedValue.substring(position)}`
    }
  })
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
      if (newValue === '') {
        setDisplayValue('')
        onChange && onChange({ target: { value: '' } })
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
