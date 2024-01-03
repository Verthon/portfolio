import type { TabsContentTuple, TabsHeader } from '../../types/tabs.types'

export type TabType = 'frontend' | 'general'
export type Props = {
  headers: TabsHeader[]
  content: TabsContentTuple
}
