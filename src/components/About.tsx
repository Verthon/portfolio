/** @jsxImportSource react */
import React from 'react'

export const About = () => {
  const data = {
    site: {
      siteMetadata: {
        bio: '',
      },
    },
  }

  return (
    <section className="section about">
      <p className="container about__description">
        {data.site.siteMetadata.bio}
      </p>
    </section>
  )
}
