import { h, type ComponentChildren } from 'preact'
import PostDates from '~/common/components/post-dates/post-dates'
import PostMeta, {
  type PostFrontmatter,
} from '~/common/components/post-meta/post-meta'
import styles from './header.module.css'

type HeaderProps = {
  children?: ComponentChildren
  frontmatter: PostFrontmatter
}

export default function Header({ children, frontmatter }: HeaderProps) {
  if (!frontmatter?.date) {
    throw new Error('Header needs frontmatter={frontmatter} from the MDX')
  }

  return h(
    'header',
    { className: styles.header },
    children,
    h(
      PostMeta,
      null,
      h(PostDates, {
        date: frontmatter.date,
        lastUpdated: frontmatter.last_updated,
      })
    )
  )
}
