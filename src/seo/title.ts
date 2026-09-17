const SEPARATOR = ' • '
const SITE_SUFFIX = 'sordyl.dev'
const AUTHOR = 'Krzysztof Sordyl'
const HOME_TAGLINE = 'Architecture & DX at Scale'

const SUFFIX = `${SEPARATOR}${SITE_SUFFIX}`

export const buildTitle = (pageTitle: string) => {
  const trimmed = pageTitle.trim()

  if (!trimmed) {
    throw new Error('buildTitle requires a non-empty page title')
  }

  return trimmed.endsWith(SUFFIX) ? trimmed : `${trimmed}${SUFFIX}`
}

export const homeTitle = () => `${AUTHOR}${SEPARATOR}${HOME_TAGLINE}`
