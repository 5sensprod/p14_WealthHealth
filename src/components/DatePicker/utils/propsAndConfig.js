import { DEFAULT_CONFIG } from '../config/defaultConfig'
import { applyYearConfig } from './dateNavigations'

export const handlePropsAndConfig = (configProps) => {
  const {
    useIcons,
    dateFormat: originalDateFormat,
    outputFormat: originalOutputFormat,
    customStyles,
    startOfWeek,
    manualInputEnabled,
    minYear: originalMinYear,
    maxYear: originalMaxYear,
  } = {
    ...DEFAULT_CONFIG,
    ...configProps,
  }

  const dateFormat = DEFAULT_CONFIG.DATE_FORMATS[originalDateFormat]
    ? DEFAULT_CONFIG.DATE_FORMATS[originalDateFormat]
    : originalDateFormat

  const outputFormat = originalOutputFormat || dateFormat

  const currentYear = new Date().getFullYear()

  // Appliquez le traitement pour minYear et maxYear
  const minYear = applyYearConfig(
    originalMinYear || DEFAULT_CONFIG.minYear,
    currentYear,
  )
  const maxYear = applyYearConfig(
    originalMaxYear || DEFAULT_CONFIG.maxYear,
    currentYear,
  )

  return {
    useIcons,
    dateFormat,
    outputFormat,
    customStyles,
    startOfWeek,
    manualInputEnabled,
    minYear,
    maxYear,
  }
}
