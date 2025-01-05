import { component$ } from '@builder.io/qwik'

import { articlePicture, figCaption } from './article-image.module.css'

type ArticleImageProps = {
  webpImagePath: string
  fallbackImagePath: string
  alt?: string
  caption?: string
}

export default component$(
  ({
    fallbackImagePath,
    webpImagePath,
    alt = '',
    caption,
  }: ArticleImageProps) => {
    if (caption) {
      return (
        <figure
          class="articlePicture"
          role="group"
          aria-labelledby="imageCaption"
        >
          <picture>
            <source type="image/webp" srcset={webpImagePath} />
            <img
              loading="lazy"
              decoding="async"
              src={fallbackImagePath}
              alt={alt}
            />
          </picture>
          <figcaption class={figCaption} id="imageCaption">
            {caption}
          </figcaption>
        </figure>
      )
    }

    return (
      <picture class={articlePicture}>
        <source type="image/webp" srcset={webpImagePath} />
        <img
          loading="lazy"
          decoding="async"
          src={fallbackImagePath}
          alt={alt}
        />
      </picture>
    )
  }
)
