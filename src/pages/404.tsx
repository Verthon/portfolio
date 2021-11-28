import * as React from 'react'

import { Seo } from '../components/Seo'
import Image from '../images/404.svg'

export const NotFoundPage = () => (
  <div className="not-found">
    <img className="not-found__image" src={Image} alt="not-found graphic" />
    <Seo />
    <h1 className="not-found__title">Sorry, page not found</h1>
    <p className="not-found__text">
      You just hit a route that doesn&#39;t exist...
    </p>
    <a href="/" className="not-found__btn">
      Go back
    </a>
  </div>
)
