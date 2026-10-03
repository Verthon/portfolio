import { h, type ComponentChildren } from 'preact'
import PostDates from '~/common/components/post-dates/post-dates'
import PostMeta, {
  type PostFrontmatter,
} from '~/common/components/post-meta/post-meta'
import styles from './article-header.module.css'

type ArticleHeaderProps = {
  children?: ComponentChildren
  frontmatter: PostFrontmatter
}

export default function ArticleHeader({
  children,
  frontmatter,
}: ArticleHeaderProps) {
  if (!frontmatter?.date) {
    throw new Error(
      'ArticleHeader needs frontmatter={frontmatter} from the MDX'
    )
  }

  return h(
    'header',
    { className: styles.articleHeader },
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
