export const formatDate = (date) => {
  if (!(date instanceof Date)) return null
  return date.toISOString().split('T')[0]
}
