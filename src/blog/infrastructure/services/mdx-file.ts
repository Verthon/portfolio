type ModuleWithFrontmatter = {
  frontmatter: {
    title: string
    description: string
    date: string
    excerpt: string
  }
}

const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && typeof obj === 'object'

const hasStringProperty = (
  obj: Record<string, unknown>,
  prop: string
): boolean => typeof obj[prop] === 'string'

const isFrontmatter = (obj: unknown): obj is ModuleWithFrontmatter =>
  isObject(obj) &&
  hasStringProperty(obj, 'title') &&
  hasStringProperty(obj, 'description') &&
  hasStringProperty(obj, 'date')

export const isModuleWithFrontmatter = (
  obj: unknown
): obj is ModuleWithFrontmatter => {
  return isObject(obj) && 'frontmatter' in obj && isFrontmatter(obj.frontmatter)
}

export const getModules = () => {
  const modules = import.meta.glob('/src/routes/**/**/index.mdx', {
    eager: true,
  })

  return modules
}

export const fetchMdxFiles = async ({
  getModules,
}: {
  getModules: () => Record<string, unknown>
}) => {
  const modules = getModules()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validModules = Object.entries(modules).filter(([_, module]) => {
    return isModuleWithFrontmatter(module)
  })

  if (validModules.length !== Object.keys(modules).length) {
    throw new Error(
      'Fatal Error: incorrect modules have been found in mdx files'
    )
  }

  return validModules.reduce<
    {
      path: string
      metadata: ModuleWithFrontmatter['frontmatter']
    }[]
  >((acc, [path, module]) => {
    if (isModuleWithFrontmatter(module)) {
      const { title, description, date, excerpt } = module.frontmatter
      acc.push({
        path,
        metadata: {
          title: title,
          description: description,
          date: date,
          excerpt: excerpt,
        },
      })
    }
    return acc
  }, [])
}
