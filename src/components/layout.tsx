import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header'

const Layout = ({ children, scrollFunction }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header
        scroll={scrollFunction}
        siteTitle={data.site.siteMetadata.title}
      />
      {children}
    </>
  )
}

export default Layout
