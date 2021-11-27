import * as React from 'react'

import type { Props } from './Icon.types'

export const LinkedinIcon = ({
  height = 24,
  width = 24,
  color = 'currentColor',
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
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 21H9V9h4v2a4.618 4.618 0 013.525-1.763A4.5 4.5 0 0121 13.75V21h-4v-6.75a2.265 2.265 0 00-2.247-1.944A1.815 1.815 0 0013 14.25V21zm-6 0H3V9h4v12zM5 7a2 2 0 110-4 2 2 0 010 4z"
      fill={color}
    />
  </svg>
)
