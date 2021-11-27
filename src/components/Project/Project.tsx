import React from 'react'

import { GithubIcon } from '../../icons/GithubIcon'
import { ExternalLinkIcon } from '../../icons/ExternalLinkIcon'
import { Props } from './Project.types'

const Project = ({
  name,
  image,
  description,
  technologies,
  github,
  live,
  animation,
}: Props) => {
  return (
    <div className="project" data-aos={animation} data-aos-duration="1000">
      <img
        className="project__image"
        srcSet={image}
        alt="Event app screenshot"
      />
      <article className="project__content">
        <h3 className="project__title">{name}</h3>
        <div className="project__tags">
          {technologies.map((technology) => (
            <span key={technology} className="project__tag">
              {technology}
            </span>
          ))}
        </div>
        <p className="project__description">{description}</p>
        <footer className="project__footer">
          <a
            className="project__btn"
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Link to Verthon GitHub profile"
          >
            Source <GithubIcon width={22} height={22} aria-hidden="true" />
          </a>
          <a
            className="project__btn project__btn--link"
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Link to live version"
          >
            <span>view app</span> <ExternalLinkIcon width={20} height={20} />
          </a>
        </footer>
      </article>
    </div>
  )
}

export default Project
