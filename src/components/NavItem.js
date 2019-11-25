import React from 'react'
import PropTypes from 'prop-types'

const NavItem = ({ id, name, handleClick }) => {
  return (
    <li className='menu-item' onClick={() => handleClick(name)}>
      {name}
    </li>
  )
}

NavItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
}

export default NavItem
