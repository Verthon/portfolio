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

export type ProjectEmptyNode = {
  node : {
    projects: null,
    id: string,
  }
}

export type ProjectNode = {
  node: {
    projects: Project[],
    id: string,
  }
}

export type ProjectsQueryResponse = {
  allFile: {
    edges: ImageNode[]
  }
  allContentJson: {
    edges: [ ProjectEmptyNode, ProjectNode ]
  }
}