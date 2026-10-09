import { h } from 'preact'
import { toDisplayDate, toIsoDate } from './format-date'
import styles from './post-dates.module.css'

type PostDatesProps = {
  date: string | Date
  lastUpdated?: string | Date
}

export default function PostDates({ date, lastUpdated }: PostDatesProps) {
  const published = toIsoDate(date)
  const updated = lastUpdated ? toIsoDate(lastUpdated) : undefined

  return h(
    'p',
    { className: styles.postDates },
    h(
      'span',
      { className: styles.entry },
      'Published ',
      h('time', { dateTime: published }, toDisplayDate(date))
    ),
    updated && updated !== published && lastUpdated
      ? h(
          'span',
          { className: styles.entry },
          'Updated ',
          h(
            'time',
            { dateTime: updated, className: styles.updated },
            toDisplayDate(lastUpdated)
          )
        )
      : null
  )
}
