import { Resource, component$ } from '@builder.io/qwik'

import DevBitesList from '../dev-bites-list/dev-bites-list'
import { useFeaturedDevBitesResource } from '~/dev-bites/application/hooks/useFeaturedDevBitesResource'

export default component$(() => {
  const devBitesResource = useFeaturedDevBitesResource()

  return (
    <Resource
      value={devBitesResource}
      onResolved={(devBites) => (
        <DevBitesList
          list={devBites}
          orientation="vertical"
          withBadges={true}
        />
      )}
    />
  )
})
