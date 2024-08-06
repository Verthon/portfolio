import { component$ } from '@builder.io/qwik'

import type { Icon } from '~/common/infrastructure/models/icon'
import IconWrapper from '../icon-wrapper/icon-wrapper'

type InfoIconProps = Icon

export default component$(
  ({ height, width, ariaHidden, ariaLabel, color }: InfoIconProps) => {
    const path =
      'M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'

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
