export const formatDate = (date, format = 'YYYY-MM-DD') => {
  if (!(date instanceof Date)) return null

  switch (format) {
    case 'YYYY-MM-DD':
      return date.toISOString().split('T')[0]
    case 'DD-MM-YYYY':
      return `${String(date.getDate()).padStart(2, '0')}-${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}-${date.getFullYear()}`
    // Ajoutez d'autres formats au besoin
    default:
      return date.toISOString().split('T')[0]
  }
}

export const formatDateWithSlashes = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}/${String(date.getDate()).padStart(2, '0')}`
}
