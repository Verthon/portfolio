import { h } from 'preact'
import styles from './post-dates.module.css'

type PostDatesProps = {
  date: string | Date
  lastUpdated?: string | Date
}

const toIsoDate = (value: string | Date) =>
  new Date(value).toISOString().slice(0, 10)

export default function PostDates({ date, lastUpdated }: PostDatesProps) {
  const published = toIsoDate(date)
  const updated = lastUpdated ? toIsoDate(lastUpdated) : undefined

  return h(
    'p',
    { className: styles.postDates },
    'Published ',
    h('time', { dateTime: published }, published),
    updated && updated !== published
      ? [' · Updated ', h('time', { dateTime: updated }, updated)]
      : null
  )
}
