export type Props = {
  scrollToComponent: (component: string) => void
}

export type HeaderData = {
  site: {
    siteMetadata: {
      author: string
      position: string
      location: string
    }
  }
}