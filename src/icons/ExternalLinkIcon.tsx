import * as React from 'react'

import type { Props } from './Icon.types'

export const ExternalLinkIcon = ({
  height = 24,
  width = 24,
  color,
  ariaLabel = '',
  ariaHidden = false,
}: Props) => (
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
      d="M17.001 20h-11a2 2 0 01-2-2V7a2 2 0 012-2h4v2h-4v11h11v-4h2v4a2 2 0 01-2 2zm-5.3-6.293l-1.41-1.414L16.584 6h-3.583V4h7v7h-2V7.415l-6.3 6.292z"
      fill={color}
    />
  </svg>
)
