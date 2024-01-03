/** @jsxImportSource react */
import * as React from 'react'

import { Button } from '../Button/Button'
import { GithubIcon } from '../../icons/GithubIcon'
import { LinkedinIcon } from '../../icons/LinkedinIcon'
import { SendIcon } from '../../icons/SendIcon'
import { Section } from '../Section/Section'

import {
  contactContainer,
  contactFormWrapper,
  contactSocials,
  description,
} from './Contact.module.css'
import { Form } from './Form/Form'

export const Contact = React.forwardRef(
  (_props, ref: React.ForwardedRef<HTMLElement>) => {
    const site = {
      siteMetadata: {
        email: 'christopher.sordyl@gmail.com',
        linkedin: 'https://www.linkedin.com/in/krzysztof-sordyl/',
        github: 'https://github.com/Verthon',
      },
    }

    return (
      <Section ref={ref} id="contact" header="Contact" type="contact">
        <div className={contactContainer}>
          <div className={contactFormWrapper}>
            <p className={description}>
              Have a question or want to say hi? Feel free to contact me with
              your webmail client or with form below.
            </p>
            <div className={contactSocials}>
              <a
                href={site.siteMetadata.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Link to Verthon GitHub profile"
              >
                <GithubIcon ariaHidden={true} />
              </a>
              <a
                href={site.siteMetadata.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Krzysztof Sordyl linkedin profile"
              >
                <LinkedinIcon ariaHidden={true} />
              </a>
              <Button
                variant="primary"
                href={`mailto:${site.siteMetadata.email}`}
                ariaLabel="Link to email christopher.sordyl@gmail.com"
              >
                Quick mail
                <SendIcon
                  width={20}
                  height={20}
                  color="black"
                  aria-label="Send an email using your email client"
                />
              </Button>
            </div>
            <Form />
          </div>
        </div>
      </Section>
    )
  }
)
