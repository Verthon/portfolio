/** @jsxImportSource react */
import * as React from 'react'

import { Tabs } from '../Tabs/Tabs'
import { Section } from '../Section/Section'
import { Container } from '../Container/Container'

import type { SkillsQueryResponse } from './Skills.types'
import { quote, author } from './Skills.module.css'

export const Skills = React.forwardRef(
  (_props, ref: React.ForwardedRef<HTMLElement>) => {
    const data: SkillsQueryResponse = {
      site: {
        siteMetadata: {
          quote: {
            author: 'Thomas Huxley',
            content:
              'Try to learn something about everything and everything about something.',
          },
        },
      },
      allContentJson: {
        edges: [
          {
            node: {
              tabs: {
                content: [
                  [
                    {
                      tech: [
                        'Working experience with JavaScript ES6+ and Typescript',
                        'Familiar with React.js, Next.js, Gatsby.js',
                        'Hands on experience with Redux Toolkit and Context API',
                        'Experience with writing tests - Jest, React Testing Library, Cypress',
                        'Hands on experience with Vue.js and Vuex / Pinia',
                        'Working experience with SPAs based on Rest APIs',
                        'Hands on experience with React Query',
                      ],
                      title: 'JavaScript',
                    },
                    {
                      tech: [
                        'Real world experience with GIT version control system',
                        'Experience with troubleshooting and applications maintenance in production environments',
                        'Basic sense of UX/UI, decent eye for the detail',
                        'Familiar HTML and modern styling (Styled Components, CSS modules)',
                        'Familiar with SEO principles and Web Vitals',
                        'Basics understanding of the GraphQL with Apollo',
                      ],
                      title: 'Universal',
                    },
                  ],
                  [
                    {
                      tech: [
                        'Experience with Agile/Scrum methodology',
                        'Good communication skills',
                        'Experience in working directly with a clients',
                        'Familiar with working as a remote developer',
                        'Able to quickly gain new technical expertise',
                        'Good command of written and spoken English',
                      ],
                      title: 'Soft skills',
                    },
                    {
                      tech: [
                        'Familiar with Firestore and Supabase',
                        'Hands on experience on Hasura',
                        'Basics of Node.js and Express.js',
                        'Knowledge about HTTP and REST',
                        'Hands on experience with Postman',
                      ],
                      title: 'Backend',
                    },
                  ],
                ],
                headers: [
                  {
                    description:
                      'Building responsive web apps and mobile apps based on design projects. Creating React/Vue based frontend.',
                    name: 'Frontend',
                  },
                  {
                    description:
                      'Effectively work within a team of other engineers, as well as Product Owner, designers, and QA engineers.',
                    name: 'General',
                  },
                ],
              },
            },
          },
          { node: { tabs: null } },
        ],
      },
    }

    const headers = data.allContentJson.edges.find((edge) => edge.node.tabs)
      ?.node.tabs?.headers
    const content = data.allContentJson.edges.find((edge) => edge.node.tabs)
      ?.node.tabs?.content

    return (
      <Section ref={ref} id="skills" header="Skills">
        <Container>
          <blockquote className={quote}>
            "{data.site.siteMetadata.quote.content}"
            <footer className={author}>
              {data.site.siteMetadata.quote.author}
            </footer>
          </blockquote>
          {Array.isArray(headers) && Array.isArray(content) ? (
            //@ts-ignore
            <Tabs headers={headers} content={content} />
          ) : null}
        </Container>
      </Section>
    )
  }
)
