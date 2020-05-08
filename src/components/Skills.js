import PropTypes from 'prop-types'
import React from 'react'
import Tabs from './Tabs'
import { useStaticQuery, graphql } from 'gatsby'
import JSONData from '../content/data.json'

const Skills = React.forwardRef((props, ref) => {
  const data = useStaticQuery(
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
        <Tabs headers={JSONData.headers} content={JSONData.content} />
      </div>
    </section>
  )
})

Skills.propTypes = {
  siteTitle: PropTypes.string,
}

Skills.defaultProps = {
  siteTitle: '',
}

export default Skills
