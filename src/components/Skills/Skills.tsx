import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Tabs } from '../Tabs/Tabs'

import type { SkillsQueryResponse } from './Skills.types'
import { quote, author } from "./Skills.module.css"
import { Section } from '../Section/Section'
import { Container } from '../Container/Container'

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
              id
              tabs {
                content {
                  tech
                  title
                }
                headers {
                  description
                  name
                  tab
                }
              }
            }
          }
        }
      }
    `
  )


  console.log(data);

  return (
    <Section ref={ref} id="skills" header="Skills">
      <Container>
        <blockquote className={quote}>
          "{data.site.siteMetadata.quote.content}"
          <footer className={author}>
            {data.site.siteMetadata.quote.author}
          </footer>
        </blockquote>
        <Tabs headers={data.allContentJson.edges[0].node.tabs.headers} content={data.allContentJson.edges[0].node.tabs.content} />
      </Container>
    </Section>
  )
})
