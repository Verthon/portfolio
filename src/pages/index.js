import React, { Component } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

import Layout from "../components/layout"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import Seo from "../components/Seo"
import "../scss/style.scss"

class IndexPage extends Component {
  constructor() {
    super()
    this.skillsSection = React.createRef()
    this.projectsSection = React.createRef()
    this.contactSection = React.createRef()
    this.projects = [
      {
        name: "Alkinoos Taverna",
        technologies: ["React", "Sass", "Firestore"],
        description:
          "Fully responsive, serverless, progressive web app for small restaurants, with integrated simple booking system and basic administration tools for staff.",
        github: "https://github.com/Verthon/restaurant-app",
        live: "https://alkinoos-taverna.netlify.com/",
        animation: "slide-right",
      },
      {
        name: "Eventoo",
        technologies: ["React", "Styled components", "Firestore"],
        description:
          "Responsive App based on React.js library for event management. Within Eventoo you can create your own events.",
        github: "https://github.com/Verthon/event-app",
        live: "https://eventooo.netlify.com/",
        animation: "slide-left",
      },
      {
        name: "HeyU website",
        technologies: ["Gatsby", "Sass", "Netlify"],
        description:
          "Responsive, mobile first website based on Gatsby.js. PSD to HTML",
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
