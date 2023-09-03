import styles from '../Calendar.module.css'
import alternativeStyles from '../AlternativeCalendar.module.css'

const useDesignStyles = (designType) => {
  const selectedStyles = designType === 'default' ? styles : alternativeStyles
  const designClass =
    designType === 'neuro' ? 'neuro' : designType === 'glass' ? 'glass' : ''

  return { selectedStyles, designClass }
}

export default useDesignStyles
