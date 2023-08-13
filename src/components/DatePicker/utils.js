export function abbreviateMonth(month) {
  if (month.length > 5) {
    return month.substring(0, 4) + '.'
  }
  return month
}
