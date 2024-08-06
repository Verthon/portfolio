import { component$ } from '@builder.io/qwik'

import DevBiteItem from '../dev-bite-item/dev-bite-item'
import { grid, gridOrientationVertical } from './dev-bites-list.module.css'
import type { DevBiteItemProps } from '../dev-bite-item/dev-bite-item'

type DevBitesListProps = {
  list: DevBiteItemProps[]
  orientation?: 'vertical' | 'horizontal'
  withBadges?: boolean
}

const gridClassName: Record<
  Exclude<DevBitesListProps['orientation'], undefined>,
  string
> = {
  horizontal: grid,
  vertical: `${grid} ${gridOrientationVertical}`,
}

export default component$(
  ({
    list,
    orientation = 'horizontal',
    withBadges = false,
  }: DevBitesListProps) => {
    const currentGridClassName = gridClassName[orientation]

    return (
      <div class={currentGridClassName}>
        {list.map((item) => (
          <DevBiteItem
            key={item.title}
            date={item.date}
            title={item.title}
            permalink={item.permalink}
            excerpt={item.excerpt}
            devByteType={item.devByteType}
            lastUpdated={item.lastUpdated}
            badgesText={withBadges ? ['dev-bite'] : undefined}
          />
        ))}
      </div>
    )
  }
)
