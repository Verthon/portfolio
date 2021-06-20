import * as React from 'react'

export const SendIcon = ({
  height = 24,
  width = 24,
  color,
  ariaLabel = '',
  ariaHidden = false,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    stroke={color}
    aria-label={ariaLabel}
    aria-hidden={ariaHidden}
    viewBox="0 0 24 24"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="10" y1="14" x2="21" y2="3" />
    <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
  </svg>
)
