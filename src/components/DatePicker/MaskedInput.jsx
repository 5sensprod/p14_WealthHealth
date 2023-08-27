import React, { forwardRef } from 'react'
import { useMaskedInput } from './hooks/useMaskedInput'

const MaskedInput = forwardRef(
  ({ value, onChange, format = 'DEFAULT', ...props }, ref) => {
    const [displayValue, handleChange] = useMaskedInput(value, format, onChange)

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
