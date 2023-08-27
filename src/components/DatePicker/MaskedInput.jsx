import React, { forwardRef } from 'react'
import { useMaskedInput } from './hooks/useMaskedInput'

const MaskedInput = forwardRef(
  ({ value, onChange, format = 'dd/mm/yyyy', ...props }, ref) => {
    const [displayValue, handleChange] = useMaskedInput(value, format, onChange)
    console.log('Format dans MaskedInput:', format)

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
