import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Tabs } from '../Tabs/Tabs'
import type { QueryData } from './Skills.types'
import { TabsContentTuple } from '../../types/tabs.types'

export const Skills = React.forwardRef((_props, ref: React.ForwardedRef<HTMLElement>) => {
  // const data = useStaticQuery<QueryData>(
  //   graphql`
  //     query {
  //       site {
  //         siteMetadata {
  //           quote {
  //             author
  //             content
  //           },
  //           tabsHeaders,
  //           tabsContent,
  //         }
  //       }
  //     }
  //   `
  // )
  const data = {
    site: {
      siteMetadata: {
        quote: {
          author: 'Thomas Huxley',
          content:
            'Try to learn something about everything and everything about something.',
        },
        tabsHeaders: [
          {
            name: "Frontend",
            description: "Building responsive web apps and mobile apps based on design projects. Creating React/Vue based frontend.",
            tab: "frontend"
          },
          {
            name: "General",
            description: "Effectively work within a team of other engineers, as well as Product Owner, designers, and QA engineers.",
            tab: "general"
          }
        ],
        tabsContent: [
          [
            {
              title: "JavaScript",
              tech: [
                "Working experience with JavaScript ES6+ and Typescript",
                "Familiar with React.js, Next.js, Gatsby.js",
                "Hands on experience with Redux Toolkit and Context API",
                "Experience with writing tests - Jest, React Testing Library, Cypress",
                "Hands on experience with Vue.js and Vuex / Pinia",
                "Working experience with SPAs based on Rest APIs",
                "Familiar with tooling: webpack, eslint"
              ]
            },
            {
              title: "Universal",
              tech: [
                "HTML5, CSS3, Sass, Styled Components",
                "Real world experience with GIT version control system",
                "Proficient with RWD and UI/UX, decent eye for the detail",
                "Familiar with BEM methodology",
                "Basic understanding of Tailwind CSS",
                "Hands on experience with Wordpress and Sanity CMS",
                "Familiar with SEO principles and Core Web Vitals",
                "Basics of the GraphQL with Apollo",
                "Basics of Figma prototyping"
              ]
            }
          ],
          [
            {
              title: "Soft skills",
              tech: [
                "Experience with Agile/Scrum methodology",
                "Good communication skills",
                "Experience in working directly with a clients",
                "Familiar with working as a remote developer",
                "Ability to learn on my own",
                "Familiar with creating an own knowledge base on Notion"
              ]
            },
            {
              title: "Backend",
              tech: [
                "Familiar with Firestore and Supabase",
                "Hands on experience on Hasura",
                "Basics of Node.js and Express.js",
                "Knowledge about HTTP and REST",
                "Hands on experience with Postman",
                "Basics of PostgreSQL"
              ]
            }
          ]
        ],
      }
    }
  }
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
        <Tabs headers={data.site.siteMetadata.tabsHeaders} content={data.site.siteMetadata.tabsContent as TabsContentTuple} />
      </div>
    </section>
  )
})
