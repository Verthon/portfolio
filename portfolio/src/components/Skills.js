import PropTypes from 'prop-types'
import React from 'react'

const Skills = () => (
  <section id='skills' class='section skills'>
    <h1 class='section-heading'>Skills</h1>
    <blockquote class='section-quote'>
      "Try to learn something about everything and everything about something."
      <footer class='section-quote-author'>Thomas Huxley</footer>
    </blockquote>
    <div class='row'>
      <ul class='tab-header'>
        <li
          class='tab-header-item active-header'
          data-tab='frontend'
          data-aos='fade-down'
        >
          <h2 class='tab-header-title'>Frontend</h2>
          <p class='tab-header-content'>
            Building responsive websites and web apps based on design projects.
            SEO optimalization. Creating React based frontend.
          </p>
        </li>
        <li class='tab-header-item' data-tab='backend' data-aos='fade-down'>
          <h2 class='tab-header-title'>Backend</h2>
          <p class='tab-header-content'>
            Hands on experience server side programming. Basic understanding of
            Node.js and relational databases.
          </p>
        </li>
        <li class='tab-header-item' data-tab='tools' data-aos='fade-down'>
          <h2 class='tab-header-title'>Other tools</h2>
          <p class='tab-header-content'>Rest of tools used in my projects. </p>
        </li>
      </ul>
      <article id='frontend' class='tab-content'>
        <div class='tab-content-item active' data-aos='fade-up'>
          <div class='tab-column'>
            <h3 class='tab-content-heading'>HTML & CSS</h3>
            <ul class='tab-list'>
              <li class='tab-item'>HTML5, CSS3, Sass</li>
              <li class='tab-item'>Bootstrap 3 & 4</li>
              <li class='tab-item'>Methodology: BEM</li>
              <li class='tab-item'>Responsive Web Design</li>
            </ul>
          </div>
          <div class='tab-column'>
            <h3 class='tab-content-heading'>JavaScript</h3>
            <ul class='tab-list'>
              <li class='tab-item'>
                Solid knowledge of JavaScript ES6, React.js
              </li>
              <li class='tab-item'>Currently learning about Redux</li>
              <li class='tab-item'>
                Basic understanding of OOP and functional programming
              </li>
              <li class='tab-item'>Basics of unit testing with Jest</li>
              <li class='tab-item'>Experience with AJAX and API integration</li>
            </ul>
          </div>
          <div class='tab-column'>
            <h3 class='tab-content-heading'>Tools and CMS</h3>
            <ul class='tab-list'>
              <li class='tab-item'>Experience with Wordpress CMS</li>
              <li class='tab-item'>Hands on experience with Gatsby</li>
              <li class='tab-item'>Gulp.js, npm, webpack, eslint</li>
              <li class='tab-item'>Familiar with GIT version control system</li>
            </ul>
          </div>
        </div>
        <div id='backend' class='tab-content-item' data-aos='fade-up'>
          <div class='tab-column'>
            <h3 class='tab-content-heading'>Backend languages</h3>
            <ul class='tab-list'>
              <li class='tab-item'>
                Hands on experience server side programming
              </li>
              <li class='tab-item'>Basics of Node.js and Express.js</li>
              <li class='tab-item'>Knowledge about HTTP and REST</li>
              <li class='tab-item'>Basic understanding about MVC pattern</li>
            </ul>
          </div>
          <div id='backend-tab' class='tab-column'>
            <h3 class='tab-content-heading'>Databases</h3>
            <ul class='tab-list'>
              <li class='tab-item'>Basics of relational databases</li>
              <li class='tab-item'>Basics of SQL relational databases</li>
              <li class='tab-item'>Basics of Firebase and MongoDB</li>
              <li class='tab-item'>Currently learning more about SQL</li>
            </ul>
          </div>
          <div id='backend-tab' class='tab-column'>
            <h3 class='tab-content-heading'>Tools</h3>
            <ul class='tab-list'>
              <li class='tab-item'>Postman</li>
              <li class='tab-item'>PHPMyAdmin</li>
              <li class='tab-item'>Babel</li>
              <li class='tab-item'>Socket.io</li>
            </ul>
          </div>
        </div>
        <div id='other' class='tab-content-item' data-aos='fade-up'>
          <div class='tab-column'>
            <h3 class='tab-content-heading'>Systems</h3>
            <ul class='tab-list'>
              <li class='tab-item'>Familiar with Windows and Linux</li>
              <li class='tab-item'>Basics of Linux and Windows terminals</li>
            </ul>
          </div>
          <div class='tab-column'>
            <h3 class='tab-content-heading'>Services</h3>
            <ul class='tab-list'>
              <li class='tab-item'>JS Bin</li>
              <li class='tab-item'>Codepen</li>
              <li class='tab-item'>Github</li>
              <li class='tab-item'>Netlify</li>
            </ul>
          </div>
          <div class='tab-column'>
            <h3 class='tab-content-heading'>Programs</h3>
            <ul class='tab-list'>
              <li class='tab-item'>AdobeXD basics</li>
              <li class='tab-item'>Sublime</li>
              <li class='tab-item'>VSCode</li>
              <li class='tab-item'>Trello</li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  </section>
)

Skills.propTypes = {
  siteTitle: PropTypes.string
}

Skills.defaultProps = {
  siteTitle: ''
}

export default Skills
