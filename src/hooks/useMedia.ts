import * as React from 'react'

import { isBrowser } from '../utils/environment'

export const useMedia = <T>(queries: string[], values: T[], defaultValue: T) => {
  const mediaQueryLists = queries.map((q) =>
    isBrowser ? window.matchMedia(q) : {matches: ""}
  )

  const getValue = () => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches)

    return typeof values[index] !== 'undefined' ? values[index] : defaultValue
  }

  const [value, _setValue] = React.useState(getValue)

  React.useEffect(() => {
    //@ts-ignore
    mediaQueryLists.forEach((mql) => mql.addListener(handler))
    //@ts-ignore
    return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler))
  }, [])

  return value
}
