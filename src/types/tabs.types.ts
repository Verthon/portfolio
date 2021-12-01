export type TabsHeader  = {
  name: string,
  description: string
  tab: string
}

export type TabsContent = {
  title: string,
  tech: string[]
}

export type TabsContentTuple = [TabsContent[], TabsContent[]]