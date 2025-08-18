import { component$ } from '@builder.io/qwik'
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import { RouterHead } from './common/components/router-head/router-head'

import './global.css'

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={`{
            "prerender":[{ "source":"document", "eagerness":"moderate",
              "where":{ "href_matches": "/(?!logout|admin).*" } }],
            "prefetch":[{ "source":"document", "eagerness":"moderate",
              "where":{ "href_matches": "/(?!logout|admin).*" } }]
          }`}
        />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  )
})
