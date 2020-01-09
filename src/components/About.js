import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const About = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            bio
          }
        }
      }
    `
  )

  return (
    <section className="section about">
      <p className="container about__description">
        {data.site.siteMetadata.bio}
      </p>
    </section>
  )
}

export default About
