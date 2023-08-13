import enTranslations from './translations/en.json'
import frTranslations from './translations/fr.json'

function getTranslations(language = 'en') {
  return language === 'fr' ? frTranslations : enTranslations
}

export default getTranslations
