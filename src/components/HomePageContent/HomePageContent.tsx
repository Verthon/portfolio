/** @jsxImportSource react */
import * as React from 'react'
import { qwikify$ } from '@builder.io/qwik-react'

import { Contact } from '../../components/Contact/Contact'
import { Skills } from '../../components/Skills/Skills'
import { Footer } from '../../components/Footer/Footer'

export const HomePageContentComponent = () => {
  const skillsSection = React.useRef<HTMLElement>(null)
  const contactSection = React.useRef<HTMLElement>(null)
  return (
    <>
      <Skills ref={skillsSection} />
      <Contact ref={contactSection} />
      <Footer />
    </>
  )
}

export const HomePageContent = qwikify$(HomePageContentComponent, {
  eagerness: 'visible',
})
