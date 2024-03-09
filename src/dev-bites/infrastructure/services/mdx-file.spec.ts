import { vi, describe, it, expect } from 'vitest'

import { fetchMdxFiles, isModuleWithFrontmatter } from './mdx-file'

describe('mdxFile - service to handle operations for dev-bites mdx files', () => {
  describe('fetchMdxFiles', () => {
    it('should correctly fetch and process all valid MDX files', async () => {
      const getModules = vi.fn(() => ({
        'path/to/module1': {
          frontmatter: {
            title: 'Storybook chunk blocked by network policy',
            published: true,
            description:
              'Simplify your async testing in Mocha with a concise overview of using Chai-as-Promised, focusing on practical examples for immediate application.',
            tags: 'testing',
            date: '2024-03-09',
            last_updated: '2024-03-07',
            excerpt:
              'Immediate solutions for async error handling in Mocha with Chai-as-Promised, targeting common issues with quick fixes.',
            dev_bite_type: 'featured',
          },
          headings: {},
        },
        'path/to/module2': {
          frontmatter: {
            title: 'Title 2',
            description: 'Description 2',
            date: '2022-01-02',
            last_updated: '2024-02-07',
            dev_bite_type: 'regular',
            excerpt:
              'Immediate solutions for async error handling in Mocha with Chai-as-Promised, targeting common issues with quick fixes.',
          },
          headings: {},
        },
      }))

      const result = await fetchMdxFiles({ getModules })

      expect(result).toEqual([
        {
          path: 'path/to/module1',
          metadata: {
            title: 'Storybook chunk blocked by network policy',
            description:
              'Simplify your async testing in Mocha with a concise overview of using Chai-as-Promised, focusing on practical examples for immediate application.',
            date: '2024-03-09',
            dev_bite_type: 'featured',
            last_updated: '2024-03-07',
            excerpt:
              'Immediate solutions for async error handling in Mocha with Chai-as-Promised, targeting common issues with quick fixes.',
          },
        },
        {
          path: 'path/to/module2',
          metadata: {
            title: 'Title 2',
            description: 'Description 2',
            date: '2022-01-02',
            dev_bite_type: 'regular',
            last_updated: '2024-02-07',
            excerpt:
              'Immediate solutions for async error handling in Mocha with Chai-as-Promised, targeting common issues with quick fixes.',
          },
        },
      ])
    })

    it('should throw an error if any module is invalid', async () => {
      const getModules = vi.fn(() => ({
        'path/to/validModule': {
          frontmatter: {
            title: 'Valid Title',
            description: 'Valid Description',
            date: '2022-01-01',
          },
        },
        'path/to/invalidModule': { wrongProperty: {} },
      }))

      await expect(fetchMdxFiles({ getModules })).rejects.toThrow(
        'Fatal Error: incorrect modules have been found in mdx files'
      )
    })
  })

  describe('isModuleWithFrontmatter', () => {
    it('should return true for objects with valid frontmatter', () => {
      const validModule = {
        frontmatter: {
          title: 'Storybook chunk blocked by network policy',
          published: true,
          description:
            'Simplify your async testing in Mocha with a concise overview of using Chai-as-Promised, focusing on practical examples for immediate application.',
          tags: 'testing',
          date: '2024-03-09',
          last_updated: '2024-03-07',
          dev_bite_type: 'featured',
          excerpt:
            'Immediate solutions for async error handling in Mocha with Chai-as-Promised, targeting common issues with quick fixes.',
        },
      }
      expect(isModuleWithFrontmatter(validModule)).toBe(true)
    })

    it('should return false for objects without frontmatter', () => {
      const invalidModule = { notFrontmatter: {} }
      expect(isModuleWithFrontmatter(invalidModule)).toBe(false)
    })

    it('should return false for objects with incomplete or invalid frontmatter', () => {
      const incompleteModule = {
        frontmatter: {
          title: 'Test Title',
        },
      }
      expect(isModuleWithFrontmatter(incompleteModule)).toBe(false)
    })
  })
})
