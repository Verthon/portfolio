import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Layout from '../components/layout'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Seo from '../components/Seo'
import '../scss/style.scss'

const IndexPage = () => {
  const skillsSection = React.useRef()
  const projectsSection = React.useRef()
  const contactSection = React.useRef()
  const projects = [
    {
      name: 'Alkinoos Taverna',
      technologies: ['React', 'Sass', 'Firestore'],
      description:
        'Fully responsive, serverless, progressive web app for small restaurants, with integrated simple booking system and basic administration tools for staff.',
      github: 'https://github.com/Verthon/restaurant-app',
      live: 'https://alkinoos-taverna.netlify.com/',
      animation: 'slide-right',
    },
    {
      name: 'Eventoo',
      technologies: ['React', 'Styled components', 'Firestore'],
      description:
        'Responsive App based on React.js library for event management. Within Eventoo you can create your own events.',
      github: 'https://github.com/Verthon/event-app',
      live: 'https://eventooo.netlify.com/',
      animation: 'slide-left',
    },
    {
      name: 'HeyU website',
      technologies: ['Gatsby', 'Sass', 'Netlify'],
      description:
        'Responsive, mobile first website based on Gatsby.js. PSD to HTML',
      github: 'https://github.com/Verthon/HeyU-Website',
      live: 'https://heyu-website.netlify.com/',
      animation: 'slide-right',
    },
  ]

  const scrollToComponent = (component) => {
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
      <Seo
        title="Krzysztof Sordyl Frontend Developer"
        description='Welcome, my name is Krzysztof Sordyl frontend developer living in Bielsko-Biała, Poland. I"m creating solid, modern and well-designed websites. React enthusiast. Software, programming Bielsko-Biała'
      />
      <Skills ref={skillsSection} />
      <Projects ref={projectsSection} projects={projects} />
      <Contact ref={contactSection} email="christopher.sordyl@gmail.com" />
      <Footer />
    </Layout>
  )
}

export default IndexPage
