import { component$ } from '@builder.io/qwik'

import type { Icon } from '~/common/infrastructure/models/icon'
import IconWrapper from '../icon-wrapper/icon-wrapper'

type LinkedInIconProps = Icon

export default component$(
  ({ height, width, ariaHidden, ariaLabel, color }: LinkedInIconProps) => {
    const path =
      'M13 21H9V9h4v2a4.618 4.618 0 013.525-1.763A4.5 4.5 0 0121 13.75V21h-4v-6.75a2.265 2.265 0 00-2.247-1.944A1.815 1.815 0 0013 14.25V21zm-6 0H3V9h4v12zM5 7a2 2 0 110-4 2 2 0 010 4z'

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
