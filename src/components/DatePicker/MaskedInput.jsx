import React, { forwardRef, useState, useEffect } from 'react'
import { formatToMask } from './utils/dateFunctions'

const MaskedInput = forwardRef(
  ({ value, onChange, format = 'DEFAULT', ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(
      formatToMask(value, format),
    )

    useEffect(() => {
      setDisplayValue(formatToMask(value, format))
    }, [value, format])

    const handleChange = (e) => {
      let newValue = e.target.value

      if (newValue === '') {
        setDisplayValue('')
        onChange && onChange({ target: { value: '' } })
        return
      }

      try {
        newValue = formatToMask(newValue, format)

        setDisplayValue(newValue)

        onChange && onChange({ target: { value: newValue } })
      } catch (error) {}
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
