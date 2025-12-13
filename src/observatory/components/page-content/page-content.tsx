import { component$ } from '@builder.io/qwik'

import Container from '~/common/components/container/container'
import Heading from '~/common/components/heading/heading'
import List from '~/common/components/list/list'
import Text from '~/common/components/text/text'
import ObservatoryList from '~/observatory/components/list/list'

const items = [
  {
    title: 'Oxlint JavaScript Plugins',
    status: 'Technical Preview' as const,
    shortPreview:
      'Extend Oxlint with JavaScript plugins while keeping near-Rust performance. Still experimental',
    href: '/observatory/oxlint-js-plugins',
  },
  {
    title: 'Base UI Headless Library',
    status: 'Stable' as const,
    shortPreview:
      'Headless UI library from creators of Radix, Floating UI, and Material UI. It is stable',
    href: '/observatory/base-ui-headless',
  },
  {
    title: 'Playwright Component Testing',
    status: 'Superseded' as const,
    shortPreview:
      'Stalled for ~4 years, no roadmap. Prefer Cypress CT or Vitest Browser',
    href: '/observatory/playwright-component-testing',
  },
]

export default component$(() => {
  return (
    <Container>
      <Heading tag="h1">Observatory</Heading>
      <Text>
        Tracker for the promising technologies. Straight to the point, without
        marketing and hype.
      </Text>

      <Heading tag="h2">What is it?</Heading>
      <Text>
        The Observatory tracks implementation trade-offs and technical
        constraints of web tools. Each analysis focuses on current limitations,
        adoption risks, and ongoing development status.
      </Text>

      <Text>Here, you'll find:</Text>

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
