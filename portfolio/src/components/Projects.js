import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faCodepen } from "@fortawesome/free-brands-svg-icons"
import eventAppSm from "../images/event-app-sm.png"
import eventAppMd from "../images/event-app-md.png"
import eventApp from "../images/event-app.png"
import alkinoosMd from "../images/resto-md.jpg"
import alkinoosSm from "../images/resto-sm.jpg"
import alkinoos from "../images/resto.jpeg"
import heyU from "../images/HeyU.png"
import heyUMd from "../images/HeyU-md.png"
import heyUSm from "../images/HeyU-sm.png"
import sugoo from "../images/sugoo.jpeg"

const Projects = () => (
  <section id="projects" class="section projects">
    <h1 class="section-heading section-heading--projects">Projects</h1>
    <p class="section-description">This is what I have worked on so far</p>

    <div class="project-container" data-aos="slide-right">
      <img
        class="project-image"
        srcset={`${alkinoos} 1024w, ${alkinoosMd} 768w, ${alkinoosSm} 300w`}
        alt="Resto website screenshot"
      />
      <article class="project">
        <h2 class="project-title">Alkinoos Taverna</h2>
        <p class="project-description">
          Fully responsive, serverless, progressive web app for small
          restaurants, with integrated simple booking system and basic
          administration tools for staff.
        </p>
        <button class="project-btn">React.js</button>
        <button class="project-btn">Sass</button>
        <button class="project-btn">Firestore</button>
        <footer class="project__footer">
          <Link
            to="https://github.com/Verthon/restaurant-app"
            target="_blank"
            rel="noopener"
          >
            <button
              id="github-btn"
              class="project-btn project-btn--source"
              aria-label="Link to Verthon GitHub profile"
            >
              Source{" "}
              <FontAwesomeIcon icon={faGithub} size="lg" aria-hidden="true" />
            </button>
          </Link>
          <Link
            to="https://alkinoos-taverna.netlify.com/"
            target="_blank"
            rel="noopener"
          >
            <button class="project-btn project-btn--link">
              view app <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" />
            </button>
          </Link>
        </footer>
      </article>
    </div>

    <div class="project-container" data-aos="slide-left">
      <img
        class="project-image"
        srcset={`${eventApp} 1024w, ${eventAppMd} 768w, ${eventAppSm} 300w`}
        alt="Event app screenshot"
      />
      <article class="project">
        <h2 class="project-title">Eventoo</h2>
        <p class="project-description">
          Responsive App based on React.js library for event management. Within
          Eventoo you can create your own events.
        </p>
        <button class="project-btn">React.js</button>
        <button class="project-btn">Firestore</button>
        <button class="project-btn">styled components</button>
        <footer class="project__footer">
          <Link
            to="https://github.com/Verthon/event-app"
            target="_blank"
            rel="noopener"
          >
            <button
              id="github-btn"
              class="project-btn project-btn--source"
              aria-label="Link to Verthon GitHub profile"
            >
              Source{" "}
              <FontAwesomeIcon icon={faGithub} size="lg" aria-hidden="true" />
            </button>
          </Link>
          <Link
            to="https://eventooo.netlify.com/"
            target="_blank"
            rel="noopener"
          >
            <button
              class="project-btn project-btn--link"
              aria-label="Link to live version"
            >
              view app <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" />
            </button>
          </Link>
        </footer>
      </article>
    </div>

    <div class="project-container" data-aos="slide-right">
      <img
        class="project-image"
        srcset={`${heyU} 1024w, ${heyUMd} 768w, ${heyUSm} 300w`}
        alt="HeyU website screenshot"
      />
      <article class="project">
        <h2 class="project-title">HeyU website</h2>
        <p class="project-description">
          Responsive, mobile first webiste based on Gatsby.js. PSD to HTML
        </p>
        <button class="project-btn">Gatsby.js</button>
        <button class="project-btn">Netlify</button>
        <button class="project-btn">Sass</button>
        <footer class="project__footer">
          <Link
            to="https://github.com/Verthon/HeyU-Website"
            target="_blank"
            rel="noopener"
          >
            <button
              id="github-btn"
              class="project-btn project-btn--source"
              aria-label="Link to Verthon GitHub profile"
            >
              Source{" "}
              <FontAwesomeIcon icon={faGithub} size="lg" aria-hidden="true" />
            </button>
          </Link>
          <Link
            to="https://heyu-website.netlify.com/"
            target="_blank"
            rel="noopener"
          >
            <button
              class="project-btn project-btn--link"
              aria-label="Link to live version"
            >
              view site <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" />
            </button>
          </Link>
        </footer>
      </article>
    </div>

    <div class="project-sources">
      <h2 class="project-title">Rest of my projects</h2>
      <p class="project-sources__description">
        Other projects are hosted on Github and Codepen
      </p>
      <Link
        data-aos="flip-up"
        to="https://github.com/Verthon"
        target="_blank"
        rel="noopener"
      >
        <button
          id="github-btn"
          class="project-btn project-btn--sources"
          aria-label="Link to Verthon GitHub profile"
        >
          GitHub{" "}
          <FontAwesomeIcon icon={faGithub} size="lg" aria-hidden="true" />
        </button>
      </Link>
      <Link
        data-aos="flip-up"
        to="https://codepen.io/Verthon"
        target="_blank"
        rel="noopener"
      >
        <button
          id="codepen-btn"
          class="project-btn project-btn--sources"
          aria-label="Link to codepen account"
        >
          Codepen{" "}
          <FontAwesomeIcon icon={faCodepen} size="lg" aria-hidden="true" />
        </button>
      </Link>
    </div>
  </section>
)

Projects.propTypes = {
  siteTitle: PropTypes.string,
}

Projects.defaultProps = {
  siteTitle: "",
}

export default Projects
