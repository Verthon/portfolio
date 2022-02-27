import * as React from "react"

import { Contact } from '../../components/Contact/Contact'
import { Layout } from '../../components/Layout/Layout'
import { Projects } from '../../components/Projects'
import { Skills } from '../../components/Skills/Skills'
import { Seo } from '../../components/Seo'
import { Footer } from '../../components/Footer/Footer'
import { useScrollState } from '../../hooks/useScrollState'

export const HomePageContent = () => {
  const { skillsSection, projectsSection, contactSection } = useScrollState()
  return (
    <Layout>
      <Seo />
      <Skills ref={skillsSection} />
      <Projects ref={projectsSection} />
      <Contact ref={contactSection} />
      <Footer />
    </Layout>
  )
}