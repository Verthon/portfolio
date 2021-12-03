import * as React from 'react'

import type { Props } from './TabContent.types'

export const TabContent = ({ item }: Props) => {
  return (
    <div className="tab-column">
      <h3 className="tab-content-heading">{item.title}</h3>
      <ul className="tab-list">
        {item.tech.map((tech) => (
          <li key={tech} className="tab-item">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  )
}
