type MediaServiceProps = {
  matchMedia?: typeof window.matchMedia
}

export const createMediaService = ({ matchMedia }: MediaServiceProps) => {
  const isSupported = () => typeof matchMedia !== 'undefined'

  const createMediaQueryList = ({ query }: { query: string }) => {
    return isSupported()
      ? matchMedia?.(query)
      : {
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: (event: Event) => !!event,
        }
  }

  const getValueFromMediaQuery = <T>({
    mediaQueryLists,
    values,
    defaultValue,
  }: {
    mediaQueryLists: MediaQueryList[]
    values: T[]
    defaultValue: T
  }) => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches)
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue
  }

  return {
    createMediaQueryList,
    getValueFromMediaQuery,
  }
}
