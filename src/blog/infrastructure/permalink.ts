export const createPermalink = (path: string) => {
  return path.replace('/src/routes', '').replace('/index.mdx', '')
}
