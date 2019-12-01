import PropTypes from 'prop-types'
import React from 'react'
import Nav from './Nav'

const Header = ({ scroll }) => (
  <div className='header-wrapper'>
    <div className="container">
      <Nav links={['skills', 'projects', 'contact']} scroll={scroll} />
    </div>
    <div className="container container--header">
      <header className='site-header'>
        <h2 className='hero-heading' data-aos='zoom-in'>
          Welcome!
        </h2>
        <h1 className='hero-subheading' data-aos='zoom-in'>
          I'm <strong className='hero__highlight'>Krzysztof Sordyl</strong>
        </h1>
        <p className='hero-description' data-aos='zoom-in'>
          Frontend Developer
        </p>
        <button
          id='btn-projects'
          className='btn-my-work'
          data-aos-delay='750'
          data-aos='flip-up'
          onClick={() => scroll('projects')}
        >
          My projects
        </button>
      </header>
    </div>
  </div>
)

Header.propTypes = {
  scroll: PropTypes.func
}

export default Header
