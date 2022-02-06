import * as React from 'react'

import { navItem } from "./NavItem.module.css"
import { Props } from './NavItem.types'

export const NavItem = ({ name, handleClick, children }: Props) => {
  if (name && handleClick) {
    <li className={navItem} onClick={() => handleClick && handleClick(name)}>
      {children}
    </li>
  }

  return (
    <li className={navItem}>
      {children}
    </li>
  )
}
