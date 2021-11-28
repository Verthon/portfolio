import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Project } from './Project/Project'
import JSONData from '../content/data.json'

export const Projects = React.forwardRef((_props, ref) => {
  const data = useStaticQuery(graphql`
    query getAllImages {
      allFile(
        filter: { relativeDirectory: { eq: "projects" } }
        sort: { fields: base }
      ) {
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
    <section ref={ref} id="projects" className="section projects">
      <div className="container">
        <h2 className="section__heading">Projects</h2>
        <p className="section__description">
          This is what I have worked on so far.
        </p>
        {JSONData.projects.map((project, index) => (
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
