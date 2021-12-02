import * as React from 'react'

import { TabHeader } from '../TabHeader/TabHeader'
import { TabContent } from '../TabContent/TabContent'

import type { TabType, Props } from './Tabs.types'
import { MOBILE_BREAKPOINT } from './Tabs.const'

export const Tabs = ({ headers, content }: Props) => {
  const frontendTabRef = React.useRef<HTMLInputElement>(null)
  const generalTabRef = React.useRef<HTMLInputElement>(null)

  const [activeTab, setActiveTab] = React.useState<TabType>('frontend')

  const scrollToContent = (content: React.RefObject<HTMLInputElement>) => {
    if(content.current) {
      content.current.scrollIntoView({
        inline: 'nearest',
        block: 'end',
        behavior: 'smooth',
      })
    }
  }

  const scrollToTab = (type: TabType) => {
    switch (type) {
      case 'frontend':
        scrollToContent(frontendTabRef)
        break
      case 'general':
        scrollToContent(generalTabRef)
        break
      default:
        break
    }
  }

  const handleHeaderChange = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const header = e.currentTarget.getAttribute('data-tab')
    const isCorrectTab = header === "frontend" || header === "general"
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (isCorrectTab) {
      setActiveTab(header)
      isMobile ? scrollToTab(header) : null
    }
  }

  const contentCssActiveClass = `tab-content__item active-tab animated fadeIn`
  return (
    <div className="row">
      <ul
        className="tab-header"
        data-aos="fade-down"
        data-aos-delay="200"
        data-aos-offset="100"
        data-aos-easing="ease-in-out"
      >
        {headers.map((header) =>
          activeTab === header.name.toLocaleLowerCase() ? (
            <TabHeader
              key={header.name}
              tabProps={header}
              active={true}
              handleClick={(e) => handleHeaderChange(e)}
            />
          ) : (
            <TabHeader
              key={header.name}
              tabProps={header}
              active={false}
              handleClick={(e) => handleHeaderChange(e)}
            />
          )
        )}
      </ul>
      <article className="tab-content">
        <div
          ref={frontendTabRef}
          className={
            activeTab === 'frontend'
              ? contentCssActiveClass
              : 'tab-content__item'
          }
        >
          {content[0].map((column) => (
            <TabContent key={column.title} item={column} />
          ))}
        </div>
        <div
          ref={generalTabRef}
          className={
            activeTab === 'general'
              ? contentCssActiveClass
              : 'tab-content__item'
          }
        >
          {content[1].map((column) => (
            <TabContent key={column.title} item={column} />
          ))}
        </div>
      </article>
    </div>
  )
}
