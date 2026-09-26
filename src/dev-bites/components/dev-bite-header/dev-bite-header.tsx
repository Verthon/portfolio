import { h, type ComponentChildren } from 'preact'
import PostDates from '~/common/components/post-dates/post-dates'
import styles from './dev-bite-header.module.css'

type DevBiteHeaderProps = {
  children?: ComponentChildren
  date?: string | Date
  lastUpdated?: string | Date
}

export default function DevBiteHeader({
  children,
  date,
  lastUpdated,
}: DevBiteHeaderProps) {
  return h(
    'header',
    { className: styles.devBiteHeader },
    children,
    date ? h(PostDates, { date, lastUpdated }) : null
  )
}
