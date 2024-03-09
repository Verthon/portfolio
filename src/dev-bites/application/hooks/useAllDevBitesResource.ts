import { useResource$ } from '@builder.io/qwik'

import { getAllDevBites } from '../services/dev-bites'

export const useAllDevBitesResource = () => {
  const devBitesResource = useResource$(getAllDevBites)

  return devBitesResource
}
