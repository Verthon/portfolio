import { useStore, useTask$ } from '@builder.io/qwik'
import { isServer } from '@builder.io/qwik/build'
import { createMediaService } from '../services/media'

type UseMediaProps<T> = {
  queries: string[]
  values: T[]
  defaultValue: T
}

export const useMedia = <T>({
  defaultValue,
  queries,
  values,
}: UseMediaProps<T>) => {
  const store = useStore({ value: defaultValue })

  useTask$(({ track }) => {
    track(() => store.value)

    if (isServer) {
      store.value = defaultValue
      return
    }

    const mediaService = createMediaService({ matchMedia: window.matchMedia })

    const mediaQueryLists = queries.map((query) =>
      mediaService.createMediaQueryList({ query })
    )

    const updateValue = () => {
      store.value = mediaService.getValueFromMediaQuery({
        //@ts-ignore
        mediaQueryLists: mediaQueryLists,
        values,
        defaultValue,
      })
    }

    updateValue()

    mediaQueryLists.forEach(
      (mql) => mql?.addEventListener('change', updateValue)
    )

    return () =>
      mediaQueryLists.forEach(
        (mql) => mql?.removeEventListener('change', updateValue)
      )
  })

  return store.value
}
