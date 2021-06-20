import * as React from 'react'

export const HearthIcon = ({
  height = 24,
  width = 24,
  color,
  ariaLabel = '',
  ariaHidden = false,
}) => (
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
    <svg
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8.40001C1.99975 6.95035 2.58239 5.56146 3.61681 4.54584C4.65124 3.53022 6.05058 2.97317 7.5 3.00001C9.21732 2.99089 10.856 3.71919 12 5.00001C13.144 3.71919 14.7827 2.99089 16.5 3.00001C17.9494 2.97317 19.3488 3.53022 20.3832 4.54584C21.4176 5.56146 22.0002 6.95035 22 8.40001C22 13.756 15.621 17.8 12 21C8.387 17.773 2 13.76 2 8.40001Z"
        fill={color}
      ></path>
    </svg>
  </svg>
)
