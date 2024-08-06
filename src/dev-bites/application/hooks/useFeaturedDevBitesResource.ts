import { useResource$ } from '@builder.io/qwik'

import { getAllFeaturedDevBites } from '../services/dev-bites'

export const useFeaturedDevBitesResource = () => {
  const devBitesResource = useResource$(getAllFeaturedDevBites)

  return devBitesResource
}
