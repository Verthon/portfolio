/** @jsxImportSource react */
import * as React from 'react'

import { navItem } from './NavItem.module.css'
import type { Props } from './NavItem.types'

export const NavItem = ({ onClick, children }: Props) => {
  return (
    <li className={navItem} onClick={onClick}>
      {children}
    </li>
  )
}
