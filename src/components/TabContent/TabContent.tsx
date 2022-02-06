import * as React from 'react'

import type { Props } from './TabContent.types'
import { tabContentHeading, tabList, tabItem, tabColumn } from "./TabContent.module.css"

export const TabContent = ({ item }: Props) => {
  return (
    <div className={tabColumn}>
      <h3 className={tabContentHeading}>{item.title}</h3>
      <ul className={tabList}>
        {item.tech.map((tech) => (
          <li key={tech} className={tabItem}>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  )
}
