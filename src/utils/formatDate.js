/**
 * Formate une date selon le format spécifié.
 *
 * @function
 * @param {Date} date - La date à formater.
 * @param {string} [format='YYYY-MM-DD'] - Le format de date souhaité. Par défaut, il est 'YYYY-MM-DD'.
 * @returns {string|null} La date formatée ou null si l'argument "date" n'est pas une instance de Date.
 * @example
 * formatDate(new Date(2023, 5, 1), 'DD-MM-YYYY') // "01-06-2023"
 */
export const formatDate = (dateString, format = 'YYYY-MM-DD') => {
  const date = new Date(dateString)
  switch (format) {
    case 'YYYY-MM-DD':
      return date.toISOString().split('T')[0]
    case 'DD/MM/YYYY':
      return `${String(date.getDate()).padStart(2, '0')}/${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}/${date.getFullYear()}`
    case 'MM/DD/YYYY':
      return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(
        date.getDate(),
      ).padStart(2, '0')}/${date.getFullYear()}`
    case 'DD-MM-YYYY':
      return `${String(date.getDate()).padStart(2, '0')}-${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}-${date.getFullYear()}`
    // Ajoutez d'autres formats au besoin
    default:
      return date.toISOString().split('T')[0]
  }
}
