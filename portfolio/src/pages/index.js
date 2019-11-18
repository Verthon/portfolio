import React from 'react'

import Layout from '../components/layout'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Seo from '../components/Seo'

const IndexPage = () => (
  <Layout>
    <Seo
      title='Krzysztof Sordyl Frontend Developer'
      description='Welcome, my name is Krzysztof Sordyl frontend developer living in Bielsko-Biała, Poland. I"m creating solid, modern and well-designed websites. React enthusiast. Software, programming Bielsko-Biała'
    />
    <section id='about' class='section about'>
      <p class='about-description'>
        I am a web developer living in Bielsko-Biała, Poland. I build websites,
        particularly, I specialize in frontend development HTML5, SCSS, modern
        JavaScript. Currently learning more about React, Redux and Node.js. I'm
        looking for first job in IT or intern.
      </p>
    </section>
    <Skills />
    <Projects />
    <Contact email='christopher.sordyl@gmail.com' />
    <Footer />
  </Layout>
)

export default IndexPage
