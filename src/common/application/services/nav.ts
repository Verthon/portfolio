import type { LinkVariant, SlugVariant } from '~/common/domain/models/nav'

export const generateNavLink = ({
  linkType,
  slug,
}: {
  linkType: LinkVariant
  slug: SlugVariant
}) => {
  if (linkType === 'hash') return `#${slug}`

  return slug === 'home' ? '/' : `/${slug}`
}

export const isNestedPathname = ({ pathname }: { pathname: string }) => {
  const pathnameWithoutTrailingSlash = pathname.replace(/\/$/, '');
  const pathNameSegments = pathnameWithoutTrailingSlash.split('/')

  return pathNameSegments.length > 2
}
