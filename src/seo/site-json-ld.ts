import { AUTHOR, PERSON_ID, SITE_URL, WEBSITE_ID } from './site'

const PERSON_SAME_AS = [
  'https://github.com/Verthon',
  'https://www.linkedin.com/in/krzysztof-sordyl/',
  'https://bsky.app/profile/krzysztof-sordyl.bsky.social',
]

export const createSiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: AUTHOR,
      url: `${SITE_URL}/`,
      jobTitle: 'Frontend Engineer',
      description:
        'Frontend engineer building internal tooling for dev teams. Writes about frontend architecture, developer experience, and technical decisions with business impact.',
      knowsAbout: [
        'Frontend architecture',
        'Developer experience',
        'Web performance',
        'Build tooling',
      ],
      sameAs: PERSON_SAME_AS,
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: AUTHOR,
      description:
        'Frontend architecture, developer experience, and technical decisions with business impact.',
      inLanguage: 'en',
      author: { '@id': PERSON_ID },
    },
  ],
})
