import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Project = ({
  name,
  images,
  description,
  technologies,
  github,
  live,
  animation
}) => {
  return (
    <div className='project-container' data-aos={animation}>
      <img
        className='project-image'
        srcSet={`${images[0]} 1024w, ${images[1]} 768w, ${images[2]} 300w`}
        alt='Event app screenshot'
      />
      <article className='project'>
        <h2 className='project-title'>{name}</h2>
        <p className='project-description'>{description}</p>
        {technologies.map(technology => (
          <button key={technology} className='project-btn'>
            {technology}
          </button>
        ))}
        <footer className='project__footer'>
          <a href={github} target='_blank' rel='noopener noreferrer'>
            <button
              id='github-btn'
              className='project-btn project-btn--source'
              aria-label='Link to Verthon GitHub profile'
            >
              Source{' '}
              <FontAwesomeIcon icon={faGithub} size='lg' aria-hidden='true' />
            </button>
          </a>
          <a href={live} target='_blank' rel='noopener noreferrer'>
            <button
              className='project-btn project-btn--link'
              aria-label='Link to live version'
            >
              view app <FontAwesomeIcon icon={faExternalLinkAlt} size='lg' />
            </button>
          </a>
        </footer>
      </article>
    </div>
  )
}

Project.propTypes = {
  name: PropTypes.string,
  images: PropTypes.array,
  description: PropTypes.string,
  technologies: PropTypes.array,
  github: PropTypes.string,
  live: PropTypes.string,
  animation: PropTypes.string
}

export default Project
