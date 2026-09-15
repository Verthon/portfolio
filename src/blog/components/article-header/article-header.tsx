import { h, type ComponentChildren } from 'preact'
import styles from './article-header.module.css'

type ArticleHeaderProps = {
  children?: ComponentChildren
}

export default function ArticleHeader({ children }: ArticleHeaderProps) {
  return h('header', { className: styles.articleHeader }, children)
}
