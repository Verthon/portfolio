/** @jsxImportSource react */
import * as React from 'react'

import Image from '../../images/404.svg'

import { notFound, image, title, btn } from './NotFoundContent.module.css'
import { qwikify$ } from '@builder.io/qwik-react'

export const NotFoundContentComponent = () => {
  return (
    <div className={notFound}>
      <img className={image} src={Image} alt="not-found graphic" />
      <h1 className={title}>Sorry, page not found</h1>
      <p>You just hit a route that doesn&#39;t exist...</p>
      <a href="/" className={btn}>
        Go back
      </a>
    </div>
  )
}

export const NotFoundContent = qwikify$(NotFoundContentComponent)
