import { DEFAULT_CONFIG } from '../config/defaultConfig'

export const MASK_FORMATS = {
  [DEFAULT_CONFIG.DATE_FORMATS.DEFAULT]: [2, 5],
  [DEFAULT_CONFIG.DATE_FORMATS.US]: [2, 5],
  [DEFAULT_CONFIG.DATE_FORMATS.ISO]: [4, 7],
}

export function formatToMask(value, format, separator = '/') {
  const positions = MASK_FORMATS[format] || []
  if (!positions.length) {
    throw new Error(`Invalid format: ${format}`)
  }

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
