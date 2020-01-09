/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function Seo ({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            twitterSlug
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description


  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: site.siteMetadata.description
        },
        {
          property: 'og:title',
          content: site.siteMetadata.title
        },
        {
          property: 'og:description',
          content: site.siteMetadata.description
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.twitterSlug
        },
        {
          name: 'twitter:title',
          content: site.siteMetadata.title
        },
        {
          name: 'twitter:description',
          content: site.siteMetadata.description
        }
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: 'en',
  meta: [],
  description: ''
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
}

export default Seo
