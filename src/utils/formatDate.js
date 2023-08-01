export const formatDate = (date) => {
  if (!(date instanceof Date)) return null
  return date.toISOString().split('T')[0]
}

export const formatDateWithSlashes = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}/${String(date.getDate()).padStart(2, '0')}`
}
