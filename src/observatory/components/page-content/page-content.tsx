import { component$ } from '@builder.io/qwik'

import Container from '~/common/components/container/container'
import Heading from '~/common/components/heading/heading'
import List from '~/common/components/list/list'
import Text from '~/common/components/text/text'
import ObservatoryList from '~/observatory/components/list/list'

const items = [
  {
    title: 'Playwright Component Testing',
    status: 'Experimental' as const,
    shortPreview: 'Leverage real browsers to test UI components. Currently lacks a clear roadmap to a beta release.',
    href: '/observatory/playwright-component-testing',
  },
];

export default component$(() => {
  return (
    <Container>
      <Heading tag="h1">Observatory</Heading>
      <Text>
        Tracker for the promising technologies. Straight to the point, without marketing
        and hype.
      </Text>

      <Heading tag="h2">What is it?</Heading>
      <Text>
      The Observatory tracks implementation trade-offs and technical constraints of web tools. Each analysis focuses on current limitations, adoption risks, and ongoing development status.
      </Text>

      <Text>Here, you’ll find:</Text>

      <List
        listItems={[
          'Short status updates (e.g., beta, stable, experimental)',
          'Short overview of each tool',
          'Key adoption considerations for projects',
          'Links to resources if you want to explore further',
        ]}
      />

      <Heading tag="h2">Update Frequency</Heading>

      <List
        listItems={[
          `Major Updates: Quarterly or when a big announcement happens
          (e.g., major version release, beta release after experimental phase).`,
          `Minor Tweaks: Ongoing, as issues are reported or new insights
          arise.`,
        ]}
      />

      <Heading tag="h2">Explore the observatory</Heading>
      <Text>
        Below are the current focus areas. Each links to its dedicated subpage
        with more details:
      </Text>

      <ObservatoryList items={items} />
    </Container>
  )
})
