import * as React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import '../scss/style.scss'
import { Contact } from '../components/Contact/Contact'
import { Layout } from '../components/Layout/Layout'
import { Projects } from '../components/Projects'
import { Skills } from '../components/Skills/Skills'
import { Seo } from '../components/Seo'
import { Footer } from '../components/Footer'

export const IndexPage = () => {
  const skillsSection = React.useRef<HTMLElement>(null)
  const projectsSection = React.useRef<HTMLElement>(null)
  const contactSection = React.useRef<HTMLElement>(null)

  const scrollToComponent = (component: string) => {
    switch (component) {
      case 'skills':
        skillsSection.current.scrollIntoView({
          alignToTop: true,
          behavior: 'smooth',
        })
        break
      case 'projects':
        projectsSection.current.scrollIntoView({
          alignToTop: true,
          behavior: 'smooth',
        })
        break
      case 'contact':
        contactSection.current.scrollIntoView({
          alignToTop: true,
          behavior: 'smooth',
        })
        break
      default:
        skillsSection.current.scrollIntoView({
          alignToTop: true,
          behavior: 'smooth',
        })
        break
    }
  }

  React.useEffect(() => {
    AOS.init({
      duration: 500,
    })
  }, [])

  return (
    <Layout scrollFunction={scrollToComponent}>
      <Seo />
      <Skills ref={skillsSection} />
      <Projects ref={projectsSection} />
      <Contact ref={contactSection} />
      <Footer />
    </Layout>
  )
}
