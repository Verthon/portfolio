import PropTypes from 'prop-types'
import React from 'react'
import Nav from './Nav'

const Header = ({ scroll }) => (
  <div className='header-wrapper'>
    <Nav links={['skills', 'projects', 'contact']} />
    <header className='site-header container'>
      <h1 className='hero-heading' data-aos='zoom-in'>
        Welcome!
      </h1>
      <h2 className='hero-subheading' data-aos='zoom-in'>
        I'm <strong className='hero__highlight'>Krzysztof Sordyl</strong>
      </h2>
      <p className='hero-description' data-aos='zoom-in'>
        Frontend Developer
      </p>
      <button
        id='btn-projects'
        className='btn-my-work'
        data-aos-delay='750'
        data-aos='flip-up'
        onClick={scroll}
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
