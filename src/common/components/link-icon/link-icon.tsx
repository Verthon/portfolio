import { component$ } from '@builder.io/qwik'

import type { Icon } from '~/common/infrastructure/models/icon'
import IconWrapper from '../icon-wrapper/icon-wrapper'

type InfoIconProps = Icon

export default component$(
  ({ height, width, ariaHidden, ariaLabel, color }: InfoIconProps) => {
    const path =
      'M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244'

    return (
      <IconWrapper
        height={height}
        width={width}
        ariaHidden={ariaHidden}
        ariaLabel={ariaLabel}
        color={color}
        svgPath={path}
      />
    )
  }
)
