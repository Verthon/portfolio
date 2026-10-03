import { h, type ComponentChildren } from 'preact'
import PostDates from '~/common/components/post-dates/post-dates'
import PostMeta, {
  type PostFrontmatter,
} from '~/common/components/post-meta/post-meta'
import styles from './dev-bite-header.module.css'

type DevBiteHeaderProps = {
  children?: ComponentChildren
  frontmatter: PostFrontmatter
}

export default function DevBiteHeader({
  children,
  frontmatter,
}: DevBiteHeaderProps) {
  if (!frontmatter?.date) {
    throw new Error(
      'DevBiteHeader needs frontmatter={frontmatter} from the MDX'
    )
  }

  return h(
    'header',
    { className: styles.devBiteHeader },
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
