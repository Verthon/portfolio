import { component$ } from '@builder.io/qwik'
import { iconDefaults } from '~/common/infrastructure/constants/icon-defaults'

import type { Icon } from '~/common/infrastructure/models/icon'

type IconProps = Icon & {
  svgPath: string
}

export default component$(
  ({
    height = iconDefaults.height,
    width = iconDefaults.width,
    ariaHidden = iconDefaults.ariaHidden,
    ariaLabel,
    color,
    svgPath,
  }: IconProps) => {
    return (
      <svg
        width={width}
        height={height}
        fill="none"
        role="img"
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d={svgPath}
          fill={color}
        ></path>
      </svg>
    )
  }
)
