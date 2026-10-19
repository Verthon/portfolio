import { getCollection, type CollectionKey } from 'astro:content'

import { isVisibleTo } from './publishing'

const audience = import.meta.env.PROD ? 'production' : 'preview'

export const getPublishedCollection = <C extends CollectionKey>(
  collection: C
) => getCollection(collection, ({ data }) => isVisibleTo(audience, data))
