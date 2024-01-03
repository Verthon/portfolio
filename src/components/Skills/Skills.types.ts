import type { Quote } from '../../types/quote.types'
import type { TabsDataNode, TabsEmptyNode } from '../../types/tabs.types'

export type SkillsQueryResponse = {
  site: {
    siteMetadata: {
      quote: Quote
    }
  }
  allContentJson: {
    edges: [TabsDataNode, TabsEmptyNode]
  }
}
