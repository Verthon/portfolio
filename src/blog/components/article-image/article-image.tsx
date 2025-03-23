import { component$ } from '@builder.io/qwik'

import { articlePicture, figCaption } from './article-image.module.css'

type ArticleImageProps = {
  webpImagePath: string
  fallbackImagePath: string
  width: number
  height: number
  alt?: string
  caption?: string
  ariaLabelledBy?: string
}

export default component$(
  ({
    fallbackImagePath,
    webpImagePath,
    width,
    height,
    alt = '',
    caption,
    ariaLabelledBy,
  }: ArticleImageProps) => {
    if (caption) {
      return (
        <figure
          class="articlePicture"
          role="group"
          aria-labelledby={ariaLabelledBy}
        >
          <picture>
            <source type="image/webp" srcset={webpImagePath} />
            <img
              loading="lazy"
              decoding="async"
              width={width}
              height={height}
              src={fallbackImagePath}
              alt={alt}
            />
          </picture>
          <figcaption class={figCaption} id={ariaLabelledBy}>
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
          width={width}
          height={height}
          src={fallbackImagePath}
          alt={alt}
        />
      </picture>
    )
  }
)
