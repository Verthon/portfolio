export type Project = {
  name: string
  technologies: string[]
  description: string
  github: string
  live: string
  animation: string
}

export type ImageNode = {
  node: {
    base: string
    childImageSharp: {
      fluid: {
        srcSet: string
      }
    }
  }
}

export type ProjectsQueryResponse = {
  allFile: {
    edges: ImageNode[]
  }
  contentJson: {
    projects: Project[]
  }
}