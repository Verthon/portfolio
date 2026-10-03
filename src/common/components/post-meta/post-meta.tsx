import { h, type ComponentChildren } from 'preact'
import styles from './post-meta.module.css'

export type PostFrontmatter = {
  date: string | Date
  last_updated?: string | Date
}

type PostMetaProps = {
  children?: ComponentChildren
}

export default function PostMeta({ children }: PostMetaProps) {
  return h('div', { className: styles.postMeta }, children)
}
