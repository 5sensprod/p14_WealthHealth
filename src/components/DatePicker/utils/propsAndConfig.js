import { DEFAULT_CONFIG } from '../config/defaultConfig'

export const handlePropsAndConfig = (configProps) => {
  let {
    useIcons,
    dateFormat,
    outputFormat,
    customStyles,
    startOfWeek,
    manualInputEnabled,
    minYear,
    maxYear,
  } = {
    ...DEFAULT_CONFIG,
    ...configProps,
    outputFormat: configProps.outputFormat || configProps.dateFormat,
  }

  if (DEFAULT_CONFIG.DATE_FORMATS[dateFormat]) {
    dateFormat = DEFAULT_CONFIG.DATE_FORMATS[dateFormat]
  }

  return {
    useIcons,
    dateFormat,
    outputFormat,
    customStyles,
    startOfWeek,
    manualInputEnabled,
    minYear: configProps.minYear || minYear, // Surchargez ici
    maxYear: configProps.maxYear || maxYear, // Surchargez ici
  }
}
