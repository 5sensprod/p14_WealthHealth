import { DEFAULT_CONFIG } from '../config/defaultConfig'
import { applyYearConfig } from './dateNavigations'

export const handlePropsAndConfig = (configProps) => {
  const {
    useIcons,
    dateFormat,
    customStyles,
    startOfWeek,
    manualInputEnabled,
    minYear,
    maxYear,
    language,
    yearBlockSize,
    designType,
  } = {
    ...DEFAULT_CONFIG,
    ...configProps,
  }

  const currentYear = new Date().getFullYear()

  const getProcessedValue = (originalValue, defaultValue, processingFunc) =>
    originalValue !== undefined
      ? processingFunc
        ? processingFunc(originalValue)
        : originalValue
      : defaultValue

  return {
    language: getProcessedValue(language, DEFAULT_CONFIG.LANGUAGE),
    useIcons: getProcessedValue(useIcons, DEFAULT_CONFIG.USE_ICONS),
    dateFormat: getProcessedValue(
      dateFormat,
      DEFAULT_CONFIG.DATE_FORMATS[DEFAULT_CONFIG.DATE_FORMAT],
      (val) => DEFAULT_CONFIG.DATE_FORMATS[val],
    ),
    customStyles,
    startOfWeek: getProcessedValue(startOfWeek, DEFAULT_CONFIG.START_OF_WEEK),
    manualInputEnabled: getProcessedValue(
      manualInputEnabled,
      DEFAULT_CONFIG.MANUAL_INPUT_ENABLED,
    ),
    minYear: getProcessedValue(minYear, DEFAULT_CONFIG.MIN_YEAR, (val) =>
      applyYearConfig(val, currentYear),
    ),
    maxYear: getProcessedValue(maxYear, DEFAULT_CONFIG.MAX_YEAR, (val) =>
      applyYearConfig(val, currentYear),
    ),
    yearBlockSize: getProcessedValue(
      yearBlockSize,
      DEFAULT_CONFIG.YEAR_BLOCK_SIZE,
    ),
    designType: getProcessedValue(designType, DEFAULT_CONFIG.DESIGN_TYPE),
  }
}
