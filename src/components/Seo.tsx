import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

export const Seo = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            twitterSlug
            lang
          }
        }
      }
    `
  )

  const metaDescription = site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        en: site.siteMetadata.lang,
      }}
      title={site.siteMetadata.title}
      titleTemplate={`${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: site.siteMetadata.title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.twitterSlug,
        },
        {
          name: 'twitter:title',
          content: site.siteMetadata.title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ].concat([])}
    >
      <link
        href="/fonts/Inter.var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </Helmet>
  )
}
