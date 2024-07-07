import { component$ } from '@builder.io/qwik'

import { articlePicture } from './article-image.module.css'

type ArticleImageProps = {
  webpImagePath: string
  fallbackImagePath: string
}

export default component$(
  ({ fallbackImagePath, webpImagePath }: ArticleImageProps) => {
    return (
      <picture class={articlePicture}>
        <source type="image/webp" srcset={webpImagePath} />
        <img loading="lazy" decoding="async" src={fallbackImagePath} alt="test" />
      </picture>
    )
  }
)
