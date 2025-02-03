import { component$ } from '@builder.io/qwik'

import {
  notFound,
  title,
  link,
  linksWrapper,
  text,
} from './not-found-page-content.module.css'
import { Link } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <div class={notFound}>
      <h1 class={title}>Sorry, page not found</h1>
      <p class={text}>You just hit a route that doesn&#39;t exist...</p>
      <div class={linksWrapper}>
        <Link href="/" class={link}>
          go back home
        </Link>

        <Link href="/" class={link}>
          visit blog
        </Link>

        <Link href="/" class={link}>
          visit dev-bites
        </Link>
      </div>
    </div>
  )
})
