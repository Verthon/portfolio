import { h, type ComponentChildren } from 'preact'
import styles from './article-container.module.css'

type ArticleContainerProps = {
  children?: ComponentChildren
}

export default function ArticleContainer({ children }: ArticleContainerProps) {
  return h('div', { className: styles.articleContainer }, children)
}
