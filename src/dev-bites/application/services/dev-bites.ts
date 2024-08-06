import type { DevBiteItem } from '~/dev-bites/domain/models/dev-bite-item'
import { createPermalink } from '~/dev-bites/infrastructure/permalink'
import {
  fetchMdxFiles,
  getModules,
} from '~/dev-bites/infrastructure/services/mdx-file'

type ReceivedDevBiteType = Awaited<
  ReturnType<typeof fetchMdxFiles>
>[number]['metadata']['dev_bite_type']

const formatDevBiteType = (devBiteType: ReceivedDevBiteType) => {
  const map: Record<ReceivedDevBiteType, DevBiteItem['devByteType']> = {
    featured: 'featured',
    regular: 'default',
  }

  return map[devBiteType]
}

const compareByDateDesc = (dateAccessorFn: (item: any) => string) => {
  return (a: unknown, b: unknown) => {
    const dateA = new Date(dateAccessorFn(a)).getTime()
    const dateB = new Date(dateAccessorFn(b)).getTime()

    return dateB - dateA
  }
}

export const getAllDevBites = async (): Promise<DevBiteItem[]> => {
  const modules = await fetchMdxFiles({ getModules })
  const getDate = (item: (typeof modules)[0]) => item.metadata.date
  const sortedModules = modules.sort(compareByDateDesc(getDate))

  return sortedModules.map(({ path, metadata }) => {
    return {
      title: metadata.title,
      excerpt: metadata.excerpt,
      permalink: createPermalink(path),
      date: metadata.date,
      devByteType: formatDevBiteType(metadata.dev_bite_type),
      lastUpdated: metadata.last_updated,
    }
  })
}

export const getAllFeaturedDevBites = async (): Promise<DevBiteItem[]> => {
  const modules = await fetchMdxFiles({ getModules })
  const getDate = (item: (typeof modules)[0]) => item.metadata.date

  const featuredModules = modules
    .filter(({ metadata }) => {
      return metadata.dev_bite_type === 'featured'
    })
    .sort(compareByDateDesc(getDate))

  return featuredModules.map(({ path, metadata }) => {
    return {
      title: metadata.title,
      excerpt: metadata.excerpt,
      permalink: createPermalink(path),
      date: metadata.date,
      devByteType: formatDevBiteType(metadata.dev_bite_type),
      lastUpdated: metadata.last_updated,
    }
  })
}

