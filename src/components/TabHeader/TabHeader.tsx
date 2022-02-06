import * as React from 'react'

import type { Props } from "./TabHeader.types"
import { tabHeaderItem, tabHeaderItemActive, tabHeaderTitle, tabHeaderContent } from "./TabHeader.module.css"

export const TabHeader = ({ tabProps, active, handleClick }: Props) => {
  const cssClass = active ? `${tabHeaderItem} ${tabHeaderItemActive}` : `${tabHeaderItem}` 
  return (
    <li className={cssClass} data-tab={tabProps.name.toLowerCase()} onClick={handleClick}>
      <h3 className={tabHeaderTitle}>{tabProps.name}</h3>
      <p className={tabHeaderContent}>{tabProps.description}</p>
    </li>
  )
}
