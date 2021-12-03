import * as React from 'react'

import type { Props } from "./TabHeader.types"

export const TabHeader = ({ tabProps, active, handleClick }: Props) => {
  const cssClass = active ? "tab-header__item tab-header--active" : "tab-header__item" 
  return (
    <li className={cssClass} data-tab={tabProps.name.toLowerCase()} onClick={handleClick}>
      <h3 className="tab-header__title">{tabProps.name}</h3>
      <p className="tab-header__content">{tabProps.description}</p>
    </li>
  )
}
