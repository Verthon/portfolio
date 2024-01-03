export type TabHeaderName = 'Frontend' | 'General'

export type TabsHeader = {
  name: TabHeaderName
  description: string
}

export type TabsContent = {
  title: string
  tech: string[]
}

export type TabsContentTuple = [TabsContent[], TabsContent[]]

export type TabsEmptyNode = {
  node: {
    tabs: null
  }
}

export type TabsDataNode = {
  node: {
    tabs: {
      content: TabsContentTuple
      headers: TabsHeader[]
    }
  }
}
