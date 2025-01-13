import { component$ } from '@builder.io/qwik'

import type { Icon } from '~/common/infrastructure/models/icon'
import IconWrapper from '../icon-wrapper/icon-wrapper'

type ChevronLeftIconProps = Icon

export default component$(
  ({ height, width, ariaHidden, ariaLabel, color }: ChevronLeftIconProps) => {
    const path =
      'M15.75 19.5 8.25 12l7.5-7.5'

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
