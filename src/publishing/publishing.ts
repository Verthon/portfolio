export type Publishable = { draft?: boolean }

export type Audience = 'production' | 'preview'

export const isDraft = (data: Publishable) => data.draft === true

export const isVisibleTo = (audience: Audience, data: Publishable) =>
  audience === 'preview' || !isDraft(data)
