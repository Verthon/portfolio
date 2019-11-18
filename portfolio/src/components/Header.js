import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Nav from './Nav'

const Header = () => (
  <div className='header-wrapper'>
    <Nav />
    <header class='site-header container'>
      <h1 class='hero-heading' data-aos='zoom-in'>
        Welcome!
      </h1>
      <h2 class='hero-subheading' data-aos='zoom-in'>
        I'm <strong class='hero__highlight'>Krzysztof Sordyl</strong>
      </h2>
      <p class='hero-description' data-aos='zoom-in'>
        Frontend Developer
      </p>
      <button
        id='btn-projects'
        class='btn-my-work'
        data-aos-delay='500'
        data-aos='flip-up'
      >
        My projects
      </button>
    </header>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ''
}

export default Header
