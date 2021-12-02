import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Tabs } from '../Tabs/Tabs'
import type { SkillsQueryResponse } from './Skills.types'

export const Skills = React.forwardRef((_props, ref: React.ForwardedRef<HTMLElement>) => {
  const data = useStaticQuery<SkillsQueryResponse>(
    graphql`
      query {
        site {
          siteMetadata {
            quote {
              author
              content
            }
          }
        }
        allContentJson {
          edges {
            node {
              tabs {
                content {
                  tech
                  title
                }
                headers {
                  description
                  name
                }
              }
            }
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
        <Tabs headers={data.allContentJson.edges[1].node.tabs.headers} content={data.allContentJson.edges[1].node.tabs.content} />
      </div>
    </section>
  )
})
