/** @jsxImportSource react */
import * as React from 'react'

import { GithubIcon } from '../../icons/GithubIcon'
import { ExternalLinkIcon } from '../../icons/ExternalLinkIcon'
import { Button } from '../Button/Button'

import {
  project,
  image as imageStyle,
  content,
  title,
  description as descriptionStyles,
  tag,
  footer,
  link,
} from './Project.module.css'
import type { Props } from './Project.types'

export const Project = ({
  name,
  image,
  description,
  technologies,
  github,
  live,
  animation,
}: Props) => {
  return (
    <div className={project} data-aos={animation} data-aos-duration="1000">
      <img className={imageStyle} srcSet={image} alt="Event app screenshot" />
      <article className={content}>
        <h3 className={title}>{name}</h3>
        <div>
          {technologies.map((technology) => (
            <span key={technology} className={tag}>
              {technology}
            </span>
          ))}
        </div>
        <p className={descriptionStyles}>{description}</p>
        <footer className={footer}>
          <Button
            variant="secondary"
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="Link to Verthon GitHub profile"
          >
            Source <GithubIcon width={22} height={22} aria-hidden="true" />
          </Button>
          <Button
            variant="primary"
            className={link}
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="Link to live version"
          >
            <span>view app</span> <ExternalLinkIcon width={20} height={20} />
          </Button>
        </footer>
      </article>
    </div>
  )
}
