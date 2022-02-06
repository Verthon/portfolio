import * as React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { Contact } from '../components/Contact/Contact'
import { Layout } from '../components/Layout/Layout'
import { Projects } from '../components/Projects'
import { Skills } from '../components/Skills/Skills'
import { Seo } from '../components/Seo'
import { Footer } from '../components/Footer/Footer'
import '../styles/style.css'
import "../styles/variables.css"

const IndexPage = () => {
  const skillsSection = React.useRef<HTMLElement>(null)
  const projectsSection = React.useRef<HTMLElement>(null)
  const contactSection = React.useRef<HTMLElement>(null)

  const scrollToComponent = (component: string) => {
    console.log(component, skillsSection.current)
    if (skillsSection.current && projectsSection.current && contactSection.current) {
      switch (component) {
        case 'skills':
          skillsSection.current.scrollIntoView({
            inline: 'nearest',
            block: 'start',
            behavior: 'smooth',
          })
          break
        case 'projects':
          projectsSection.current.scrollIntoView({
            inline: 'nearest',
            block: 'start',
            behavior: 'smooth',
          })
          break
        case 'contact':
          contactSection.current.scrollIntoView({
            inline: 'nearest',
            block: 'start',
            behavior: 'smooth',
          })
          break
        default:
          skillsSection.current.scrollIntoView({
            inline: 'nearest',
            block: 'start',
            behavior: 'smooth',
          })
          break
      }
    }
  }

  React.useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    })
  }, [])

  return (
    <React.StrictMode>
      <Layout scrollToComponent={scrollToComponent}>
        <Seo />
        <Skills ref={skillsSection} />
        <Projects ref={projectsSection} />
        <Contact ref={contactSection} />
        <Footer />
      </Layout>
    </React.StrictMode>

  )
}

export default IndexPage
