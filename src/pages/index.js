import React, { Component } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

import Layout from "../components/layout"
import About from "../components/About"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import Seo from "../components/Seo"
import eventAppSm from "../images/event-app-sm.png"
import eventAppMd from "../images/event-app-md.png"
import eventApp from "../images/event-app.png"
import alkinoosMd from "../images/resto-md.jpg"
import alkinoosSm from "../images/resto-sm.jpg"
import alkinoos from "../images/resto.jpeg"
import heyU from "../images/HeyU.png"
import heyUMd from "../images/HeyU-md.png"
import heyUSm from "../images/HeyU-sm.png"

class IndexPage extends Component {
  constructor() {
    super()
    this.skillsSection = React.createRef()
    this.projectsSection = React.createRef()
    this.contactSection = React.createRef()
    this.projects = [
      {
        name: "Alkinoos Taverna",
        images: [alkinoos, alkinoosMd, alkinoosSm],
        technologies: ["React", "Sass", "Firestore"],
        description:
          "Fully responsive, serverless, progressive web app for small restaurants, with integrated simple booking system and basic administration tools for staff.",
        github: "https://github.com/Verthon/restaurant-app",
        live: "https://alkinoos-taverna.netlify.com/",
        animation: "slide-right",
      },
      {
        name: "Eventoo",
        images: [eventApp, eventAppMd, eventAppSm],
        technologies: ["React", "Styled components", "Firestore"],
        description:
          "Responsive App based on React.js library for event management. Within Eventoo you can create your own events.",
        github: "https://github.com/Verthon/event-app",
        live: "https://eventooo.netlify.com/",
        animation: "slide-left",
      },
      {
        name: "HeyU website",
        images: [heyU, heyUMd, heyUSm],
        technologies: ["Gatsby", "Sass", "Netlify"],
        description:
          "Responsive, mobile first webiste based on Gatsby.js. PSD to HTML",
        github: "https://github.com/Verthon/HeyU-Website",
        live: "https://heyu-website.netlify.com/",
        animation: "slide-right",
      },
    ]
  }

  componentDidMount() {
    AOS.init({
      duration: 2000,
    })
  }

  scrollToComponent = component => {
    switch (component) {
      case "skills":
        this.skillsSection.current.scrollIntoView({
          alignToTop: true,
          behavior: "smooth",
        })
        break
      case "projects":
        this.projectsSection.current.scrollIntoView({
          alignToTop: true,
          behavior: "smooth",
        })
        break
      case "contact":
        this.contactSection.current.scrollIntoView({
          alignToTop: true,
          behavior: "smooth",
        })
        break
      default:
        this.skillsSection.current.scrollIntoView({
          alignToTop: true,
          behavior: "smooth",
        })
        break
    }
  }

  render() {
    return (
      <Layout scrollFunction={this.scrollToComponent}>
        <Seo
          title="Krzysztof Sordyl Frontend Developer"
          description='Welcome, my name is Krzysztof Sordyl frontend developer living in Bielsko-Biała, Poland. I"m creating solid, modern and well-designed websites. React enthusiast. Software, programming Bielsko-Biała'
        />
        <About />
        <Skills ref={this.skillsSection} />
        <Projects ref={this.projectsSection} projects={this.projects} />
        <Contact
          ref={this.contactSection}
          email="christopher.sordyl@gmail.com"
        />
        <Footer />
      </Layout>
    )
  }
}

export default IndexPage
