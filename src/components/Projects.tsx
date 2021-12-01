import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Project } from './Project/Project'
import { ProjectsQueryResponse } from '../types/projects.types'

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

  console.log(data);

  const projectsImages = data.allFile.edges.map(
    (element) => element.node.childImageSharp.fluid.srcSet
  )
  return (
    <section ref={ref} id="projects" className="section projects">
      <div className="container">
        <h2 className="section__heading">Projects</h2>
        <p className="section__description">
          This is what I have worked on so far.
        </p>
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
      </div>
    </section>
  )
})
