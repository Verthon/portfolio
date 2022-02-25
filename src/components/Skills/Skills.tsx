import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Tabs } from '../Tabs/Tabs'
import { Section } from '../Section/Section'
import { Container } from '../Container/Container'

import type { SkillsQueryResponse } from './Skills.types'
import { quote, author } from "./Skills.module.css"

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

  const headers = data.allContentJson.edges.find(edge => edge.node.tabs)?.node.tabs?.headers!
  const content = data.allContentJson.edges.find(edge => edge.node.tabs)?.node.tabs?.content!

  return (
    <Section ref={ref} id="skills" header="Skills">
      <Container>
        <blockquote className={quote}>
          "{data.site.siteMetadata.quote.content}"
          <footer className={author}>
            {data.site.siteMetadata.quote.author}
          </footer>
        </blockquote>
        <Tabs headers={headers} content={content} />
      </Container>
    </Section>
  )
})
