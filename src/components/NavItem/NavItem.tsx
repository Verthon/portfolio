import * as React from 'react'

import { Props } from './NavItem.types'

export const NavItem = ({ name, handleClick }: Props) => {
  return (
    <li className="menu-item" onClick={() => handleClick(name)}>
      {name}
    </li>
  )
}
