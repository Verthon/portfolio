import * as React from 'react'

import type { Props } from "./TabHeader.types"

export const TabHeader = ({ tabProps, activeHeader, handleClick }: Props) => {
  const cssClass = `tab-header__item ${activeHeader}`
  return (
    <li className={cssClass} data-tab={tabProps.tab} onClick={handleClick}>
      <h3 className="tab-header__title">{tabProps.name}</h3>
      <p className="tab-header__content">{tabProps.description}</p>
    </li>
  )
}
