import React from 'react'
import PropTypes from 'prop-types'

const NavItem = ({ id, name }) => {
  return (
    <li id={id} className='menu-item'>
      {name}
    </li>
  )
}

NavItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
}

export default NavItem
