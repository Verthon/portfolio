import { useVisibleTask$ } from '@builder.io/qwik'
import posthog from 'posthog-js'

export const useInitAnalytics = () => {
  useVisibleTask$(() => {
    posthog.init('phc_iV39S2VbjQJAcXSU0fR8bhzwWf3g6nBAqEgMiX9qDFh', {
      api_host: 'https://eu.i.posthog.com',
      defaults: '2025-05-24',
    })
  })
}
