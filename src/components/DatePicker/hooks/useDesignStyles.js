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

  return { selectedStyles, designClass }
}

export default useDesignStyles
