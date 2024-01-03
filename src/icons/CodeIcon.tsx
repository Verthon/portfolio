/** @jsxImportSource react */

import type { Props } from './Icon.types'

export const CodeIcon = ({
  height = 24,
  width = 24,
  color,
  ariaLabel = '',
  ariaHidden = false,
}: Props) => (
  <svg
    width={width}
    height={height}
    role="img"
    aria-label={ariaLabel}
    aria-hidden={ariaHidden}
    viewBox={`0 0 ${width} ${height}`}
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21ZM4 7V19H20V7H4ZM14.707 16.707L13.294 15.294L15.586 13L13.293 10.707L14.707 9.293L18.414 13L14.708 16.706L14.707 16.707ZM9.293 16.707L5.586 13L9.293 9.293L10.707 10.707L8.414 13L10.706 15.293L9.293 16.706V16.707Z"
      fill={color}
    ></path>
  </svg>
)
