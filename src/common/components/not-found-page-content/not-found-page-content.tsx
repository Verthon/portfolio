import { NotFoundImage } from '../not-found-image/not-found-image'
import { component$ } from '@builder.io/qwik'

import {
  notFound,
  title,
  btn,
} from './not-found-page-content.module.css'

export default component$(() => {
  return (
    <div class={notFound}>
      <NotFoundImage />
      <h1 class={title}>Sorry, page not found</h1>
      <p>You just hit a route that doesn&#39;t exist...</p>
      <a href="/" class={btn}>
        Go back
      </a>
    </div>
  )
})
