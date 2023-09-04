import enTranslations from '../translations/en.json'
import frTranslations from '../translations/fr.json'

function getTranslations(language = 'en') {
  switch (language) {
    case 'fr':
      return frTranslations
    case 'en':
    default:
      return enTranslations
  }
}

export default getTranslations
