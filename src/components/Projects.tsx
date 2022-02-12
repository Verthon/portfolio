import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Project } from './Project/Project'
import { Container } from './Container/Container'
import type { ProjectsQueryResponse } from '../types/projects.types'
import { Section } from './Section/Section'

export const Projects = React.forwardRef((_props, ref: React.ForwardedRef<HTMLElement>) => {
  const data = useStaticQuery<ProjectsQueryResponse>(graphql`
    query getProjectsData {
      contentJson {
        projects {
          animation
          description
          github
          live
          name
          technologies
        }
      }
      allFile(filter: {relativeDirectory: {eq: "projects"}}, sort: {fields: base}) {
        edges {
          node {
            base
            childImageSharp {
              fluid {
                srcSet
              }
            }
          }
        }
      }
    }
  `)

  const projectsImages = data.allFile.edges.map(
    (element) => element.node.childImageSharp.fluid.srcSet
  )
  return (
    <Section ref={ref} id="projects" header="Projects" description="This is what I have worked on so far." type="projects">
      <Container>
        {data.contentJson.projects.map((project, index) => (
          <Project
            key={project.name}
            name={project.name}
            image={projectsImages[index]}
            description={project.description}
            technologies={project.technologies}
            github={project.github}
            live={project.live}
            animation={project.animation}
          />
        ))}
      </Container>
    </Section>
  )
})
