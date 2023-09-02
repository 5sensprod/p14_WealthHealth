import { useState, useEffect } from 'react'
import { formatToMask } from '../utils/dateFunctions'

export const useMaskedInput = (initialValue, format, onChange) => {
  const [displayValue, setDisplayValue] = useState(
    formatToMask(initialValue, format),
  )

  useEffect(() => {
    setDisplayValue(formatToMask(initialValue, format))
  }, [initialValue, format])

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

  return [displayValue, handleChange]
}
