import { h, type ComponentChildren } from 'preact'
import PostDates from '~/common/components/post-dates/post-dates'
import styles from './header.module.css'

type HeaderProps = {
  children?: ComponentChildren
  date?: string | Date
  lastUpdated?: string | Date
}

export default function Header({ children, date, lastUpdated }: HeaderProps) {
  return h(
    'header',
    { className: styles.header },
    children,
    date ? h(PostDates, { date, lastUpdated }) : null
  )
}
