import { useVisibleTask$ } from '@builder.io/qwik'
import posthog from 'posthog-js'

export const useInitAnalytics = () => {
  useVisibleTask$(() => {
    const isDev = import.meta.env.DEV

    console.log('isDev', isDev)

    posthog.init('phc_iV39S2VbjQJAcXSU0fR8bhzwWf3g6nBAqEgMiX9qDFh', {
      cookieless_mode: 'always',
      api_host: isDev ? 'https://eu.i.posthog.com' : '/ingest',
      ui_host: 'https://eu.i.posthog.com',
      debug: true,
    })
  })
}
