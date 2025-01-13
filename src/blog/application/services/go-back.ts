import { isNestedPathname } from '~/common/application/services/nav'

export const generateGoBackMetadata = ({ pathname }: { pathname: string }) => {
  if (isNestedPathname({ pathname })) {
    return {
      shouldRender: true,
      text: 'Go back',
      href: '/blog',
    }
  }

  return {
    shouldRender: false,
    text: undefined,
    href: undefined,
  }
}
