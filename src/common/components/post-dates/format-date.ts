const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const toIsoDate = (value: string | Date) =>
  new Date(value).toISOString().slice(0, 10)

export const toDisplayDate = (value: string | Date) => {
  const date = new Date(value)
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}
