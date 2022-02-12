import * as React from 'react'

import { Seo } from '../../components/Seo'
import Image from '../../images/404.svg'

import { notFound, image, title, btn } from "./NotFoundContent.module.css"

export const NotFoundContent = () => {
  return (
    <div className={notFound}>
      <img className={image} src={Image} alt="not-found graphic" />
      <Seo />
      <h1 className={title}>Sorry, page not found</h1>
      <p>
        You just hit a route that doesn&#39;t exist...
      </p>
      <a href="/" className={btn}>
        Go back
      </a>
    </div>
  )
}