import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faCodepen } from '@fortawesome/free-brands-svg-icons'
import Project from './Project'

const Projects = React.forwardRef(({ projects }, ref) => {
  return (
    <section ref={ref} id='projects' className='section projects'>
      <h1 className='section-heading section-heading--projects'>Projects</h1>
      <p className='section-description'>
        This is what I have worked on so far
      </p>
      {projects.map(project => (
        <Project
          key={project.name}
          name={project.name}
          images={project.images}
          description={project.description}
          technologies={project.technologies}
          github={project.github}
          live={project.live}
          animation={project.animation}
        />
      ))}
      <div className='project-sources'>
        <h2 className='project-title'>Rest of my projects</h2>
        <p className='project-sources__description'>
          Other projects are hosted on Github and Codepen
        </p>
        <a
          data-aos='flip-up'
          href='https://github.com/Verthon'
          target='_blank'
          rel='noopener noreferrer'
        >
          <button
            id='github-btn'
            className='project-btn project-btn--sources'
            aria-label='Link to Verthon GitHub profile'
          >
            GitHub{' '}
            <FontAwesomeIcon icon={faGithub} size='lg' aria-hidden='true' />
          </button>
        </a>
        <a
          data-aos='flip-up'
          href='https://codepen.io/Verthon'
          target='_blank'
          rel='noopener noreferrer'
        >
          <button
            id='codepen-btn'
            className='project-btn project-btn--sources'
            aria-label='Link to codepen account'
          >
            Codepen{' '}
            <FontAwesomeIcon icon={faCodepen} size='lg' aria-hidden='true' />
          </button>
        </a>
      </div>
    </section>
  )
})

Projects.propTypes = {
  projects: PropTypes.array
}

export default Projects
