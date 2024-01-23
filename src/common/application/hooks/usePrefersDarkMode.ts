import { useMedia } from '~/common/infrastructure/hooks/useMedia'

export const usePrefersDarkMode = () => {
  return useMedia({
    defaultValue: false,
    queries: ['(prefers-color-scheme: dark)'],
    values: [true],
  })
}
