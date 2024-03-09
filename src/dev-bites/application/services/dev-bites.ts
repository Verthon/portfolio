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

export const getAllDevBites = async (): Promise<DevBiteItem[]> => {
  const modules = await fetchMdxFiles({ getModules })

  return modules.map(({ path, metadata }) => {
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
