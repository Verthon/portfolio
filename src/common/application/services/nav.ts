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
