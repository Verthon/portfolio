import { Resource, component$ } from '@builder.io/qwik'

import Container from '~/common/components/container/container'
import DevBitesList from '../dev-bites-list/dev-bites-list'
import { useAllDevBitesResource } from '~/dev-bites/application/hooks/useAllDevBitesResource'
import Text from '~/common/components/text/text'
import Heading from '~/common/components/heading/heading'

export default component$(() => {
  const devBitesResource = useAllDevBitesResource()

  return (
    <Container>
      <Heading tag='h1'>Latest dev bites</Heading>
      <Text>All my brief takes on programming problems, packed into bite-sized reads.</Text>
      <Resource
        value={devBitesResource}
        onResolved={(devBites) => <DevBitesList list={devBites} />}
      />
    </Container>
  )
})
