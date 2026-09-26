import { h, type ComponentChildren } from 'preact'
import PostDates from '~/common/components/post-dates/post-dates'
import styles from './article-header.module.css'

type ArticleHeaderProps = {
  children?: ComponentChildren
  date?: string | Date
  lastUpdated?: string | Date
}

export default function ArticleHeader({
  children,
  date,
  lastUpdated,
}: ArticleHeaderProps) {
  return h(
    'header',
    { className: styles.articleHeader },
    children,
    date ? h(PostDates, { date, lastUpdated }) : null
  )
}
