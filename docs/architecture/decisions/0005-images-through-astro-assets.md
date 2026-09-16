# 0005 — Images go through `astro:assets`

Decided 2026-09-16. Supersedes the "MDX files stay unchanged" constraint in
[0004](./0004-component-tech-split.md) for image components only; the rest of
0004 stands.

## Decision

Post images live in the post's own folder (`src/content/blog/<slug>/*.jpg`) and
render through `<Picture />` from `astro:assets`, wrapped by
`src/blog/components/article-image/article-image.astro`. `sharp` is a direct
devDependency. `public/blogImages/` is gone.

MDX imports the wrapper with its extension spelled out:

    import ArticleImage from '~/blog/components/article-image/article-image.astro'
    import bundlephobiaResults from './bundlephobia-results.jpg'

    <ArticleImage src={bundlephobiaResults} caption="…" ariaLabelledBy="…" />

## Why

Images in `public/` are passthrough — `dist/blogImages` was byte-identical to
the source. Every reader got one full-width asset regardless of device: a
1268px-wide JPEG to a 390px phone. That is the *Core Web Vitals stay high*
driver going unserved.

Astro generates four widths per image with `srcset`/`sizes` written for it, and
reads `width`/`height` off the file at build time. Those dimensions used to be
hand-typed props with nothing verifying them — all 10 happened to be correct,
but the next one added by hand is an unguarded CLS regression.

Measured, per-visitor, on the four affected posts. AVIF at q60, WebP fallback:

| Page | Was (hand-made webp) | Now, desktop | Now, mobile (640w) |
| --- | --- | --- | --- |
| measure-package-sizes-effectively | 76,986 B | 68,990 B (-10%) | 32,345 B |
| rsdoctor-next-gen-bundle-analyzer | 67,296 B | 63,673 B (-5%) | 28,419 B |
| storybook-testing-overview | 42,134 B | 41,324 B (-2%) | 8,044 B |
| migrating-personal-website-to-qwik-city | 42,538 B | 43,016 B (+1%) | 11,937 B |

## What it costs

Desktop is now flat to slightly better and mobile improves 60-80%. Getting there
needed AVIF: sharp's default WebP quality is 80, which produced *larger* files
than the hand-made WebPs it replaced (8,206 B vs 6,960 B on one image). Measured
across all 10 images, `avif q60` is 20% smaller than `webp q80` and lands within
4 bytes of the old hand-tuned compression. Hence `<Picture />` with an AVIF
`<source>` and a WebP `<img>` fallback, and explicit quality in
`image.service.config`.

Two formats x four widths means 80 files from 10 sources; `dist/` image bytes go
778 KB -> ~1.9 MB. That is build output, not per-visitor transfer. Build time
grows to ~6s, most of it AVIF encoding, which is slower than WebP by design.

`sharp` is a real native dependency now — it ships with Astro but pnpm doesn't
hoist it, so without the direct entry the build warns `MissingSharp` and silently
skips optimization.

The `.avif` files already in `public/blogImages/` were deleted. Nothing
referenced them — they were generated once and never wired up, which is
precisely the hand-maintenance failure this replaces.

## What else was considered

**Leave it.** Rejected: the hand-maintenance is the thing that rots, and the
dimension props are unguarded.

**Keep `ArticleImage` as `.tsx`.** Not possible — Preact can't render an Astro
component, and `astro:assets` has no Preact equivalent.

**`<Image />` with WebP only.** Shipped first, then reverted: it regressed
desktop 10-35% because sharp's q80 default is weaker than the old hand-tuned
compression. AVIF is what makes this a win on every axis.
