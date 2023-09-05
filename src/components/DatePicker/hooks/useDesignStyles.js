import styles from '../Calendar.module.css'
import alternativeStyles from '../AlternativeCalendar.module.css'

const useDesignStyles = (designType = 'default') => {
  let selectedStyles = styles
  let designClass = ''

  if (designType === 'neuro') {
    selectedStyles = { ...styles, ...alternativeStyles }
    designClass = 'neuro'
  } else if (designType === 'glass') {
    selectedStyles = { ...styles, ...alternativeStyles }
    designClass = 'glass'
  }

  const dayClass = alternativeStyles[`${designClass}Day`]
  const grayedDayClass = alternativeStyles[`${designClass}GrayedDay`]
  const daysContainerClass = alternativeStyles[`${designClass}DaysContainer`]
  const activeClass = alternativeStyles[`${designClass}Active`]
  const headerClass = alternativeStyles[`${designClass}Header`]
  const todayClass = alternativeStyles[`${designClass}Today`]

  return {
    selectedStyles,
    designClass,
    dayClass,
    grayedDayClass,
    daysContainerClass,
    activeClass,
    todayClass,
    headerClass,
  }
}

export default useDesignStyles
