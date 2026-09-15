import { h } from 'preact'
import styles from './article-image.module.css'

type ArticleImageProps = {
  webpImagePath: string
  fallbackImagePath: string
  width: number
  height: number
  alt?: string
  caption?: string
  ariaLabelledBy?: string
}

export default function ArticleImage({
  fallbackImagePath,
  webpImagePath,
  width,
  height,
  alt = '',
  caption,
  ariaLabelledBy,
}: ArticleImageProps) {
  const pictureElement = h(
    'picture',
    null,
    h('source', { type: 'image/webp', srcSet: webpImagePath }),
    h('img', {
      loading: 'lazy',
      decoding: 'async',
      width,
      height,
      src: fallbackImagePath,
      alt,
    })
  )

  if (caption) {
    return h(
      'figure',
      {
        className: styles.articlePicture,
        role: 'group',
        'aria-labelledby': ariaLabelledBy,
      },
      pictureElement,
      h(
        'figcaption',
        { className: styles.figCaption, id: ariaLabelledBy },
        caption
      )
    )
  }

  return h(
    'picture',
    { className: styles.articlePicture },
    h('source', { type: 'image/webp', srcSet: webpImagePath }),
    h('img', {
      loading: 'lazy',
      decoding: 'async',
      width,
      height,
      src: fallbackImagePath,
      alt,
    })
  )
}
