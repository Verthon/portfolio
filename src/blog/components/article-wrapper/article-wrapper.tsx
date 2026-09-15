import { h, type ComponentChildren } from 'preact'
import ArticleContainer from '../article-container/article-container'
import styles from './article-wrapper.module.css'

type ArticleWrapperProps = {
  children?: ComponentChildren
}

export default function ArticleWrapper({ children }: ArticleWrapperProps) {
  return h(
    'div',
    { className: styles.articleWrapper },
    h(ArticleContainer, null, children)
  )
}
