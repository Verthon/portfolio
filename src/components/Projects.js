import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faCodepen } from '@fortawesome/free-brands-svg-icons'
import { useStaticQuery, graphql } from 'gatsby'
import Project from './Project'
import JSONData from '../content/data.json'

const Projects = React.forwardRef((props, ref) => {
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
    element => element.node.childImageSharp.fluid.srcSet
  )
  return (
    <section ref={ref} id="projects" className="section projects">
      <div className="container">
        <h2 className="section__heading section__heading--projects">
          Projects
        </h2>
        <p className="section__description">
          This is what I have worked on so far
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
        <div className="project-sources">
          <h2 className="project-title">Rest of my projects</h2>
          <p className="project-sources__description">
            Other projects are hosted on my Github account and Codepen.
          </p>
          <a
            data-aos="flip-up"
            href="https://github.com/Verthon"
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn project-btn--sources"
            aria-label="Link to Verthon GitHub profile"
          >
            GitHub{' '}
            <FontAwesomeIcon icon={faGithub} size="lg" aria-hidden="true" />
          </a>
          <a
            data-aos="flip-up"
            href="https://codepen.io/Verthon"
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn project-btn--sources"
            aria-label="Link to codepen account"
          >
            Codepen{' '}
            <FontAwesomeIcon icon={faCodepen} size="lg" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
})

Projects.propTypes = {
  projects: PropTypes.array,
}

export default Projects
