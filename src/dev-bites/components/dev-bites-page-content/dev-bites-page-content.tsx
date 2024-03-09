import { Resource, component$ } from '@builder.io/qwik'

import Container from '~/common/components/container/container'
import DevBitesList from '../dev-bites-list/dev-bites-list'
import { useAllDevBitesResource } from '~/dev-bites/application/hooks/useAllDevBitesResource'

export default component$(() => {
  const devBitesResource = useAllDevBitesResource()

  return (
    <Container>
      <h1>Latest dev bites</h1>
      <p>All my brief takes on programming problems, packed into bite-sized reads.</p>
      <Resource
        value={devBitesResource}
        onResolved={(devBites) => <DevBitesList list={devBites} />}
      />
    </Container>
  )
})
