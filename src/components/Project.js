import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Project = ({
  name,
  image,
  description,
  technologies,
  github,
  live,
  animation
}) => {

  return (
    <div className='project-container' data-aos={animation} data-aos-duration="1000">
      <img
        className='project-image'
        srcSet={image}
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
          <a
            className='project-btn project-btn--source'
            href={github}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Link to Verthon GitHub profile'
          >
            Source{' '}
            <FontAwesomeIcon icon={faGithub} aria-hidden='true' />
          </a>
          <a
            className='project-btn project-btn--link'
            href={live}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Link to live version'
          >
            view app <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </footer>
      </article>
    </div>
  )
}

Project.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  technologies: PropTypes.array,
  github: PropTypes.string,
  live: PropTypes.string,
  animation: PropTypes.string
}

export default Project

