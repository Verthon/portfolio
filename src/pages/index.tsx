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
import { ScrollProvider } from '../providers/scroll/ScrollProvider'

const IndexPage = () => {

  React.useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    })
  }, [])

  return (
    <React.StrictMode>
      <ScrollProvider>
        <Layout>
          <Seo />
          <Skills ref={skillsSection} />
          <Projects ref={projectsSection} />
          <Contact ref={contactSection} />
          <Footer />
        </Layout>
      </ScrollProvider>

    </React.StrictMode>
  )
}

export default IndexPage
