import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Tabs } from '../Tabs/Tabs'
import type { QueryData } from './Skills.types'

export const Skills = React.forwardRef((_props, ref: React.ForwardedRef<HTMLElement>) => {
  const data = useStaticQuery<QueryData>(
    graphql`
      query {
        site {
          siteMetadata {
            quote {
              author
              content
            },
            tabsHeaders,
            tabsContent,
          }
        }
      }
    `
  )
  return (
    <section ref={ref} id="skills" className="section">
      <div className="container container--skills">
        <h2 className="section__heading">Skills</h2>
        <blockquote className="section__quote">
          "{data.site.siteMetadata.quote.content}"
          <footer className="section__quote__author">
            {data.site.siteMetadata.quote.author}
          </footer>
        </blockquote>
        <Tabs headers={data.site.siteMetadata.tabsHeaders} content={data.site.siteMetadata.tabsContent} />
      </div>
    </section>
  )
})
