import { DEFAULT_CONFIG } from '../config/defaultConfig'
import { applyYearConfig } from './dateNavigations'

export const handlePropsAndConfig = (configProps) => {
  const {
    useIcons: originalUseIcons,
    dateFormat: originalDateFormat,
    outputFormat: originalOutputFormat,
    customStyles,
    startOfWeek: originalStartOfWeek,
    manualInputEnabled: originalManualInputEnabled,
    minYear: originalMinYear,
    maxYear: originalMaxYear,
    language: originalLanguage,
    yearBlockSize: originalYearBlockSize,
  } = {
    ...DEFAULT_CONFIG,
    ...configProps,
  }

  const dateFormat = originalDateFormat
    ? originalDateFormat
    : DEFAULT_CONFIG.DATE_FORMATS[DEFAULT_CONFIG.DATE_FORMAT]

  const outputFormat = originalOutputFormat || dateFormat

  const currentYear = new Date().getFullYear()

  const minYear =
    applyYearConfig(originalMinYear || DEFAULT_CONFIG.MIN_YEAR, currentYear) ||
    DEFAULT_CONFIG.MIN_YEAR

  const maxYear =
    applyYearConfig(originalMaxYear || DEFAULT_CONFIG.MAX_YEAR, currentYear) ||
    DEFAULT_CONFIG.MAX_YEAR

  const startOfWeek =
    originalStartOfWeek !== undefined
      ? originalStartOfWeek
      : DEFAULT_CONFIG.START_OF_WEEK

  const useIcons =
    originalUseIcons !== undefined ? originalUseIcons : DEFAULT_CONFIG.USE_ICONS

  const language =
    originalLanguage !== undefined ? originalLanguage : DEFAULT_CONFIG.LANGUAGE

  const manualInputEnabled =
    originalManualInputEnabled !== undefined
      ? originalManualInputEnabled
      : DEFAULT_CONFIG.MANUAL_INPUT_ENABLED

  const yearBlockSize =
    originalYearBlockSize !== undefined
      ? originalYearBlockSize
      : DEFAULT_CONFIG.YEAR_BLOCK_SIZE

  return {
    language,
    useIcons,
    dateFormat,
    outputFormat,
    customStyles,
    startOfWeek,
    manualInputEnabled,
    minYear,
    maxYear,
    yearBlockSize,
  }
}
