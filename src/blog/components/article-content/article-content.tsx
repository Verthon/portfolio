import { h, type ComponentChildren } from 'preact'
import styles from './article-content.module.css'

type ArticleContentProps = {
  children?: ComponentChildren
}

export default function ArticleContent({ children }: ArticleContentProps) {
  return h('div', { className: styles.articleContent }, children)
}
